"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUp,
  AppWindow,
  Boxes,
  ChevronDown,
  ChevronRight,
  Copy,
  GraduationCap,
  Plus,
  RefreshCcw,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import {
  createConversationTitleFromPrompt,
  loadCommunityConversations,
  type ChatRole,
  type StoredConversation,
  type StoredConversationMessage,
  upsertConversation,
} from "@/lib/community-conversations";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
};

type ChatApiMessage = {
  role: ChatRole;
  content: string;
};

type AssistantResponseBlock =
  | {
      id: string;
      kind: "text";
      title: string;
      body: string;
    }
  | {
      id: string;
      kind: "code";
      title: string;
      language: string;
      code: string;
    };

type CommunityAgentChatProps = {
  mode: "welcome" | "thread";
  conversationId?: string | null;
};

const growIconMask = {
  WebkitMask: "url('/icon-logo.svg') center / contain no-repeat",
  mask: "url('/icon-logo.svg') center / contain no-repeat",
};

const pendingMessageStorageKey = "grow-community-pending-message";

const welcomeAccessItems = [
  {
    icon: GraduationCap,
    label: "Passo a passo do treinamento Projetos Web",
    href: "/comunidade?view=treinamentos",
  },
  {
    icon: AppWindow,
    label: "Prompts do Projetos",
    href: "/comunidade?view=prompts",
  },
  {
    icon: Boxes,
    label: "Projetos",
    href: "/comunidade?view=projetos",
  },
];

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

type PendingMessagePayload = {
  conversationId: string;
  content: string;
};

function createTimestamp() {
  return new Date().toISOString();
}

function toStoredMessages(messages: ChatMessage[]): StoredConversationMessage[] {
  return messages.map(({ role, content, createdAt }) => ({
    role,
    content,
    createdAt,
  }));
}

function fromStoredMessages(
  conversationId: string,
  messages: StoredConversationMessage[],
): ChatMessage[] {
  return messages.map((message, index) => ({
    id: `${conversationId}-${index}-${message.createdAt}`,
    role: message.role,
    content: message.content,
    createdAt: message.createdAt,
  }));
}

function parsePendingPayload(rawValue: string | null): PendingMessagePayload | null {
  if (!rawValue) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(rawValue);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "conversationId" in parsed &&
      "content" in parsed &&
      typeof parsed.conversationId === "string" &&
      typeof parsed.content === "string" &&
      parsed.conversationId.trim() &&
      parsed.content.trim()
    ) {
      return {
        conversationId: parsed.conversationId,
        content: parsed.content,
      };
    }
  } catch {
    // Compatibilidade com versão anterior que salvava string simples.
    if (rawValue.trim()) {
      return {
        conversationId: "",
        content: rawValue.trim(),
      };
    }
  }

  return null;
}

function toApiMessages(messages: ChatMessage[]): ChatApiMessage[] {
  return messages.map(({ role, content }) => ({ role, content }));
}

function renderTextWithLinks(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={`link-${index}`}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-[#9dd1ff] underline decoration-[#9dd1ff]/55 underline-offset-2 transition-colors hover:text-[#b7dcff]"
        >
          {part}
        </a>
      );
    }

    return <Fragment key={`text-${index}`}>{part}</Fragment>;
  });
}

function isHtmlLanguage(language: string) {
  return /^html?$/i.test(language.trim());
}

function buildHtmlPreviewDocument(code: string, previewId: string) {
  const trimmed = code.trim();
  if (!trimmed) {
    return "";
  }

  const baseDocument =
    /<!doctype\s+html/i.test(trimmed) || /<html[\s>]/i.test(trimmed)
      ? trimmed
      : [
          "<!doctype html>",
          "<html lang='pt-BR'>",
          "<head>",
          "  <meta charset='UTF-8' />",
          "  <meta name='viewport' content='width=device-width, initial-scale=1.0' />",
          "  <title>Preview HTML</title>",
          "  <style>body{margin:16px;font-family:Arial,sans-serif;background:#fff;color:#111}</style>",
          "</head>",
          "<body>",
          trimmed,
          "</body>",
          "</html>",
        ].join("\n");

  const resizeScript = `
<script>
(() => {
  const previewId = ${JSON.stringify(previewId)};
  let lastHeight = 0;

  const postHeight = () => {
    const body = document.body;
    const root = document.documentElement;
    const measuredHeight = Math.max(
      body ? body.scrollHeight : 0,
      body ? body.offsetHeight : 0,
      root ? root.scrollHeight : 0
    );
    const nextHeight = Math.max(260, Math.min(1400, Math.round(measuredHeight)));
    if (Math.abs(nextHeight - lastHeight) < 1) {
      return;
    }
    lastHeight = nextHeight;
    parent.postMessage(
      { type: "grow-html-preview-height", previewId, height: nextHeight },
      "*"
    );
  };

  const safePost = () => {
    try {
      postHeight();
    } catch {}
  };

  // Mede poucas vezes para evitar loop de altura em layouts com 100vh.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", safePost, { once: true });
  } else {
    safePost();
  }
  window.addEventListener("load", safePost, { once: true });
  setTimeout(safePost, 120);
  setTimeout(safePost, 420);
})();
</script>`;

  if (/<\/body>/i.test(baseDocument)) {
    return baseDocument.replace(/<\/body>/i, `${resizeScript}\n</body>`);
  }

  return `${baseDocument}\n${resizeScript}`;
}

function splitByVisualSeparators(content: string): string[] {
  return content
    .split(/\n\s*[─-]{8,}\s*\n/g)
    .map((section) => section.trim())
    .filter(Boolean);
}

function extractVisualTitleAndBody(section: string) {
  const trimmedSection = section.trim();
  if (!trimmedSection) {
    return { title: "", body: "" };
  }

  const lines = trimmedSection.split("\n");
  const firstLine = lines[0]?.trim() ?? "";
  const body = lines.slice(1).join("\n").trim();

  const normalizedTitle = firstLine.replace(/^\[(.+)\]$/, "$1").trim();
  const isListLikeLine = /^(-|\*|\d+\.)\s+/.test(normalizedTitle);
  const isCodeFence = normalizedTitle.startsWith("```");

  if (
    !body ||
    !normalizedTitle ||
    isListLikeLine ||
    isCodeFence ||
    normalizedTitle.length > 110
  ) {
    return { title: "", body: trimmedSection };
  }

  return { title: normalizedTitle, body };
}

function appendSectionBlocks(
  blocks: AssistantResponseBlock[],
  messageId: string,
  sectionIndex: number,
  title: string,
  rawBody: string,
) {
  const body = rawBody.trim();
  if (!body) {
    return;
  }

  const codeFenceRegex = /```([\w.+-]*)\n([\s\S]*?)```/g;
  let cursor = 0;
  let partIndex = 0;
  let match = codeFenceRegex.exec(body);

  while (match) {
    const matchStart = match.index;
    const beforeCode = body.slice(cursor, matchStart).trim();
    if (beforeCode) {
      blocks.push({
        id: `${messageId}-block-${sectionIndex}-${partIndex}`,
        kind: "text",
        title,
        body: beforeCode,
      });
      partIndex += 1;
    }

    const language = (match[1] || "txt").trim() || "txt";
    const code = (match[2] || "").trim();
    if (code) {
      blocks.push({
        id: `${messageId}-block-${sectionIndex}-${partIndex}`,
        kind: "code",
        title,
        language,
        code,
      });
      partIndex += 1;
    }

    cursor = matchStart + match[0].length;
    match = codeFenceRegex.exec(body);
  }

  const remainingBody = body.slice(cursor).trim();
  if (remainingBody) {
    blocks.push({
      id: `${messageId}-block-${sectionIndex}-${partIndex}`,
      kind: "text",
      title,
      body: remainingBody,
    });
  }
}

function parseAssistantBlocks(messageId: string, content: string): AssistantResponseBlock[] {
  const normalized = content.replace(/\r\n?/g, "\n").trim();
  if (!normalized) {
    return [];
  }

  const visualSeparatorRegex = /^\s*[─-]{8,}\s*$/m;
  const blocks: AssistantResponseBlock[] = [];

  if (visualSeparatorRegex.test(normalized)) {
    const sections = splitByVisualSeparators(normalized);
    sections.forEach((section, index) => {
      const { title, body } = extractVisualTitleAndBody(section);
      appendSectionBlocks(blocks, messageId, index, title, body);
    });

    return blocks.length
      ? blocks
      : [
          {
            id: `${messageId}-block-0-0`,
            kind: "text",
            title: "",
            body: normalized,
          },
        ];
  }

  const headingRegex = /^##\s+(.+)$/gm;
  const headingMatches = [...normalized.matchAll(headingRegex)];

  if (!headingMatches.length) {
    appendSectionBlocks(blocks, messageId, 0, "", normalized);
    return blocks.length
      ? blocks
      : [
          {
            id: `${messageId}-block-0-0`,
            kind: "text",
            title: "",
            body: normalized,
          },
        ];
  }

  headingMatches.forEach((heading, index) => {
    const title = heading[1]?.trim() || `Bloco ${index + 1}`;
    const start = (heading.index ?? 0) + heading[0].length;
    const end = headingMatches[index + 1]?.index ?? normalized.length;
    const sectionBody = normalized.slice(start, end).trim();
    appendSectionBlocks(blocks, messageId, index, title, sectionBody);
  });

  return blocks.length
      ? blocks
      : [
          {
            id: `${messageId}-block-0-0`,
            kind: "text",
            title: "",
            body: normalized,
          },
        ];
}

export default function CommunityAgentChat({
  mode,
  conversationId,
}: CommunityAgentChatProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [copiedCodeBlockId, setCopiedCodeBlockId] = useState<string | null>(null);
  const [openedHtmlPreviewBlockId, setOpenedHtmlPreviewBlockId] = useState<string | null>(null);
  const [htmlPreviewHeights, setHtmlPreviewHeights] = useState<Record<string, number>>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const processedPendingConversationRef = useRef<string | null>(null);

  const canSend = useMemo(
    () => input.trim().length > 0 && !isSending,
    [input, isSending],
  );

  function persistConversation(
    targetConversationId: string,
    nextMessages: ChatMessage[],
    previousConversations?: StoredConversation[],
  ) {
    const baseConversations = previousConversations ?? loadCommunityConversations();
    const currentConversation = baseConversations.find(
      (conversation) => conversation.id === targetConversationId,
    );
    const createdAt = currentConversation?.createdAt ?? createTimestamp();
    const updatedAt = createTimestamp();
    const firstUserMessage = nextMessages.find((message) => message.role === "user");
    const title =
      currentConversation?.title ??
      createConversationTitleFromPrompt(firstUserMessage?.content ?? "");

    upsertConversation(
      {
        id: targetConversationId,
        title,
        messages: toStoredMessages(nextMessages),
        createdAt,
        updatedAt,
      },
      baseConversations,
    );
  }

  useEffect(() => {
    if (mode !== "thread") {
      return;
    }

    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isSending, mode]);

  useEffect(() => {
    if (mode !== "thread") {
      setMessages([]);
      return;
    }

    if (!conversationId) {
      setMessages([]);
      return;
    }

    const conversations = loadCommunityConversations();
    const currentConversation = conversations.find(
      (conversation) => conversation.id === conversationId,
    );

    if (!currentConversation) {
      setMessages([]);
      return;
    }

    setMessages(fromStoredMessages(conversationId, currentConversation.messages));
  }, [conversationId, mode]);

  useEffect(() => {
    if (mode !== "thread") {
      return;
    }

    const pendingPayload = parsePendingPayload(
      typeof window !== "undefined"
        ? window.sessionStorage.getItem(pendingMessageStorageKey)
        : null,
    );

    if (!pendingPayload) {
      return;
    }

    if (pendingPayload.conversationId && conversationId) {
      if (pendingPayload.conversationId !== conversationId) {
        return;
      }
    }

    const pendingConversationId = pendingPayload.conversationId || conversationId || "";
    if (
      pendingConversationId &&
      processedPendingConversationRef.current === pendingConversationId
    ) {
      return;
    }

    if (pendingConversationId) {
      processedPendingConversationRef.current = pendingConversationId;
    }

    window.sessionStorage.removeItem(pendingMessageStorageKey);
    void sendMessage(pendingPayload.content.trim(), pendingConversationId || undefined);
  }, [conversationId, mode]);

  useEffect(() => {
    if (!copiedMessageId) {
      return;
    }

    const timeout = window.setTimeout(() => setCopiedMessageId(null), 1200);
    return () => window.clearTimeout(timeout);
  }, [copiedMessageId]);

  useEffect(() => {
    if (!copiedCodeBlockId) {
      return;
    }

    const timeout = window.setTimeout(() => setCopiedCodeBlockId(null), 1200);
    return () => window.clearTimeout(timeout);
  }, [copiedCodeBlockId]);

  useEffect(() => {
    function handlePreviewHeight(event: MessageEvent) {
      if (typeof event.data !== "object" || event.data === null) {
        return;
      }

      const data = event.data as {
        type?: unknown;
        previewId?: unknown;
        height?: unknown;
      };

      if (
        data.type !== "grow-html-preview-height" ||
        typeof data.previewId !== "string" ||
        typeof data.height !== "number" ||
        !Number.isFinite(data.height)
      ) {
        return;
      }

      const previewId = data.previewId;
      const nextHeight = Math.max(260, Math.min(1400, Math.round(data.height)));
      setHtmlPreviewHeights((current) => {
        if (current[previewId] === nextHeight) {
          return current;
        }
        return {
          ...current,
          [previewId]: nextHeight,
        };
      });
    }

    window.addEventListener("message", handlePreviewHeight);
    return () => window.removeEventListener("message", handlePreviewHeight);
  }, []);

  async function copyMessage(messageId: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
    } catch {
      setCopiedMessageId(null);
    }
  }

  async function copyCodeBlock(blockId: string, code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeBlockId(blockId);
    } catch {
      setCopiedCodeBlockId(null);
    }
  }

  function toggleHtmlPreview(blockId: string) {
    setOpenedHtmlPreviewBlockId((current) => (current === blockId ? null : blockId));
  }

  async function sendMessage(
    externalContent?: string,
    forcedConversationId?: string,
  ) {
    const content = (externalContent ?? input).trim();
    if (!content || isSending) {
      return;
    }

    if (mode === "welcome") {
      const newConversationId = createId("conv");
      if (typeof window !== "undefined") {
        const payload: PendingMessagePayload = {
          conversationId: newConversationId,
          content,
        };
        window.sessionStorage.setItem(
          pendingMessageStorageKey,
          JSON.stringify(payload),
        );
      }
      setInput("");
      router.push(`/comunidade?view=thread&id=${newConversationId}`);
      return;
    }

    const targetConversationId =
      forcedConversationId || conversationId || createId("conv");

    if (!conversationId) {
      router.replace(`/comunidade?view=thread&id=${targetConversationId}`);
    }

    const userMessage: ChatMessage = {
      id: createId("user"),
      role: "user",
      content,
      createdAt: createTimestamp(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    persistConversation(targetConversationId, nextMessages);

    if (!externalContent) {
      setInput("");
    }
    setIsSending(true);

    try {
      const response = await fetch("/api/comunidade/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: toApiMessages(nextMessages).slice(-12),
        }),
      });

      const data: { reply?: string; error?: string } = await response.json();

      if (!response.ok || typeof data.reply !== "string" || !data.reply.trim()) {
        throw new Error(data.error ?? "Não foi possível gerar a resposta.");
      }

      const reply = data.reply.trim();
      const assistantMessage: ChatMessage = {
        id: createId("assistant"),
        role: "assistant",
        content: reply,
        createdAt: createTimestamp(),
      };
      const resolvedMessages = [...nextMessages, assistantMessage];
      setMessages(resolvedMessages);
      persistConversation(targetConversationId, resolvedMessages);
    } catch (error) {
      const fallbackMessage =
        error instanceof Error
          ? error.message
          : "Erro inesperado ao falar com o agente.";
      const errorMessage: ChatMessage = {
        id: createId("assistant-error"),
        role: "assistant",
        content: `Não consegui responder agora. ${fallbackMessage}`,
        createdAt: createTimestamp(),
      };
      const resolvedMessages = [...nextMessages, errorMessage];
      setMessages(resolvedMessages);
      persistConversation(targetConversationId, resolvedMessages);
    } finally {
      setIsSending(false);
    }
  }

  function handleTextareaKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <>
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overscroll-contain px-4 pb-60 pt-6 md:px-10 md:pt-12"
      >
        {mode === "welcome" ? (
          <div className="mx-auto flex h-full w-full max-w-[860px] flex-col items-center justify-center text-center">
            <p className="mt-2 text-[0.82rem] uppercase tracking-[0.14em] text-[#bcb8b1] sm:text-[0.86rem]">
              <span
                aria-hidden
                className="mr-2 inline-block h-[15px] w-[15px] translate-y-[2px] bg-[#f47b4f]"
                style={growIconMask}
              />
              Bem-vindo à Comunidade
            </p>
            <h1 className="mt-3 font-serif text-4xl font-medium text-[#d8d4cd] sm:text-5xl">
              Grow Academy
            </h1>
            <p className="mt-3 max-w-xl text-[0.96rem] text-[#a6a39d]">
              Tire dúvidas sobre treinamentos, prompts e Vibe Coding com resposta
              prática em blocos.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              {welcomeAccessItems.map((item) => {
                const Icon = item.icon;
                return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => router.push(item.href)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-[#2a2a28] px-4 py-2 text-[0.88rem] text-[#cfcbc4] transition-colors hover:bg-[#31312f]"
                >
                  <Icon size={13} className="text-white/70" />
                  <span>{item.label}</span>
                </button>
                );
              })}
            </div>
          </div>
        ) : (
	          <div className="mx-auto w-full max-w-[860px] space-y-8">
	            {messages.map((message) =>
	              message.role === "user" ? (
	                <div key={message.id} className="flex justify-end">
	                  <div className="max-w-[72%] rounded-3xl bg-black/60 px-4 py-2 text-[0.94rem] text-[#ece8df] sm:text-[0.99rem]">
	                    <p className="whitespace-pre-wrap">{message.content}</p>
	                  </div>
	                </div>
	              ) : (
	                <div key={message.id} className="max-w-[620px] text-left">
	                  <p className="inline-flex items-center gap-1.5 text-[0.82rem] text-[#9d9a93]">
	                    <span
	                      aria-hidden
	                      className="inline-block h-[14px] w-[14px] bg-[#f47b4f]"
	                      style={growIconMask}
	                    />
	                    Pensou por 1s
	                    <ChevronRight size={11} />
	                  </p>

	                  <div className="mt-3.5 space-y-3">
	                    {parseAssistantBlocks(message.id, message.content).map((block) =>
	                      block.kind === "code" ? (
	                        <article
	                          key={block.id}
	                          className="overflow-hidden rounded-2xl border border-[#494741] bg-[#222220]"
	                        >
                              {(() => {
                                const isHtmlBlock = isHtmlLanguage(block.language);
                                const isPreviewOpen =
                                  isHtmlBlock && openedHtmlPreviewBlockId === block.id;
                                const previewHeight = htmlPreviewHeights[block.id] ?? 420;

                                return (
                                  <>
	                          <div className="flex items-center justify-between border-b border-white/8 px-3 py-2">
	                            <p className="text-[0.76rem] font-medium text-[#c7c3bc]">
	                              {block.title || "Código"}
	                            </p>
                              <div className="flex items-center gap-2">
                                  {isHtmlBlock ? (
                                    <button
                                      type="button"
                                      onClick={() => toggleHtmlPreview(block.id)}
                                      className={`rounded-full border px-2 py-0.5 text-[0.68rem] transition-colors ${
                                        isPreviewOpen
                                          ? "border-[#f47b4f]/55 bg-[#f47b4f]/16 text-[#ffd9c8]"
                                          : "border-white/12 text-[#8f8b84] hover:border-white/20 hover:text-[#d5d1ca]"
                                      }`}
                                      aria-label={
                                        isPreviewOpen
                                          ? "Fechar preview HTML"
                                          : "Abrir preview HTML"
                                      }
                                    >
                                      Preview
                                    </button>
                                  ) : (
	                                <span className="rounded-full border border-white/12 px-2 py-0.5 text-[0.68rem] text-[#8f8b84]">
	                                  {block.language}
	                                </span>
                                  )}
                                <button
                                  type="button"
                                  onClick={() => void copyCodeBlock(block.id, block.code)}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-2 py-0.5 text-[0.68rem] text-[#bdb9b2] transition-colors hover:border-white/20 hover:text-[#e6e2da]"
                                  aria-label="Copiar código"
                                >
                                  <Copy size={11} />
                                  {copiedCodeBlockId === block.id ? "Copiado" : "Copiar"}
                                </button>
                              </div>
	                          </div>
                                  {isPreviewOpen ? (
                                    <div className="border-b border-white/8 bg-[#1b1b19] p-3">
                                      <p className="mb-2 text-[0.68rem] uppercase tracking-[0.08em] text-[#9d9a93]">
                                        Preview
                                      </p>
                                      <div className="overflow-hidden rounded-xl border border-white/12 bg-white">
                                        <iframe
                                          title={`Preview HTML ${block.id}`}
                                          srcDoc={buildHtmlPreviewDocument(block.code, block.id)}
                                          sandbox="allow-scripts allow-forms allow-modals"
                                          scrolling="no"
                                          className="w-full border-0"
                                          style={{ height: `${previewHeight}px` }}
                                        />
                                      </div>
                                    </div>
                                  ) : null}
	                          <pre className="max-h-[340px] overflow-x-auto overflow-y-auto px-3 py-3 text-[0.78rem] leading-relaxed text-[#ddd9d1]">
	                            <code>{block.code}</code>
	                          </pre>
                                  </>
                                );
                              })()}
	                        </article>
	                      ) : (
	                        <article
	                          key={block.id}
	                          className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
	                        >
	                          {block.title ? (
	                            <p className="text-[1.08rem] font-semibold leading-tight text-[#d5d1c9]">
	                              {block.title}
	                            </p>
	                          ) : null}
	                          <p
	                            className={`whitespace-pre-wrap text-[0.96rem] leading-[2.1] sm:leading-[2.25] text-[#ddd9d1] ${
	                              block.title ? "mt-2" : ""
	                            }`}
	                          >
	                            {renderTextWithLinks(block.body)}
	                          </p>
	                        </article>
	                      ),
	                    )}
	                  </div>

	                  <div className="mt-4.5 flex items-center gap-3 text-[#a6a39d]">
	                    <button
	                      type="button"
                      onClick={() => void copyMessage(message.id, message.content)}
                      className="transition-colors hover:text-white/90"
                      aria-label="Copiar resposta"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      type="button"
                      className="transition-colors hover:text-white/90"
                      aria-label="Gostei da resposta"
                    >
                      <ThumbsUp size={14} />
                    </button>
                    <button
                      type="button"
                      className="transition-colors hover:text-white/90"
                      aria-label="Não gostei da resposta"
                    >
                      <ThumbsDown size={14} />
                    </button>
                    <button
                      type="button"
                      className="transition-colors hover:text-white/90"
                      aria-label="Gerar nova resposta"
                    >
                      <RefreshCcw size={14} />
                    </button>
	                    {copiedMessageId === message.id ? (
	                      <span className="text-[0.8rem] text-[#9d9a93]">Copiado</span>
	                    ) : null}
	                  </div>
	                </div>
	              ),
	            )}

	            {isSending ? (
	              <div className="max-w-[620px] text-left">
	                <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
	                  <span
	                    aria-hidden
	                    className="inline-block h-[18px] w-[18px] bg-[#f47b4f] opacity-90 animate-pulse"
	                    style={growIconMask}
	                  />
	                  <p className="text-[0.82rem] text-[#9d9a93]">Pensando na resposta...</p>
	                </div>
	              </div>
	            ) : null}
	          </div>
        )}
      </div>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 z-20 h-44 bg-[linear-gradient(180deg,rgba(31,31,29,0)_0%,rgba(31,31,29,0.86)_45%,rgba(31,31,29,1)_100%)] md:left-[300px]"
      />

      <form
        className="fixed inset-x-0 bottom-0 z-30 px-3 pb-3 pt-6 md:left-[300px] md:right-0 md:px-10 md:pb-5"
        onSubmit={(event) => {
          event.preventDefault();
          void sendMessage();
        }}
      >
        <div className="mx-auto w-full max-w-[860px]">
          <div className="rounded-[24px] border border-white/14 bg-[#2f2f2d]/92 px-4 py-3.5 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.95)] backdrop-blur-lg supports-[backdrop-filter]:bg-[#2f2f2d]/82 md:px-5 md:py-4">
            <label className="block">
              <span className="sr-only">Mensagem para o agente</span>
	              <textarea
	                rows={1}
	                value={input}
	                onChange={(event) => setInput(event.target.value)}
	                onKeyDown={handleTextareaKeyDown}
	                placeholder="Pergunte sobre treinamentos, prompts, Vibe Coding ou peça código..."
	                className="w-full resize-none bg-transparent text-[clamp(0.92rem,1vw,0.98rem)] text-[#bcb9b2] placeholder:text-[#a7a49e] outline-none"
	              />
	            </label>

            <div className="mt-3.5 flex items-center justify-between">
              <button
                type="button"
                className="inline-flex h-7 w-7 items-center justify-center text-[#c7c4bd]"
                aria-label="Adicionar arquivo"
              >
                <Plus size={14} />
              </button>

              <div className="flex items-center gap-3 text-[#b7b4ad]">
                <span className="text-[0.84rem]">Agente Grow+</span>
                <ChevronDown size={11} />
                <button
                  type="submit"
                  disabled={!canSend}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    canSend
                      ? "bg-[#f47b4f] text-[#1c1b18]"
                      : "bg-[#5a5a58] text-[#1f1f1d]"
                  }`}
                  aria-label="Enviar mensagem"
                >
                  <ArrowUp size={16} strokeWidth={2.6} />
                </button>
              </div>
            </div>
          </div>
          <p className="mt-2 text-center text-[0.7rem] text-[#8b8882]">
            A IA da comunidade pode cometer erros. Revise sempre as respostas.
          </p>
        </div>
      </form>
    </>
  );
}
