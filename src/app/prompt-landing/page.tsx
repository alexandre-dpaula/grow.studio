"use client";

import { useState } from "react";
import { Copy, Check, LayoutTemplate } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SectionKey =
  | "hero" | "ticker" | "professor" | "prova" | "modulos"
  | "faq" | "garantia" | "footer_cta" | "countdown" | "bonus";

type JSKey =
  | "smooth_scroll" | "email_validation" | "intersection" | "cta_hover"
  | "countdown_js" | "sticky_header" | "pixel" | "whatsapp";

type FormData = {
  product: string;
  niche: string;
  expert: string;
  cta: string;
  color1: string;
  colorbg: string;
  font: string;
  aesthetic: string;
  headline: string;
  subheadline: string;
  notes: string;
  sections: SectionKey[];
  jsFeatures: JSKey[];
};

// ─── Constants ────────────────────────────────────────────────────────────────

const FONTS = ["Montserrat", "Inter", "Poppins", "Raleway", "DM Sans", "Space Grotesk", "Sora"];

const AESTHETICS = [
  "Dark Premium (fundo escuro + neon/glow)",
  "Dark Minimalista (fundo escuro + branco)",
  "Light Moderno (fundo branco + cor)",
  "Gradiente (cores vibrantes)",
  "Corporativo Sério (azul/cinza)",
];

const SECTIONS: { key: SectionKey; label: string; defaultOn: boolean }[] = [
  { key: "hero",       label: "Hero com formulário",           defaultOn: true  },
  { key: "ticker",     label: "Ticker bar animado",            defaultOn: true  },
  { key: "professor",  label: "Quem é o especialista",         defaultOn: true  },
  { key: "prova",      label: "Prova social / depoimentos",    defaultOn: false },
  { key: "modulos",    label: "Módulos / conteúdo",            defaultOn: false },
  { key: "faq",        label: "FAQ",                           defaultOn: false },
  { key: "garantia",   label: "Garantia / risco zero",         defaultOn: false },
  { key: "footer_cta", label: "Footer com CTA",                defaultOn: true  },
  { key: "countdown",  label: "Contador regressivo",           defaultOn: false },
  { key: "bonus",      label: "Bônus / extras",                defaultOn: false },
];

const JS_FEATURES: { key: JSKey; label: string; defaultOn: boolean }[] = [
  { key: "smooth_scroll",    label: "Smooth scroll",                  defaultOn: true  },
  { key: "email_validation", label: "Validação de e-mail",            defaultOn: true  },
  { key: "intersection",     label: "Animação de entrada (scroll)",   defaultOn: true  },
  { key: "cta_hover",        label: "Micro-animação no botão",        defaultOn: true  },
  { key: "countdown_js",     label: "Contador regressivo",            defaultOn: false },
  { key: "sticky_header",    label: "Header fixo com scroll",         defaultOn: false },
  { key: "pixel",            label: "Integração Meta Pixel",          defaultOn: false },
  { key: "whatsapp",         label: "Botão flutuante WhatsApp",       defaultOn: false },
];

const SECTION_LABELS: Record<SectionKey, string> = {
  hero:       "Hero com formulário de captura (headline + subtítulo + input email + botão CTA)",
  ticker:     "Ticker bar com rolagem infinita horizontal (texto repetido animado)",
  professor:  "Seção \"Quem é o especialista\" com foto + bio com conquistas em destaque",
  prova:      "Prova social — depoimentos de alunos com foto, nome e resultado",
  modulos:    "Módulos / grade de conteúdo com ícones e descrições",
  faq:        "FAQ (perguntas frequentes) com accordion expansível",
  garantia:   "Bloco de garantia / risco zero com ícone de escudo",
  footer_cta: "Footer com repetição do CTA (formulário + botão)",
  countdown:  "Contador regressivo com urgência (dias, horas, minutos, segundos)",
  bonus:      "Seção de bônus com cards de benefícios extras",
};

const JS_LABELS: Record<JSKey, string> = {
  smooth_scroll:    "Smooth scroll para âncoras internas",
  email_validation: "Validação de e-mail em tempo real com feedback visual",
  intersection:     "Animação de entrada fade-in + slide-up via IntersectionObserver",
  cta_hover:        "Micro-animação no botão CTA (scale + glow no hover)",
  countdown_js:     "Contador regressivo funcional com data alvo configurável",
  sticky_header:    "Header fixo com mudança de opacidade/blur no scroll",
  pixel:            "Integração Meta Pixel (evento Lead no submit do formulário)",
  whatsapp:         "Botão flutuante do WhatsApp no canto inferior direito",
};

const defaultSections = SECTIONS.filter(s => s.defaultOn).map(s => s.key);
const defaultJS       = JS_FEATURES.filter(j => j.defaultOn).map(j => j.key);

const emptyForm: FormData = {
  product: "", niche: "", expert: "", cta: "",
  color1: "#1A6EFF", colorbg: "#0A0A12",
  font: "Montserrat", aesthetic: AESTHETICS[0],
  headline: "", subheadline: "", notes: "",
  sections: defaultSections,
  jsFeatures: defaultJS,
};

// ─── Prompt builder ───────────────────────────────────────────────────────────

function buildPrompt(f: FormData): string {
  const product    = f.product    || "[NOME DO PRODUTO]";
  const niche      = f.niche      || "[NICHO]";
  const expert     = f.expert     || "[ESPECIALISTA]";
  const cta        = f.cta        || "Fazer meu cadastro";
  const headlineTxt = f.headline  || "[a partir da imagem de referência]";
  const subTxt     = f.subheadline || "[a partir da imagem de referência]";

  return `Crie uma landing page completa em um único arquivo HTML (com CSS e JS embutidos).

## PROJETO
- Produto/Evento: ${product}
- Nicho: ${niche}
- Especialista/Marca: ${expert}
- CTA principal: "${cta}"
- Headline principal: ${headlineTxt}
- Subtítulo: ${subTxt}

## IDENTIDADE VISUAL
- Estética: ${f.aesthetic}
- Cor primária: ${f.color1}
- Cor de fundo: ${f.colorbg}
- Tipografia: "${f.font}" (Google Fonts) para headlines + "Inter" para corpo
- Variáveis CSS obrigatórias no :root:

:root {
  --color-bg: ${f.colorbg};
  --color-primary: ${f.color1};
  --color-text: #FFFFFF;
  --color-text-muted: #A0A8C0;
  --color-glow: ${f.color1}66;
  --font-heading: '${f.font}', sans-serif;
  --font-body: 'Inter', sans-serif;
  --border-radius: 10px;
  --transition: all 0.3s ease;
}

## SEÇÕES A CRIAR (nessa ordem)
${f.sections.map(s => `- ${SECTION_LABELS[s]}`).join("\n")}

## FUNCIONALIDADES JAVASCRIPT
${f.jsFeatures.map(j => `- ${JS_LABELS[j]}`).join("\n")}

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
  f.notes ? `\n\n## OBSERVAÇÕES ESPECIAIS\n${f.notes}` : ""
}

Entregue o código completo e funcional, pronto para abrir no navegador.`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Field({
  label, children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.7rem] font-semibold uppercase tracking-widest text-[#9f9b94]">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[0.88rem] text-[#e6e2d9] placeholder:text-[#6b6760] outline-none transition focus:border-[#f47b4f]/50 focus:bg-white/[0.06]";

function Chip({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-[0.78rem] transition-all select-none ${
        active
          ? "border-[#f47b4f]/60 bg-[#f47b4f]/15 text-[#ffd7c6]"
          : "border-white/10 bg-white/[0.03] text-[#9f9b94] hover:bg-white/[0.06]"
      }`}
    >
      {label}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 mt-7 border-b border-white/8 pb-2 text-[0.72rem] font-semibold uppercase tracking-widest text-[#9f9b94]">
      {children}
    </p>
  );
}

// ─── Copy button ──────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[0.78rem] font-medium transition-all ${
        copied
          ? "border-lime-400/40 bg-lime-400/10 text-lime-300"
          : "border-white/10 bg-white/[0.04] text-[#9f9b94] hover:bg-white/[0.08] hover:text-[#e6e2d9]"
      }`}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copiado!" : "Copiar tudo"}
    </button>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PromptLandingPage() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [prompt, setPrompt] = useState<string | null>(null);

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function toggleSet<T extends string>(arr: T[], key: T): T[] {
    return arr.includes(key) ? arr.filter(k => k !== key) : [...arr, key];
  }

  function handleGenerate() {
    setPrompt(buildPrompt(form));
    setTimeout(() => {
      document.getElementById("output-area")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function handleReset() {
    setForm(emptyForm);
    setPrompt(null);
  }

  const charCount = prompt?.length ?? 0;

  return (
    <main className="min-h-screen bg-[#1f1f1d] text-[#e6e2d9]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_10%_8%,rgba(244,123,79,0.12),transparent_38%),radial-gradient(circle_at_88%_0%,rgba(241,237,228,0.08),transparent_30%)]" />

      <div className="mx-auto w-full max-w-[860px] px-4 py-12 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 flex items-start gap-4">
          <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-[#f47b4f]/35 bg-[#f47b4f]/12 text-[#ffd7c6]">
            <LayoutTemplate size={18} />
          </span>
          <div>
            <h1 className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] text-[#ebe7df]">
              Gerador de Prompt — Landing Page
            </h1>
            <p className="mt-1 text-[0.85rem] text-[#9f9b94]">
              Preencha os campos e gere um prompt completo para o Gemini criar sua landing page.
            </p>
          </div>
        </div>

        {/* ── Identidade do Projeto */}
        <SectionLabel>Identidade do Projeto</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome do Produto / Evento">
            <input className={inputCls} placeholder="Ex: Desafio de Gestão de Tráfego"
              value={form.product} onChange={e => set("product", e.target.value)} />
          </Field>
          <Field label="Nicho / Segmento">
            <input className={inputCls} placeholder="Ex: Marketing Digital, Saúde, Finanças"
              value={form.niche} onChange={e => set("niche", e.target.value)} />
          </Field>
          <Field label="Nome do Especialista / Marca">
            <input className={inputCls} placeholder="Ex: Pedro Sobral, GrowS"
              value={form.expert} onChange={e => set("expert", e.target.value)} />
          </Field>
          <Field label="Oferta Principal (CTA)">
            <input className={inputCls} placeholder="Ex: Fazer meu cadastro grátis"
              value={form.cta} onChange={e => set("cta", e.target.value)} />
          </Field>
        </div>

        {/* ── Identidade Visual */}
        <SectionLabel>Identidade Visual</SectionLabel>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Cor Primária (hex)">
            <div className="flex items-center gap-2">
              <input type="color" value={form.color1}
                onChange={e => set("color1", e.target.value)}
                className="h-10 w-10 flex-shrink-0 cursor-pointer rounded-lg border border-white/10 bg-transparent p-0.5" />
              <input className={inputCls} value={form.color1}
                onChange={e => set("color1", e.target.value)} />
            </div>
          </Field>
          <Field label="Cor de Fundo (hex)">
            <div className="flex items-center gap-2">
              <input type="color" value={form.colorbg}
                onChange={e => set("colorbg", e.target.value)}
                className="h-10 w-10 flex-shrink-0 cursor-pointer rounded-lg border border-white/10 bg-transparent p-0.5" />
              <input className={inputCls} value={form.colorbg}
                onChange={e => set("colorbg", e.target.value)} />
            </div>
          </Field>
          <Field label="Fonte Principal">
            <select className={inputCls} value={form.font}
              onChange={e => set("font", e.target.value)}>
              {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </Field>
          <Field label="Estética Visual">
            <select className={inputCls} value={form.aesthetic}
              onChange={e => set("aesthetic", e.target.value)}>
              {AESTHETICS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </Field>
        </div>

        {/* ── Seções */}
        <SectionLabel>Seções da Landing Page</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {SECTIONS.map(s => (
            <Chip key={s.key} label={s.label}
              active={form.sections.includes(s.key)}
              onClick={() => set("sections", toggleSet(form.sections, s.key))} />
          ))}
        </div>

        {/* ── Funcionalidades JS */}
        <SectionLabel>Funcionalidades JS</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {JS_FEATURES.map(j => (
            <Chip key={j.key} label={j.label}
              active={form.jsFeatures.includes(j.key)}
              onClick={() => set("jsFeatures", toggleSet(form.jsFeatures, j.key))} />
          ))}
        </div>

        {/* ── Informações Adicionais */}
        <SectionLabel>Informações Adicionais</SectionLabel>
        <div className="flex flex-col gap-4">
          <Field label="Headline principal (opcional)">
            <input className={inputCls} placeholder="Ex: Gestão de Tráfego Enriquece"
              value={form.headline} onChange={e => set("headline", e.target.value)} />
          </Field>
          <Field label="Subheadline / proposta de valor (opcional)">
            <textarea className={`${inputCls} min-h-[72px] resize-y leading-relaxed`}
              placeholder="Ex: Aprenda o método de tráfego que mais gera resultados no Brasil..."
              value={form.subheadline} onChange={e => set("subheadline", e.target.value)} />
          </Field>
          <Field label="Observações especiais (tom, público, requisitos)">
            <textarea className={`${inputCls} min-h-[72px] resize-y leading-relaxed`}
              placeholder="Ex: Público-alvo são empreendedores 30–50 anos. Tom direto e confiante."
              value={form.notes} onChange={e => set("notes", e.target.value)} />
          </Field>
        </div>

        {/* ── Actions */}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={handleGenerate}
            className="rounded-xl bg-[#f47b4f] px-6 py-2.5 text-[0.9rem] font-semibold text-white transition hover:bg-[#f08060] active:scale-[0.98]"
          >
            Gerar Prompt Completo
          </button>
          <button
            onClick={handleReset}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-2.5 text-[0.9rem] text-[#9f9b94] transition hover:bg-white/[0.07] hover:text-[#e6e2d9]"
          >
            Limpar campos
          </button>
        </div>

        {/* ── Output */}
        {prompt !== null && (
          <div id="output-area" className="mt-10">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-[#9f9b94]">
                  Prompt gerado
                </span>
                <span className="rounded-full bg-lime-400/10 px-2 py-0.5 text-[0.68rem] font-semibold text-lime-300">
                  editável
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CopyButton text={prompt} />
                <button
                  onClick={() => setPrompt("")}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.78rem] text-[#9f9b94] transition hover:bg-white/[0.07]"
                >
                  Limpar
                </button>
              </div>
            </div>

            <textarea
              className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] p-4 font-mono text-[0.8rem] leading-relaxed text-[#e6e2d9] outline-none transition focus:border-white/20 focus:bg-white/[0.05]"
              style={{ minHeight: 320 }}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              spellCheck={false}
            />

            <p className="mt-1.5 text-right text-[0.72rem] text-[#6b6760]">
              {charCount.toLocaleString("pt-BR")} caracteres
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
