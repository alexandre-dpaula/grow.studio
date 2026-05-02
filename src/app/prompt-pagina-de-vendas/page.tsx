"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronRight,
  TriangleAlert,
  Copy,
  LayoutTemplate,
  Share2,
} from "lucide-react";
import { getCommunityUnlockHref } from "@/lib/community-access";

type SectionKey =
  | "hero"
  | "ticker"
  | "professor"
  | "prova"
  | "modulos"
  | "faq"
  | "garantia"
  | "footer_cta"
  | "countdown"
  | "bonus";

type JSKey =
  | "smooth_scroll"
  | "email_validation"
  | "intersection"
  | "cta_hover"
  | "countdown_js"
  | "sticky_header"
  | "pixel"
  | "whatsapp";

type StepId = "projeto" | "visual" | "secoes" | "scripts" | "mensagem";

type FormData = {
  product: string;
  niche: string;
  expert: string;
  cta: string;
  color1: string;
  colorbg: string;
  bodyColor: string;
  buttonTextColor: string;
  font: string;
  fontSecondary: string;
  aestheticEnabled: boolean;
  aesthetic: string;
  headline: string;
  subheadline: string;
  notes: string;
  sections: SectionKey[];
  jsFeatures: JSKey[];
};

const FONTS = [
  "Inter",
  "Poppins",
  "Montserrat",
  "DM Sans",
  "Manrope",
  "Plus Jakarta Sans",
  "Roboto",
  "Open Sans",
  "Lato",
  "Nunito Sans",
  "Work Sans",
  "Space Grotesk",
  "Sora",
  "Raleway",
];

const AESTHETICS = [
  "Dark Premium (fundo escuro + neon/glow)",
  "Dark Minimalista (fundo escuro + branco)",
  "Light Moderno (fundo branco + cor)",
  "Gradiente (cores vibrantes)",
  "Corporativo Sério (azul/cinza)",
];

const STEPS: { id: StepId; number: string; title: string }[] = [
  { id: "projeto", number: "01", title: "PROJETO E OFERTA" },
  { id: "visual", number: "02", title: "IDENTIDADE VISUAL" },
  { id: "secoes", number: "03", title: "SEÇÕES DA PÁGINA" },
  { id: "scripts", number: "04", title: "FUNCIONALIDADES JS" },
  { id: "mensagem", number: "05", title: "MENSAGENS E REGRAS" },
];

const SECTIONS: { key: SectionKey; label: string; defaultOn: boolean }[] = [
  { key: "hero", label: "Hero com formulário", defaultOn: true },
  { key: "ticker", label: "Ticker bar animado", defaultOn: true },
  { key: "professor", label: "Quem é o especialista", defaultOn: true },
  { key: "prova", label: "Prova social / depoimentos", defaultOn: false },
  { key: "modulos", label: "Módulos / conteúdo", defaultOn: false },
  { key: "faq", label: "FAQ", defaultOn: false },
  { key: "garantia", label: "Garantia / risco zero", defaultOn: false },
  { key: "footer_cta", label: "Footer com CTA", defaultOn: true },
  { key: "countdown", label: "Contador regressivo", defaultOn: false },
  { key: "bonus", label: "Bônus / extras", defaultOn: false },
];

const JS_FEATURES: { key: JSKey; label: string; defaultOn: boolean }[] = [
  { key: "smooth_scroll", label: "Smooth scroll", defaultOn: true },
  { key: "email_validation", label: "Validação de e-mail", defaultOn: true },
  { key: "intersection", label: "Animação de entrada (scroll)", defaultOn: true },
  { key: "cta_hover", label: "Micro-animação no botão", defaultOn: true },
  { key: "countdown_js", label: "Contador regressivo", defaultOn: false },
  { key: "sticky_header", label: "Header fixo com scroll", defaultOn: false },
  { key: "pixel", label: "Integração Meta Pixel", defaultOn: false },
  { key: "whatsapp", label: "Botão flutuante WhatsApp", defaultOn: false },
];

const SECTION_LABELS: Record<SectionKey, string> = {
  hero: "Hero com formulário de captura (headline + subtítulo + input email + botão CTA)",
  ticker: "Ticker bar com rolagem infinita horizontal (texto repetido animado)",
  professor:
    "Seção \"Quem é o especialista\" com foto + bio com conquistas em destaque",
  prova: "Prova social — depoimentos de alunos com foto, nome e resultado",
  modulos: "Módulos / grade de conteúdo com ícones e descrições",
  faq: "FAQ (perguntas frequentes) com accordion expansível",
  garantia: "Bloco de garantia / risco zero com ícone de escudo",
  footer_cta: "Footer com repetição do CTA (formulário + botão)",
  countdown:
    "Contador regressivo com urgência (dias, horas, minutos, segundos)",
  bonus: "Seção de bônus com cards de benefícios extras",
};

const SECTION_SIMULATOR_LABELS: Record<SectionKey, string> = {
  hero: "Hero + Formulário",
  ticker: "Ticker Animado",
  professor: "Especialista",
  prova: "Prova Social",
  modulos: "Módulos",
  faq: "FAQ",
  garantia: "Garantia",
  footer_cta: "Footer CTA",
  countdown: "Contador",
  bonus: "Bônus",
};

const JS_LABELS: Record<JSKey, string> = {
  smooth_scroll: "Smooth scroll para âncoras internas",
  email_validation: "Validação de e-mail em tempo real com feedback visual",
  intersection:
    "Animação de entrada fade-in + slide-up via IntersectionObserver",
  cta_hover: "Micro-animação no botão CTA (scale + glow no hover)",
  countdown_js: "Contador regressivo funcional com data alvo configurável",
  sticky_header: "Header fixo com mudança de opacidade/blur no scroll",
  pixel: "Integração Meta Pixel (evento Lead no submit do formulário)",
  whatsapp: "Botão flutuante do WhatsApp no canto inferior direito",
};

const defaultSections = SECTIONS.filter((s) => s.defaultOn).map((s) => s.key);
const defaultJS = JS_FEATURES.filter((j) => j.defaultOn).map((j) => j.key);
const HIGHLIGHT_START = "__GROWS_HL_START__";
const HIGHLIGHT_END = "__GROWS_HL_END__";

const emptyForm: FormData = {
  product: "",
  niche: "",
  expert: "",
  cta: "",
  color1: "#1a66ff",
  colorbg: "#0A0A12",
  bodyColor: "#b8b8b8",
  buttonTextColor: "#FFFFFF",
  font: "Sora",
  fontSecondary: "Poppins",
  aestheticEnabled: false,
  aesthetic: AESTHETICS[0],
  headline: "",
  subheadline: "",
  notes: "",
  sections: defaultSections,
  jsFeatures: defaultJS,
};

function highlightTypedValue(value: string, shouldHighlight: boolean): string {
  const cleanValue = value.trim();
  if (!cleanValue || !shouldHighlight) {
    return cleanValue;
  }
  return `${HIGHLIGHT_START}${cleanValue}${HIGHLIGHT_END}`;
}

function buildPrompt(f: FormData, highlightTyped = false): string {
  const colorBg = highlightTypedValue(f.colorbg, highlightTyped) || "#0A0A12";
  const colorPrimary = highlightTypedValue(f.color1, highlightTyped) || "#1A6EFF";
  const colorTextMuted =
    highlightTypedValue(f.bodyColor, highlightTyped) || "#A0A8C0";
  const colorButtonText =
    highlightTypedValue(f.buttonTextColor, highlightTyped) || "#FFFFFF";
  const colorGlow = f.aestheticEnabled
    ? highlightTypedValue(`${f.color1}66`, highlightTyped) || "#1A6EFF66"
    : "transparent";
  const aestheticLine = f.aestheticEnabled
    ? f.aesthetic
    : "Desativada (usar cor sólida de fundo, sem gradientes)";
  const effectsLine = f.aestheticEnabled
    ? "Habilitados (gradiente + glow)"
    : "Desativados (somente cor sólida de fundo)";
  const fontHeading =
    highlightTypedValue(f.font, highlightTyped) || "Montserrat";
  const fontBody = highlightTypedValue(f.fontSecondary, highlightTyped) || "Inter";
  const product =
    highlightTypedValue(f.product, highlightTyped) || "[NOME DO PRODUTO]";
  const niche = highlightTypedValue(f.niche, highlightTyped) || "[NICHO]";
  const expert =
    highlightTypedValue(f.expert, highlightTyped) || "[ESPECIALISTA]";
  const cta = highlightTypedValue(f.cta, highlightTyped) || "Fazer meu cadastro";
  const headlineTxt =
    highlightTypedValue(f.headline, highlightTyped) ||
    "[a partir da imagem de referência]";
  const subTxt =
    highlightTypedValue(f.subheadline, highlightTyped) ||
    "[a partir da imagem de referência]";
  const notes = highlightTypedValue(f.notes, highlightTyped);

  return `Crie uma página de vendas completa em um único arquivo HTML (com CSS e JS embutidos).

## PROJETO
- Produto/Evento: ${product}
- Nicho: ${niche}
- Especialista/Marca: ${expert}
- CTA principal: "${cta}"
- Headline principal: ${headlineTxt}
- Subtítulo: ${subTxt}

## IDENTIDADE VISUAL
- Estética: ${aestheticLine}
- Efeitos visuais: ${effectsLine}
- Cor primária: ${colorPrimary}
- Cor de fundo: ${colorBg}
- Cor do texto do corpo: ${colorTextMuted}
- Cor do texto do botão CTA: ${colorButtonText}
- Tipografia: "${fontHeading}" (Google Fonts) para headlines + "${fontBody}" para corpo
- Variáveis CSS obrigatórias no :root:

:root {
  --color-bg: ${colorBg};
  --color-primary: ${colorPrimary};
  --color-text: #FFFFFF;
  --color-text-muted: ${colorTextMuted};
  --color-button-text: ${colorButtonText};
  --color-glow: ${colorGlow};
  --font-heading: '${fontHeading}', sans-serif;
  --font-body: '${fontBody}', sans-serif;
  --border-radius: 10px;
  --transition: all 0.3s ease;
}

## SEÇÕES A CRIAR (nessa ordem)
${f.sections.map((s) => `- ${SECTION_LABELS[s]}`).join("\n")}

## FUNCIONALIDADES JAVASCRIPT
${f.jsFeatures.map((j) => `- ${JS_LABELS[j]}`).join("\n")}

## REQUISITOS TÉCNICOS OBRIGATÓRIOS
- Arquivo único: index.html com <style> e <script> embutidos
- 100% responsivo (mobile-first), breakpoints: 480px / 768px / 1200px
- Fontes via Google Fonts CDN
- Ícones via SVG inline ou Font Awesome 6 CDN
- Imagens: usar https://placehold.co/ com dimensões corretas + comentários HTML indicando onde substituir
- CSS puro, sem Bootstrap, sem Tailwind, sem frameworks externos
- Semântica HTML5 correta (header, main, section, footer)
- Código comentado em português indicando cada seção
- Performance: lazy loading em imagens, CSS animations com will-change

## PADRÃO VISUAL DETALHADO
Use a imagem de referência anexada como guia visual principal. Replique fielmente:
- Composição do layout (colunas, proporções, hierarquia)
- Estilo dos elementos gráficos (formas, gradientes decorativos, glows)
- Peso e tamanho tipográficos
- Espaçamentos e ritmo vertical
- Animações e efeitos hover visíveis na referência${
    notes ? `\n\n## OBSERVAÇÕES ESPECIAIS\n${notes}` : ""
  }

Entregue o código completo e funcional, pronto para abrir no navegador.`;
}

function renderPreviewWithHighlight(text: string): React.ReactNode {
  const tokens = text.split(
    new RegExp(`(${HIGHLIGHT_START}[\\s\\S]*?${HIGHLIGHT_END})`, "g"),
  );

  return tokens.map((token, index) => {
    const isHighlighted =
      token.startsWith(HIGHLIGHT_START) && token.endsWith(HIGHLIGHT_END);

    if (!isHighlighted) {
      return <span key={`plain-${index}`}>{token}</span>;
    }

    const highlightedValue = token.slice(
      HIGHLIGHT_START.length,
      -HIGHLIGHT_END.length,
    );
    const isFontName = FONTS.includes(highlightedValue);

    const inlineStyle: React.CSSProperties = {
      color: "#f47b4f",
    };

    if (isFontName) {
      inlineStyle.fontFamily = `'${highlightedValue}', sans-serif`;
      inlineStyle.fontWeight = 700;
    }

    return (
      <span key={`highlight-${index}`} style={inlineStyle}>
        {highlightedValue}
      </span>
    );
  });
}

function isStepDone(id: StepId, f: FormData): boolean {
  switch (id) {
    case "projeto":
      return !!f.product && !!f.niche && !!f.expert && !!f.cta;
    case "visual":
      return !!f.color1 && !!f.colorbg && !!f.font && !!f.fontSecondary && !!f.aesthetic;
    case "secoes":
      return f.sections.length > 0;
    case "scripts":
      return f.jsFeatures.length > 0;
    case "mensagem":
      return !!f.headline || !!f.subheadline || !!f.notes;
  }
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[0.85rem] text-[#e4e0d8] placeholder-[#5a5753] outline-none transition-colors focus:border-[#f47b4f]/50 focus:bg-white/[0.06]";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#9f9b94]">
        {label}
      </label>
      {children}
    </div>
  );
}

function SelectControl({
  id,
  value,
  onChange,
  disabled = false,
  children,
}: {
  id?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        className={`${inputCls} appearance-none pr-10 ${disabled ? "cursor-not-allowed opacity-55" : "cursor-pointer"}`}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <ChevronDown
          size={17}
          className={`transition-colors ${disabled ? "text-[#66625e]" : "text-[#c2beb7]"}`}
        />
      </span>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[0.82rem] transition-colors ${
        active
          ? "border-[#f47b4f]/60 bg-[#f47b4f]/15 text-[#ffd7c6]"
          : "border-white/10 bg-white/[0.03] text-[#9f9b94] hover:border-white/20"
      }`}
    >
      <span
        className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
          active
            ? "border-[#f47b4f]/70 bg-[#f47b4f]/20 text-[#ffd7c6]"
            : "border-white/20 bg-white/[0.04] text-transparent"
        }`}
      >
        <Check size={9} />
      </span>
      {label}
    </button>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-[0.82rem] font-semibold transition-all ${
        copied
          ? "border-lime-400/40 bg-lime-400/10 text-lime-300"
          : "border-white/10 bg-white/4 text-[#9f9b94] hover:bg-white/8 hover:text-[#e6e2d9]"
      }`}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copiado!" : "Copiar prompt"}
    </button>
  );
}

function normalizeHexColor(hex: string): string | null {
  const cleaned = hex.trim().toLowerCase();
  if (!cleaned.startsWith("#")) {
    return null;
  }

  if (/^#[0-9a-f]{6}$/.test(cleaned)) {
    return cleaned;
  }

  if (/^#[0-9a-f]{3}$/.test(cleaned)) {
    return `#${cleaned[1]}${cleaned[1]}${cleaned[2]}${cleaned[2]}${cleaned[3]}${cleaned[3]}`;
  }

  return null;
}

function withAlpha(hex: string, alpha: string, fallback: string): string {
  const normalized = normalizeHexColor(hex);
  if (!normalized) {
    return fallback;
  }
  return `${normalized}${alpha}`;
}

function getContrastTextColor(backgroundHex: string): string {
  const normalized = normalizeHexColor(backgroundHex);
  if (!normalized) {
    return "#FFFFFF";
  }

  const r = parseInt(normalized.slice(1, 3), 16);
  const g = parseInt(normalized.slice(3, 5), 16);
  const b = parseInt(normalized.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.58 ? "#151513" : "#FFFFFF";
}

function getAestheticBackground(
  aesthetic: string,
  colorBg: string,
  colorPrimary: string,
): string {
  switch (aesthetic) {
    case "Dark Premium (fundo escuro + neon/glow)":
      return `radial-gradient(circle at 16% 24%, ${withAlpha(colorPrimary, "3d", "rgba(26,110,255,0.24)")}, transparent 42%), radial-gradient(circle at 84% 76%, ${withAlpha(colorPrimary, "2b", "rgba(26,110,255,0.17)")}, transparent 40%), linear-gradient(120deg, ${withAlpha(colorBg, "ff", "#0a0a12")} 0%, #0c0e18 55%, #080a11 100%)`;
    case "Dark Minimalista (fundo escuro + branco)":
      return `linear-gradient(165deg, ${withAlpha(colorBg, "ff", "#0a0a12")} 0%, #0c0d12 100%)`;
    case "Light Moderno (fundo branco + cor)":
      return `radial-gradient(circle at 12% 18%, ${withAlpha(colorPrimary, "1f", "rgba(26,110,255,0.12)")}, transparent 44%), linear-gradient(180deg, #f7f8fc 0%, #eef2f8 100%)`;
    case "Gradiente (cores vibrantes)":
      return `linear-gradient(135deg, ${withAlpha(colorPrimary, "66", "rgba(26,110,255,0.4)")} 0%, ${withAlpha(colorBg, "ff", "#0a0a12")} 58%, #101423 100%)`;
    case "Corporativo Sério (azul/cinza)":
      return `linear-gradient(145deg, #0f172a 0%, #111827 50%, #1f2937 100%)`;
    default:
      return `linear-gradient(165deg, ${withAlpha(colorBg, "ff", "#0a0a12")} 0%, #0c0d12 100%)`;
  }
}

function VisualIdentityMock({ f }: { f: FormData }) {
  const headline = f.headline.trim() || f.product.trim() || "Sua Headline Principal";
  const bodyText =
    f.subheadline.trim() ||
    (f.niche.trim()
      ? `Estrutura pensada para converter no nicho de ${f.niche.trim()}.`
      : "Subheadline com promessa clara e benefício direto para o visitante.");
  const ctaText = f.cta.trim() || "Fazer meu cadastro";

  const isLightAesthetic =
    f.aestheticEnabled &&
    f.aesthetic === "Light Moderno (fundo branco + cor)";
  const textColor = isLightAesthetic ? "#111827" : getContrastTextColor(f.colorbg);
  const bodyTextColor = normalizeHexColor(f.bodyColor);
  const mutedTextColor = bodyTextColor || (textColor === "#FFFFFF" ? "#A0A8C0" : "#4B5563");
  const buttonTextColor = normalizeHexColor(f.buttonTextColor) || "#ffffff";
  const glowColor = f.aestheticEnabled
    ? withAlpha(f.color1, "66", "#1A6EFF66")
    : "rgba(0,0,0,0.45)";
  const shapeColorA = withAlpha(f.color1, "30", "rgba(26,110,255,0.30)");
  const shapeColorB = withAlpha(f.color1, "22", "rgba(26,110,255,0.22)");
  const shapeColorC = withAlpha(f.color1, "14", "rgba(26,110,255,0.14)");
  const solidBackground = withAlpha(f.colorbg, "ff", "#0a0a12");
  const mockBg = f.aestheticEnabled
    ? getAestheticBackground(f.aesthetic, f.colorbg, f.color1)
    : solidBackground;
  const sectionsInOrder = SECTIONS.map((section) => section.key).filter((key) =>
    f.sections.includes(key),
  );
  const simulatorSections: SectionKey[] =
    sectionsInOrder.length > 0 ? sectionsInOrder : ["hero", "footer_cta"];

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#10100f] shadow-[0_24px_90px_-46px_rgba(0,0,0,0.95)]">
      <div className="relative flex h-[44px] items-center justify-between border-b border-white/8 bg-[linear-gradient(90deg,#2f3239_0%,#3e3a36_26%,#303238_56%,#262a31_100%)] px-4 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="h-[12px] w-[12px] rounded-full bg-[#e53b2e]" />
          <span className="h-[12px] w-[12px] rounded-full bg-[#d6b13a]" />
          <span className="h-[12px] w-[12px] rounded-full bg-[#47c93e]" />
        </div>
        <div className="h-[24px] w-[48%] min-w-[150px] max-w-[460px] rounded-lg border border-white/10 bg-[#6d6b6b]/86" />
        <div className="flex items-center gap-2 text-[#8d919b]">
          <span className="inline-flex h-5 w-5 items-center justify-center">
            <Share2 size={14} strokeWidth={1.7} />
          </span>
          <span className="inline-flex h-5 w-5 items-center justify-center">
            <Copy size={14} strokeWidth={1.7} />
          </span>
        </div>
      </div>

      <div
        className="relative min-h-[290px] overflow-hidden p-6 sm:min-h-[330px] sm:p-8"
        style={{
          backgroundImage: mockBg,
          color: textColor,
          fontFamily: `'${f.fontSecondary}', sans-serif`,
        }}
      >
        {f.aestheticEnabled ? (
          <>
            <div
              className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full blur-2xl"
              style={{ backgroundColor: shapeColorA }}
            />
            <div
              className="pointer-events-none absolute -right-12 top-16 h-44 w-44 rounded-full blur-2xl"
              style={{ backgroundColor: shapeColorB }}
            />
            <div
              className="pointer-events-none absolute bottom-0 left-1/3 h-32 w-32 rounded-full blur-2xl"
              style={{ backgroundColor: shapeColorC }}
            />
          </>
        ) : null}

        <div className="relative z-10 max-w-[440px]">
          <h3
            className="text-[clamp(1.4rem,2.4vw,2rem)] font-bold uppercase leading-[1.05]"
            style={{ fontFamily: `'${f.font}', sans-serif` }}
          >
            {headline}
          </h3>
          <p
            className="mt-3 max-w-[420px] text-[0.9rem] leading-relaxed sm:text-[0.95rem]"
            style={{ color: mutedTextColor }}
          >
            {bodyText}
          </p>
          <button
            type="button"
            className="mt-5 inline-flex items-center rounded-lg px-5 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] shadow-[0_10px_30px_-16px_rgba(0,0,0,0.8)]"
            style={{
              backgroundColor: f.color1,
              color: buttonTextColor,
              boxShadow: `0 0 0 1px ${withAlpha(f.color1, "7a", f.color1)}, 0 10px 30px -16px ${glowColor}`,
            }}
          >
            {ctaText}
          </button>
        </div>

        <div className="relative z-10 mt-6 flex max-w-[560px] flex-wrap gap-2 sm:mt-8">
          {simulatorSections.map((sectionKey) => (
            <div
              key={sectionKey}
              className="rounded-lg border px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.06em]"
              style={{
                borderColor: withAlpha(f.color1, "50", "rgba(255,255,255,0.16)"),
                backgroundColor: withAlpha(
                  f.color1,
                  "14",
                  "rgba(255,255,255,0.04)",
                ),
                color: mutedTextColor,
              }}
            >
              {SECTION_SIMULATOR_LABELS[sectionKey]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepProjeto({
  f,
  set,
}: {
  f: FormData;
  set: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
}) {
  return (
    <div className="space-y-4">
      <Field label="Nome do Produto / Evento">
        <input
          className={inputCls}
          placeholder="Ex: Desafio de Gestão de Tráfego"
          value={f.product}
          onChange={(e) => set("product", e.target.value)}
        />
      </Field>
      <Field label="Nicho / Segmento">
        <input
          className={inputCls}
          placeholder="Ex: Marketing Digital, Saúde, Finanças"
          value={f.niche}
          onChange={(e) => set("niche", e.target.value)}
        />
      </Field>
      <Field label="Nome do Especialista / Marca">
        <input
          className={inputCls}
          placeholder="Ex: Pedro Sobral, GrowS"
          value={f.expert}
          onChange={(e) => set("expert", e.target.value)}
        />
      </Field>
      <Field label="Oferta Principal (CTA)">
        <input
          className={inputCls}
          placeholder="Ex: Fazer meu cadastro grátis"
          value={f.cta}
          onChange={(e) => set("cta", e.target.value)}
        />
      </Field>
    </div>
  );
}

function StepVisual({
  f,
  set,
}: {
  f: FormData;
  set: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Cor Primária">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={f.color1}
              onChange={(e) => set("color1", e.target.value)}
              className="h-11 w-11 shrink-0 cursor-pointer rounded-xl border border-white/10 bg-transparent p-1"
            />
            <input
              className={inputCls}
              value={f.color1}
              onChange={(e) => set("color1", e.target.value)}
            />
          </div>
        </Field>
        <Field label="Cor de Fundo">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={f.colorbg}
              onChange={(e) => set("colorbg", e.target.value)}
              className="h-11 w-11 shrink-0 cursor-pointer rounded-xl border border-white/10 bg-transparent p-1"
            />
            <input
              className={inputCls}
              value={f.colorbg}
              onChange={(e) => set("colorbg", e.target.value)}
            />
          </div>
        </Field>
        <Field label="Cor do Texto Corpo">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={normalizeHexColor(f.bodyColor) || "#a0a8c0"}
              onChange={(e) => set("bodyColor", e.target.value)}
              className="h-11 w-11 shrink-0 cursor-pointer rounded-xl border border-white/10 bg-transparent p-1"
            />
            <input
              className={inputCls}
              value={f.bodyColor}
              onChange={(e) => set("bodyColor", e.target.value)}
            />
          </div>
        </Field>
        <Field label="Cor do texto do botão">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={normalizeHexColor(f.buttonTextColor) || "#ffffff"}
              onChange={(e) => set("buttonTextColor", e.target.value)}
              className="h-11 w-11 shrink-0 cursor-pointer rounded-xl border border-white/10 bg-transparent p-1"
            />
            <input
              className={inputCls}
              value={f.buttonTextColor}
              onChange={(e) => set("buttonTextColor", e.target.value)}
            />
          </div>
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Fonte Principal">
          <SelectControl
            value={f.font}
            onChange={(e) => set("font", e.target.value)}
          >
            {FONTS.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </SelectControl>
        </Field>
        <Field label="Fonte Secundária">
          <SelectControl
            value={f.fontSecondary}
            onChange={(e) => set("fontSecondary", e.target.value)}
          >
            {FONTS.map((font) => (
              <option key={`secondary-${font}`} value={font}>
                {font}
              </option>
            ))}
          </SelectControl>
        </Field>
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <label
            htmlFor="aesthetic-select"
            className="block text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#9f9b94]"
          >
            Estética Visual
          </label>
          <button
            type="button"
            role="switch"
            aria-checked={f.aestheticEnabled}
            aria-label="Habilitar estética visual"
            onClick={() => set("aestheticEnabled", !f.aestheticEnabled)}
            className={`relative inline-flex h-5 w-10 items-center rounded-full border transition-colors ${
              f.aestheticEnabled
                ? "border-[#f47b4f]/65 bg-[#f47b4f]/30"
                : "border-white/20 bg-white/10"
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
                f.aestheticEnabled ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <SelectControl
          id="aesthetic-select"
          value={f.aesthetic}
          onChange={(e) => set("aesthetic", e.target.value)}
          disabled={!f.aestheticEnabled}
        >
          {AESTHETICS.map((aesthetic) => (
            <option key={aesthetic} value={aesthetic}>
              {aesthetic}
            </option>
          ))}
        </SelectControl>
        {!f.aestheticEnabled ? (
          <p className="mt-1.5 text-[0.7rem] text-[#9f9b94]">
            Desligado: usa somente a cor sólida do background.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function StepSecoes({
  f,
  toggle,
}: {
  f: FormData;
  toggle: (field: "sections" | "jsFeatures", value: SectionKey | JSKey) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-[0.82rem] leading-relaxed text-[#a9a59d]">
        Selecione os blocos que devem entrar na landing page.
      </p>
      <div className="flex flex-wrap gap-2">
        {SECTIONS.map((section) => (
          <Chip
            key={section.key}
            label={section.label}
            active={f.sections.includes(section.key)}
            onClick={() => toggle("sections", section.key)}
          />
        ))}
      </div>
    </div>
  );
}

function StepScripts({
  f,
  toggle,
}: {
  f: FormData;
  toggle: (field: "sections" | "jsFeatures", value: SectionKey | JSKey) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-[0.82rem] leading-relaxed text-[#a9a59d]">
        Marque as interações em JavaScript que o template precisa ter.
      </p>
      <div className="flex flex-wrap gap-2">
        {JS_FEATURES.map((feature) => (
          <Chip
            key={feature.key}
            label={feature.label}
            active={f.jsFeatures.includes(feature.key)}
            onClick={() => toggle("jsFeatures", feature.key)}
          />
        ))}
      </div>
    </div>
  );
}

function StepMensagem({
  f,
  set,
}: {
  f: FormData;
  set: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
}) {
  return (
    <div className="space-y-4">
      <Field label="Headline principal (opcional)">
        <input
          className={inputCls}
          placeholder="Ex: Gestão de Tráfego Enriquece"
          value={f.headline}
          onChange={(e) => set("headline", e.target.value)}
        />
      </Field>
      <Field label="Subheadline / proposta de valor (opcional)">
        <textarea
          rows={3}
          className={inputCls}
          placeholder="Ex: Aprenda o método de tráfego que mais gera resultados no Brasil..."
          value={f.subheadline}
          onChange={(e) => set("subheadline", e.target.value)}
        />
      </Field>
      <Field label="Observações especiais (tom, público, requisitos)">
        <textarea
          rows={4}
          className={inputCls}
          placeholder="Ex: Público-alvo são empreendedores 30-50 anos. Tom direto e confiante."
          value={f.notes}
          onChange={(e) => set("notes", e.target.value)}
        />
      </Field>
    </div>
  );
}

export default function PromptPaginaDeVendasPage() {
  const [from, setFrom] = useState<string | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFrom(params.get("from"));
  }, []);
  const backHref =
    from === "comunidade"
      ? getCommunityUnlockHref("/comunidade?view=chat")
      : "/shop";
  const backLabel =
    from === "comunidade" ? "Voltar para a Comunidade" : "Voltar para a Shop";
  const [form, setForm] = useState<FormData>(emptyForm);
  const [activeStep, setActiveStep] = useState<StepId>("projeto");

  useEffect(() => {
    const fontFamilies = Array.from(
      new Set(
        [form.font.trim(), form.fontSecondary.trim(), "Inter"].filter(Boolean),
      ),
    );
    const encodedFamilies = fontFamilies.map((font) =>
      font.replace(/\s+/g, "+"),
    );
    const linkId = `prompt-font-${encodedFamilies
      .join("-")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")}`;

    if (document.getElementById(linkId)) {
      return;
    }

    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?${encodedFamilies
      .map((font) => `family=${font}:wght@400;500;600;700`)
      .join("&")}&display=swap`;
    document.head.appendChild(link);
  }, [form.font, form.fontSecondary]);

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleField(
    field: "sections" | "jsFeatures",
    value: SectionKey | JSKey,
  ) {
    setForm((prev) => {
      const currentValues = prev[field];
      const hasValue = currentValues.includes(value as never);
      return {
        ...prev,
        [field]: hasValue
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  }

  function handleReset() {
    setForm(emptyForm);
    setActiveStep("projeto");
  }

  const promptText = useMemo(() => buildPrompt(form), [form]);
  const promptPreview = useMemo(() => buildPrompt(form, true), [form]);
  const charCount = promptText.length;
  const doneCount = STEPS.filter((step) => isStepDone(step.id, form)).length;
  const activeIndex = STEPS.findIndex((step) => step.id === activeStep);

  return (
    <main className="min-h-screen bg-[#1f1f1d] text-[#e6e2d9]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_10%_8%,rgba(244,123,79,0.16),transparent_38%),radial-gradient(circle_at_88%_0%,rgba(241,237,228,0.13),transparent_30%),linear-gradient(180deg,#1f1f1d_0%,#181816_100%)]" />

      <section className="mx-auto w-full max-w-[1140px] px-4 pb-8 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
        <div className="flex items-start gap-3 sm:gap-4">
          <Link
            href={backHref}
            aria-label={backLabel}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.03] text-[#d7d3cb] transition-colors hover:border-white/22 hover:bg-white/[0.06] hover:text-[#ebe7df]"
          >
            <ArrowLeft size={22} />
          </Link>
          <div className="flex-1 rounded-[30px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_30px_120px_-75px_rgba(0,0,0,0.95)] sm:p-8 lg:p-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#f47b4f]/45 bg-[#f47b4f]/16 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#ffd8c7]">
            <BadgeCheck size={14} />
            Grow+Studio
          </span>

          <div className="mt-5 flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#f47b4f]/35 bg-[#f47b4f]/12 text-[#ffd7c6]">
              <LayoutTemplate size={18} />
            </span>
            <div>
              <h1 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-bold uppercase leading-[0.95] text-[#f3efe7]">
                <span className="block">Gerador de Prompt para</span>
                <span className="block">Página de Vendas</span>
              </h1>
              <p className="mt-2 max-w-2xl text-[0.9rem] leading-relaxed text-[#b8b4ac] sm:text-[0.98rem]">
                Preencha por etapas, ajuste a identidade visual no simulador e
                acompanhe o prompt em tempo real para copiar e usar em qualquer IA
                que gere páginas web.
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1140px] px-4 pb-20 sm:px-6 lg:px-8">
        <nav className="mb-6 overflow-x-auto">
          <div className="flex min-w-max items-center">
            {STEPS.map((step, index) => {
              const done = isStepDone(step.id, form);
              const active = activeStep === step.id;
              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setActiveStep(step.id)}
                    className="group flex flex-col items-center gap-1.5 px-1"
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 font-mono text-[0.7rem] font-bold transition-all ${
                        done
                          ? "border-lime-400/60 bg-lime-400/15 text-lime-300"
                          : active
                            ? "border-[#f47b4f] bg-[#f47b4f]/20 text-[#ffd8c7]"
                            : "border-white/15 bg-white/[0.03] text-[#5a5753] group-hover:border-white/25 group-hover:text-[#a9a59d]"
                      }`}
                    >
                      {done ? <Check size={13} /> : step.number}
                    </span>
                    <span
                      className={`text-[0.65rem] font-bold uppercase tracking-[0.1em] whitespace-nowrap transition-colors ${
                        active
                          ? "text-[#ffd8c7]"
                          : done
                            ? "text-[#86827b]"
                            : "text-[#4a4744] group-hover:text-[#86827b]"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>

                  {index < STEPS.length - 1 ? (
                    <div
                      className={`mx-1 mb-5 h-px w-10 shrink-0 transition-colors sm:w-14 ${
                        done ? "bg-lime-400/30" : "bg-white/[0.08]"
                      }`}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="w-full lg:w-[480px] lg:shrink-0">
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <div className="mb-5 flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[0.68rem] font-bold ${
                    isStepDone(activeStep, form)
                      ? "border-lime-400/50 bg-lime-400/15 text-lime-300"
                      : "border-[#f47b4f]/40 bg-[#f47b4f]/12 text-[#ffd8c7]"
                  }`}
                >
                  {isStepDone(activeStep, form) ? (
                    <Check size={11} />
                  ) : (
                    STEPS.find((step) => step.id === activeStep)?.number
                  )}
                </span>
                <h2 className="text-[0.95rem] font-bold uppercase tracking-wide text-[#e4e0d8]">
                  {STEPS.find((step) => step.id === activeStep)?.title}
                </h2>
              </div>

              {activeStep === "projeto" ? (
                <StepProjeto f={form} set={setField} />
              ) : null}
              {activeStep === "visual" ? (
                <StepVisual f={form} set={setField} />
              ) : null}
              {activeStep === "secoes" ? (
                <StepSecoes f={form} toggle={toggleField} />
              ) : null}
              {activeStep === "scripts" ? (
                <StepScripts f={form} toggle={toggleField} />
              ) : null}
              {activeStep === "mensagem" ? (
                <StepMensagem f={form} set={setField} />
              ) : null}

              <div
                className={`mt-6 grid gap-2 ${
                  activeStep !== "projeto" ? "grid-cols-2" : "grid-cols-1"
                }`}
              >
                {activeStep !== "projeto" ? (
                  <button
                    onClick={() => setActiveStep(STEPS[activeIndex - 1].id)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[0.8rem] font-bold uppercase tracking-wide text-[#7a7672] transition-colors hover:border-white/18 hover:text-[#c2beb7]"
                  >
                    <ChevronRight size={13} className="rotate-180" />
                    Anterior
                  </button>
                ) : null}
                {activeStep !== "mensagem" ? (
                  <button
                    onClick={() => setActiveStep(STEPS[activeIndex + 1].id)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-[0.8rem] font-bold uppercase tracking-wide text-[#c2beb7] transition-colors hover:border-white/20 hover:text-[#e6e2d9]"
                  >
                    Próxima etapa
                    <ChevronRight size={13} />
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <div id="preview-prompt" className="flex-1">
            <div className="sticky top-4 flex flex-col gap-4">
              <div className={activeStep === "visual" ? "rounded-[24px] ring-1 ring-white/15" : ""}>
                <VisualIdentityMock f={form} />
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#d4d0c8]">
                  <TriangleAlert
                    size={14}
                    className="animate-[pulse_1.8s_ease-in-out_infinite] text-[#f4c7a9] opacity-90"
                  />
                  Prévia de Identidade Visual
                </p>
                <p className="mt-2 text-[0.78rem] leading-relaxed text-[#a9a59d]">
                  Este simulador serve para validar estilo visual (cores,
                  tipografia e botões).
                  <br />
                  <strong className="inline-block font-bold uppercase tracking-[0.04em] text-[#d4d0c8]">
                    A ESTRUTURA FINAL DA PÁGINA DE VENDAS SERÁ{" "}
                    <span className="text-lime-300">GERADA NO CÓDIGO.</span>
                  </strong>
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
                <div className="flex items-center justify-between border-b border-white/8 bg-white/[0.02] px-5 py-3.5">
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#9f9b94]">
                    Preview do Prompt
                  </p>
                  <span className="rounded-full border border-[#f47b4f]/35 bg-[#f47b4f]/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-[#ffd8c7]">
                    Tempo real
                  </span>
                </div>

                <div className="max-h-[560px] overflow-y-auto p-5">
                  <pre className="whitespace-pre-wrap font-mono text-[0.78rem] leading-relaxed text-[#b8b4ac]">
                    {renderPreviewWithHighlight(promptPreview)}
                  </pre>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <CopyButton text={promptText} />
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 px-4 py-2 text-[0.82rem] text-[#9f9b94] transition hover:bg-white/6 hover:text-[#e6e2d9]"
                >
                  Limpar campos
                </button>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#7a7672]">
                  Progresso
                </p>
                <div className="flex gap-1.5">
                  {STEPS.map((step) => (
                    <div
                      key={step.id}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        isStepDone(step.id, form)
                          ? "bg-lime-400/60"
                          : activeStep === step.id
                            ? "bg-[#f47b4f]/50"
                            : "bg-white/[0.06]"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-[0.7rem] text-[#5a5753]">
                  {doneCount} de {STEPS.length} etapas preenchidas
                </p>
                <p className="mt-1 text-[0.7rem] text-[#5a5753]">
                  {charCount.toLocaleString("pt-BR")} caracteres no prompt atual
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
