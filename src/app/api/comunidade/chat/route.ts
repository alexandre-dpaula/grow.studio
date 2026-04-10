import { NextResponse } from "next/server";
import { COMMUNITY_PROMPTS } from "@/data/community-prompts";
import { TREINAMENTOS } from "@/data/treinamentos";
import { buildCommunityTutorSystemPrompt } from "@/lib/community-agent-prompt";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type TrainingLink = {
  slug: string;
  title: string;
  href: string;
  keywords: string[];
};

const DEFAULT_MODEL = "gpt-4.1-mini";
const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 1200;
const MAX_OUTPUT_TOKENS = 1000;

const AGENT_INSTRUCTIONS = buildCommunityTutorSystemPrompt({
  treinamentos: TREINAMENTOS,
  prompts: COMMUNITY_PROMPTS,
});

const TRAINING_LINKS: TrainingLink[] = [
  {
    slug: "crie-paginas",
    title: "Crie Projetos WEB em 5min",
    href: "/treinamentos/crie-paginas",
    keywords: ["projetos web", "pagina de vendas", "landing page", "site", "copy"],
  },
  {
    slug: "proprio-comercial",
    title: "Crie seu Próprio Comercial",
    href: "/treinamentos/proprio-comercial",
    keywords: ["comercial", "propaganda", "anuncio", "anúncio", "roteiro", "video"],
  },
  {
    slug: "ensaios-fotograficos",
    title: "Crie Ensaios Fotográficos",
    href: "/treinamentos/ensaios-fotograficos",
    keywords: ["fotografia", "fotografico", "fotográfico", "ensaio", "fotos", "imagem"],
  },
];

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function messageIncludesAny(text: string, terms: string[]) {
  const normalizedText = normalizeText(text);
  return terms.some((term) => normalizedText.includes(normalizeText(term)));
}

function isDirectLinkRequest(text: string) {
  const normalized = normalizeText(text);
  if (
    /\b(link|pagina|pagina do treinamento|url|acesso|acessar)\b/.test(normalized)
  ) {
    return true;
  }
  return false;
}

function isLinkFollowUpConfirmation(text: string) {
  const normalized = normalizeText(text).trim();
  const confirmationPatterns = [
    /^me envia$/,
    /^me envie$/,
    /^envia$/,
    /^envie$/,
    /^manda$/,
    /^pode mandar$/,
    /^quero$/,
    /^sim$/,
    /^topa$/,
  ];
  return confirmationPatterns.some((pattern) => pattern.test(normalized));
}

function didAssistantOfferLink(messages: ChatMessage[]) {
  const assistantMessages = messages.filter((message) => message.role === "assistant");
  if (!assistantMessages.length) {
    return false;
  }

  const latestAssistant = assistantMessages[assistantMessages.length - 1];
  const normalized = normalizeText(latestAssistant.content);
  return normalized.includes("link") && (normalized.includes("envie") || normalized.includes("mandar"));
}

function detectTrainingFromMessages(messages: ChatMessage[]) {
  const scores = new Map<string, number>();

  TRAINING_LINKS.forEach((training) => scores.set(training.slug, 0));

  messages.forEach((message, index) => {
    const weightByOrder = index + 1;
    const roleWeight = message.role === "user" ? 2 : 1;
    const weight = weightByOrder * roleWeight;

    TRAINING_LINKS.forEach((training) => {
      if (messageIncludesAny(message.content, training.keywords)) {
        scores.set(training.slug, (scores.get(training.slug) ?? 0) + weight);
      }
    });
  });

  let bestSlug: string | null = null;
  let bestScore = 0;

  scores.forEach((score, slug) => {
    if (score > bestScore) {
      bestScore = score;
      bestSlug = slug;
    }
  });

  return bestScore > 0 ? bestSlug : null;
}

function buildBaseUrl(request: Request) {
  try {
    const url = new URL(request.url);
    return `${url.protocol}//${url.host}`;
  } catch {
    return "http://localhost:3000";
  }
}

function buildTrainingLinkReply(request: Request, slug: string | null) {
  const baseUrl = buildBaseUrl(request);

  if (slug) {
    const training = TRAINING_LINKS.find((item) => item.slug === slug);
    if (training) {
      return [
        `Link do treinamento “${training.title}” enviado 🎯`,
        `${baseUrl}${training.href}`,
        "",
        "───────────────",
        "",
        "🚀 Próximo passo",
        "Abre a página e me fala se você quer que eu te monte a estrutura inicial para executar hoje.",
      ].join("\n");
    }
  }

  return [
    "🔗 Links dos treinamentos disponíveis",
    ...TRAINING_LINKS.map((training) => `${training.title}: ${baseUrl}${training.href}`),
    "",
    "───────────────",
    "",
    "🚀 Próximo passo",
    "Me diz qual treinamento você quer começar e eu te passo o plano de execução em 3 passos.",
  ].join("\n");
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((item) => {
      if (!isObject(item)) {
        return null;
      }

      const role = item.role;
      const content = item.content;

      if (
        (role !== "user" && role !== "assistant") ||
        typeof content !== "string" ||
        !content.trim()
      ) {
        return null;
      }

      return {
        role,
        content: content.trim().slice(0, MAX_MESSAGE_CHARS),
      } satisfies ChatMessage;
    })
    .filter((message): message is ChatMessage => message !== null)
    .slice(-MAX_MESSAGES);
}

function buildTranscript(messages: ChatMessage[]) {
  return messages
    .map((message) => {
      const speaker = message.role === "assistant" ? "Agente" : "Aluno";
      return `${speaker}: ${message.content}`;
    })
    .join("\n");
}

function extractResponseText(payload: unknown): string | null {
  if (!isObject(payload)) {
    return null;
  }

  const directText = payload.output_text;
  if (typeof directText === "string" && directText.trim()) {
    return directText.trim();
  }

  const output = payload.output;
  if (!Array.isArray(output)) {
    return null;
  }

  const chunks: string[] = [];

  for (const item of output) {
    if (!isObject(item)) {
      continue;
    }

    const content = item.content;
    if (!Array.isArray(content)) {
      continue;
    }

    for (const part of content) {
      if (!isObject(part)) {
        continue;
      }

      const text = part.text;
      if (typeof text === "string" && text.trim()) {
        chunks.push(text.trim());
      }
    }
  }

  if (!chunks.length) {
    return null;
  }

  return chunks.join("\n\n");
}

function extractErrorMessage(payload: unknown): string | null {
  if (!isObject(payload)) {
    return null;
  }

  const errorValue = payload.error;
  if (!isObject(errorValue)) {
    return null;
  }

  const message = errorValue.message;
  if (typeof message === "string" && message.trim()) {
    return message.trim();
  }

  return null;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Defina OPENAI_API_KEY no ambiente para usar o agente." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const messages = normalizeMessages(isObject(body) ? body.messages : []);
  if (!messages.length) {
    return NextResponse.json({ error: "Envie pelo menos uma mensagem." }, { status: 400 });
  }

  const latestUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user");

  if (latestUserMessage) {
    const shouldSendDirectLink =
      isDirectLinkRequest(latestUserMessage.content) ||
      (isLinkFollowUpConfirmation(latestUserMessage.content) &&
        didAssistantOfferLink(messages));

    if (shouldSendDirectLink) {
      const detectedSlug = detectTrainingFromMessages(messages);
      const linkReply = buildTrainingLinkReply(request, detectedSlug);
      return NextResponse.json({ reply: linkReply });
    }
  }

  const transcript = buildTranscript(messages);
  const model = process.env.OPENAI_MODEL ?? DEFAULT_MODEL;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      instructions: AGENT_INSTRUCTIONS,
      input: transcript,
      max_output_tokens: MAX_OUTPUT_TOKENS,
    }),
  });

  const payload: unknown = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage = extractErrorMessage(payload);
    return NextResponse.json(
      { error: errorMessage ?? "Falha ao consultar o modelo da OpenAI." },
      { status: response.status },
    );
  }

  const reply = extractResponseText(payload);
  if (!reply) {
    return NextResponse.json(
      { error: "A OpenAI respondeu sem conteúdo de texto." },
      { status: 502 },
    );
  }

  return NextResponse.json({ reply });
}
