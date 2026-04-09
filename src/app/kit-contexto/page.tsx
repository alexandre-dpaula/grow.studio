"use client";

import { useState } from "react";
import { BadgeCheck, Check, Copy, ChevronRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type StepId = "empresa" | "cliente" | "tom" | "produtos" | "digital" | "objetivos";

type FormData = {
  // Empresa
  nomeNegocio: string;
  oQueFaco: string;
  tempoMercado: string;
  ondeAtendo: string;
  diferencial: string;
  diferencialUnico: string;
  // Cliente
  perfilCliente: string;
  dorCliente: string;
  sonhoCliente: string;
  ondePassaTempo: string;
  oQueValoriza: string;
  objections: string;
  // Tom
  tomCheckboxes: string[];
  tomOutro: string;
  palavrasUsadas: string;
  palavrasNunca: string;
  referencias: string;
  // Produtos
  prod1Nome: string; prod1Desc: string; prod1Preco: string;
  prod2Nome: string; prod2Desc: string; prod2Preco: string;
  prod3Nome: string; prod3Desc: string; prod3Preco: string;
  prod4Nome: string; prod4Desc: string; prod4Preco: string;
  carroChefe: string;
  // Digital
  redes: string[];
  instagram: string; facebook: string; site: string; tiktok: string; youtube: string;
  postsSemanais: string;
  conteudoFunciona: string;
  conteudoNaoFunciona: string;
  // Objetivos
  obj30: string;
  obj90: string;
  desafio: string;
  consumeTempo: string;
};

const emptyForm: FormData = {
  nomeNegocio: "", oQueFaco: "", tempoMercado: "", ondeAtendo: "", diferencial: "", diferencialUnico: "",
  perfilCliente: "", dorCliente: "", sonhoCliente: "", ondePassaTempo: "", oQueValoriza: "", objections: "",
  tomCheckboxes: [], tomOutro: "", palavrasUsadas: "", palavrasNunca: "", referencias: "",
  prod1Nome: "", prod1Desc: "", prod1Preco: "",
  prod2Nome: "", prod2Desc: "", prod2Preco: "",
  prod3Nome: "", prod3Desc: "", prod3Preco: "",
  prod4Nome: "", prod4Desc: "", prod4Preco: "",
  carroChefe: "",
  redes: [], instagram: "", facebook: "", site: "", tiktok: "", youtube: "",
  postsSemanais: "", conteudoFunciona: "", conteudoNaoFunciona: "",
  obj30: "", obj90: "", desafio: "", consumeTempo: "",
};

const TOM_OPTIONS = [
  "Próximo e descontraído, como conversa com amigo",
  "Profissional mas acessível",
  "Formal e técnico",
  "Bem-humorado e leve",
  "Empático e acolhedor",
  "Direto e objetivo",
];

const STEPS: { id: StepId; number: string; title: string }[] = [
  { id: "empresa",   number: "01", title: "MINHA EMPRESA" },
  { id: "cliente",   number: "02", title: "MEU CLIENTE IDEAL" },
  { id: "tom",       number: "03", title: "TOM DE VOZ" },
  { id: "produtos",  number: "04", title: "PRODUTOS E SERVIÇOS" },
  { id: "digital",   number: "05", title: "PRESENÇA DIGITAL" },
  { id: "objetivos", number: "06", title: "OBJETIVOS ATUAIS" },
];

// ─── Preview builder ──────────────────────────────────────────────────────────

function buildPreview(f: FormData): string {
  const lines: string[] = [];

  // Empresa
  const empresaLines: string[] = [];
  if (f.nomeNegocio)      empresaLines.push(f.nomeNegocio + ".");
  if (f.oQueFaco)         empresaLines.push(f.oQueFaco);
  if (f.tempoMercado)     empresaLines.push(`Estou no mercado há ${f.tempoMercado}.`);
  if (f.ondeAtendo)       empresaLines.push(`Atendo em ${f.ondeAtendo}.`);
  if (f.diferencial)      empresaLines.push(`Meu diferencial: ${f.diferencial}`);
  if (f.diferencialUnico) empresaLines.push(f.diferencialUnico);
  if (empresaLines.length) lines.push("MINHA EMPRESA:\n" + empresaLines.join(" "));

  // Cliente
  const clienteLines: string[] = [];
  if (f.perfilCliente) clienteLines.push(f.perfilCliente);
  if (f.dorCliente)    clienteLines.push(`Maior dor: ${f.dorCliente}`);
  if (f.sonhoCliente)  clienteLines.push(`O que busca: ${f.sonhoCliente}`);
  if (f.ondePassaTempo) clienteLines.push(`Onde está: ${f.ondePassaTempo}`);
  if (f.oQueValoriza)  clienteLines.push(`Valoriza: ${f.oQueValoriza}`);
  if (f.objections)    clienteLines.push(`Objeções: ${f.objections}`);
  if (clienteLines.length) lines.push("MEU CLIENTE IDEAL:\n" + clienteLines.join(" "));

  // Tom
  const tomLines: string[] = [];
  const toms = [...f.tomCheckboxes, ...(f.tomOutro ? [f.tomOutro] : [])];
  if (toms.length)         tomLines.push(`Tom: ${toms.join(", ")}.`);
  if (f.palavrasUsadas)    tomLines.push(`Palavras que uso: ${f.palavrasUsadas}`);
  if (f.palavrasNunca)     tomLines.push(`Nunca uso: ${f.palavrasNunca}`);
  if (f.referencias)       tomLines.push(`Referências: ${f.referencias}`);
  if (tomLines.length) lines.push("COMO ME COMUNICO:\n" + tomLines.join(" "));

  // Produtos
  const prodLines: string[] = [];
  const prods = [
    { nome: f.prod1Nome, desc: f.prod1Desc, preco: f.prod1Preco },
    { nome: f.prod2Nome, desc: f.prod2Desc, preco: f.prod2Preco },
    { nome: f.prod3Nome, desc: f.prod3Desc, preco: f.prod3Preco },
    { nome: f.prod4Nome, desc: f.prod4Desc, preco: f.prod4Preco },
  ].filter(p => p.nome);
  prods.forEach(p => {
    let s = p.nome;
    if (p.desc)  s += ` — ${p.desc}`;
    if (p.preco) s += ` (${p.preco})`;
    prodLines.push(s);
  });
  if (f.carroChefe) prodLines.push(`Carro-chefe: ${f.carroChefe}`);
  if (prodLines.length) lines.push("MEUS PRINCIPAIS PRODUTOS/SERVIÇOS:\n" + prodLines.join(". "));

  // Digital
  const digLines: string[] = [];
  const redesAtivas = [...f.redes];
  if (f.instagram && redesAtivas.includes("Instagram")) {
    const idx = redesAtivas.indexOf("Instagram");
    redesAtivas[idx] = `Instagram @${f.instagram}`;
  }
  if (redesAtivas.length)         digLines.push(`Presença: ${redesAtivas.join(", ")}.`);
  if (f.postsSemanais)            digLines.push(`${f.postsSemanais} posts por semana.`);
  if (f.conteudoFunciona)         digLines.push(`Funciona: ${f.conteudoFunciona}`);
  if (f.conteudoNaoFunciona)      digLines.push(`Não funciona: ${f.conteudoNaoFunciona}`);
  if (digLines.length) lines.push("REDES SOCIAIS:\n" + digLines.join(" "));

  // Objetivos
  const objLines: string[] = [];
  if (f.obj30)        objLines.push(`30 dias: ${f.obj30}`);
  if (f.obj90)        objLines.push(`90 dias: ${f.obj90}`);
  if (f.desafio)      objLines.push(`Desafio atual: ${f.desafio}`);
  if (f.consumeTempo) objLines.push(`Consome mais tempo: ${f.consumeTempo}`);
  if (objLines.length) lines.push("MEUS OBJETIVOS AGORA:\n" + objLines.join(" "));

  return lines.join("\n\n");
}

function isStepDone(id: StepId, f: FormData): boolean {
  switch (id) {
    case "empresa":   return !!f.nomeNegocio && !!f.oQueFaco;
    case "cliente":   return !!f.perfilCliente && !!f.dorCliente;
    case "tom":       return f.tomCheckboxes.length > 0 || !!f.tomOutro;
    case "produtos":  return !!f.prod1Nome;
    case "digital":   return f.redes.length > 0;
    case "objetivos": return !!f.obj30;
  }
}

// ─── Field components ─────────────────────────────────────────────────────────

function Field({ label, value, onChange, rows = 1, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#9f9b94]">
        {label}
      </label>
      {rows === 1 ? (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[0.85rem] text-[#e4e0d8] placeholder-[#5a5753] outline-none transition-colors focus:border-[#f47b4f]/50 focus:bg-white/[0.06]"
        />
      ) : (
        <textarea
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[0.85rem] text-[#e4e0d8] placeholder-[#5a5753] outline-none transition-colors focus:border-[#f47b4f]/50 focus:bg-white/[0.06]"
        />
      )}
    </div>
  );
}

// ─── Step panels ──────────────────────────────────────────────────────────────

function StepEmpresa({ f, set }: { f: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Nome do negócio" value={f.nomeNegocio} onChange={v => set("nomeNegocio", v)} placeholder="Ex: Bella Confeitaria" />
      <Field label="O que faço (em 2 frases simples)" value={f.oQueFaco} onChange={v => set("oQueFaco", v)} rows={3} placeholder="Como você explicaria a um amigo..." />
      <Field label="Há quanto tempo estou no mercado" value={f.tempoMercado} onChange={v => set("tempoMercado", v)} placeholder="Ex: 4 anos" />
      <Field label="Onde atendo" value={f.ondeAtendo} onChange={v => set("ondeAtendo", v)} placeholder="Cidade / bairro / online / todo o Brasil" />
      <Field label="Meu principal diferencial" value={f.diferencial} onChange={v => set("diferencial", v)} rows={2} placeholder="O que me separa da concorrência..." />
      <Field label="O que faço que nenhum concorrente faz igual" value={f.diferencialUnico} onChange={v => set("diferencialUnico", v)} rows={2} />
    </div>
  );
}

function StepCliente({ f, set }: { f: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-4">
      <Field label="Quem é meu cliente principal" value={f.perfilCliente} onChange={v => set("perfilCliente", v)} rows={2} placeholder="Sexo, faixa etária, renda, estilo de vida..." />
      <Field label="O maior problema / dor que ele tem — e que eu resolvo" value={f.dorCliente} onChange={v => set("dorCliente", v)} rows={2} />
      <Field label="O que ele sonha alcançar / resultado que quer ter" value={f.sonhoCliente} onChange={v => set("sonhoCliente", v)} rows={2} />
      <Field label="Onde ele passa mais tempo" value={f.ondePassaTempo} onChange={v => set("ondePassaTempo", v)} placeholder="Instagram / WhatsApp / presencial / outro" />
      <Field label="O que ele valoriza na hora de escolher" value={f.oQueValoriza} onChange={v => set("oQueValoriza", v)} rows={2} />
      <Field label="O que o faz desistir de comprar (objeções)" value={f.objections} onChange={v => set("objections", v)} rows={2} />
    </div>
  );
}

function StepTom({ f, set, toggle }: {
  f: FormData;
  set: (k: keyof FormData, v: string) => void;
  toggle: (k: "tomCheckboxes" | "redes", v: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#9f9b94]">
          Como me comunico com meus clientes
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {TOM_OPTIONS.map(opt => {
            const active = f.tomCheckboxes.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggle("tomCheckboxes", opt)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[0.82rem] transition-colors ${
                  active
                    ? "border-[#f47b4f]/50 bg-[#f47b4f]/10 text-[#ffd8c7]"
                    : "border-white/10 bg-white/[0.03] text-[#b8b4ac] hover:border-white/20"
                }`}
              >
                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${active ? "border-[#f47b4f]/60 bg-[#f47b4f]/20" : "border-white/20 bg-white/[0.04]"}`}>
                  {active && <Check size={10} className="text-[#ffd8c7]" />}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
        <input
          type="text"
          value={f.tomOutro}
          placeholder="Outro (escreva aqui)..."
          onChange={e => set("tomOutro", e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[0.85rem] text-[#e4e0d8] placeholder-[#5a5753] outline-none focus:border-[#f47b4f]/50"
        />
      </div>
      <Field label="Palavras ou expressões que uso naturalmente" value={f.palavrasUsadas} onChange={v => set("palavrasUsadas", v)} rows={2} />
      <Field label="Palavras que NUNCA uso" value={f.palavrasNunca} onChange={v => set("palavrasNunca", v)} rows={2} />
      <Field label="3 marcas ou criadores que têm o tom que eu gostaria" value={f.referencias} onChange={v => set("referencias", v)} rows={3} placeholder={"1.\n2.\n3."} />
    </div>
  );
}

function StepProdutos({ f, set }: { f: FormData; set: (k: keyof FormData, v: string) => void }) {
  const prods: { num: string; nome: keyof FormData; desc: keyof FormData; preco: keyof FormData; optional?: boolean }[] = [
    { num: "1", nome: "prod1Nome", desc: "prod1Desc", preco: "prod1Preco" },
    { num: "2", nome: "prod2Nome", desc: "prod2Desc", preco: "prod2Preco" },
    { num: "3", nome: "prod3Nome", desc: "prod3Desc", preco: "prod3Preco" },
    { num: "4", nome: "prod4Nome", desc: "prod4Desc", preco: "prod4Preco", optional: true },
  ];
  return (
    <div className="space-y-5">
      {prods.map(p => (
        <div key={p.num} className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
          <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#9f9b94]">
            Produto / Serviço {p.num}{p.optional ? " (opcional)" : ""}
          </p>
          <div className="space-y-3">
            <Field label="Nome" value={f[p.nome] as string} onChange={v => set(p.nome, v)} />
            <Field label="O que é" value={f[p.desc] as string} onChange={v => set(p.desc, v)} />
            <Field label="Preço médio" value={f[p.preco] as string} onChange={v => set(p.preco, v)} placeholder="Ex: R$280–R$800" />
          </div>
        </div>
      ))}
      <Field label="Meu produto/serviço carro-chefe (o que mais vendo)" value={f.carroChefe} onChange={v => set("carroChefe", v)} />
    </div>
  );
}

const SOCIAL_OPTIONS = ["Instagram", "Facebook", "WhatsApp Business", "Site / E-commerce", "TikTok", "YouTube"];

function StepDigital({ f, set, toggle }: {
  f: FormData;
  set: (k: keyof FormData, v: string) => void;
  toggle: (k: "tomCheckboxes" | "redes", v: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#9f9b94]">
          Onde tenho presença ativa
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {SOCIAL_OPTIONS.map(opt => {
            const active = f.redes.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggle("redes", opt)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[0.82rem] transition-colors ${
                  active
                    ? "border-[#f47b4f]/50 bg-[#f47b4f]/10 text-[#ffd8c7]"
                    : "border-white/10 bg-white/[0.03] text-[#b8b4ac] hover:border-white/20"
                }`}
              >
                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${active ? "border-[#f47b4f]/60 bg-[#f47b4f]/20" : "border-white/20 bg-white/[0.04]"}`}>
                  {active && <Check size={10} className="text-[#ffd8c7]" />}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
        {f.redes.includes("Instagram") && (
          <input type="text" value={f.instagram} placeholder="@usuario" onChange={e => set("instagram", e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[0.85rem] text-[#e4e0d8] placeholder-[#5a5753] outline-none focus:border-[#f47b4f]/50" />
        )}
      </div>
      <Field label="Quantos posts por semana consigo publicar" value={f.postsSemanais} onChange={v => set("postsSemanais", v)} placeholder="Ex: 3–4" />
      <Field label="Tipo de conteúdo que mais funciona para mim" value={f.conteudoFunciona} onChange={v => set("conteudoFunciona", v)} rows={2} />
      <Field label="O que nunca funciona com meu público" value={f.conteudoNaoFunciona} onChange={v => set("conteudoNaoFunciona", v)} rows={2} />
    </div>
  );
}

function StepObjetivos({ f, set }: { f: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-4">
      <Field label="O que quero alcançar nos próximos 30 dias" value={f.obj30} onChange={v => set("obj30", v)} rows={2} />
      <Field label="O que quero alcançar nos próximos 90 dias" value={f.obj90} onChange={v => set("obj90", v)} rows={2} />
      <Field label="Principal desafio do meu negócio agora" value={f.desafio} onChange={v => set("desafio", v)} rows={2} />
      <Field label="O que mais me consome tempo hoje" value={f.consumeTempo} onChange={v => set("consumeTempo", v)} rows={2} placeholder="Que eu gostaria de resolver..." />
    </div>
  );
}

// ─── Copy Button ──────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const empty = !text.trim();
  return (
    <button
      onClick={() => {
        if (empty) return;
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
      disabled={empty}
      className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-[0.85rem] font-bold uppercase tracking-wide transition-all ${
        empty
          ? "cursor-not-allowed border border-white/8 bg-white/[0.03] text-[#5a5753]"
          : copied
          ? "border border-lime-400/40 bg-lime-400/10 text-lime-300"
          : "border border-[#f47b4f]/60 bg-[#f47b4f] text-[#1f1f1d] hover:bg-[#f69069]"
      }`}
    >
      {copied ? <Check size={15} /> : <Copy size={15} />}
      {empty ? "Preencha os campos para copiar" : copied ? "Copiado!" : "Copiar Kit Completo"}
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KitContextoPage() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [activeStep, setActiveStep] = useState<StepId>("empresa");

  function set(k: keyof FormData, v: string) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  function toggle(k: "tomCheckboxes" | "redes", v: string) {
    setForm(prev => {
      const arr = prev[k] as string[];
      return {
        ...prev,
        [k]: arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v],
      };
    });
  }

  const preview = buildPreview(form);

  return (
    <main className="min-h-screen bg-[#1f1f1d] text-[#e6e2d9]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_10%_8%,rgba(244,123,79,0.16),transparent_38%),radial-gradient(circle_at_88%_0%,rgba(241,237,228,0.13),transparent_30%),linear-gradient(180deg,#1f1f1d_0%,#181816_100%)]" />

      {/* Hero */}
      <section className="mx-auto w-full max-w-[1140px] px-4 pb-8 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
        <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_30px_120px_-75px_rgba(0,0,0,0.95)] sm:p-8 lg:p-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#f47b4f]/45 bg-[#f47b4f]/16 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#ffd8c7]">
            <BadgeCheck size={14} />
            Grow+Studio
          </span>

          <h1 className="mt-5 font-serif text-[clamp(2rem,4vw,3.2rem)] font-bold uppercase leading-[0.95] text-[#f3efe7]">
            Kit de Contexto
          </h1>
          <p className="mt-2 text-[1rem] font-bold uppercase tracking-wide text-[#f4c7a9]">
            IA para Empreendedores — Nível 1
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.13em] text-[#9f9b94]">O que é isso?</p>
              <p className="mt-2 text-[0.87rem] leading-relaxed text-[#c2beb7]">
                O texto que você copia e cola no início de qualquer conversa com a IA.
                Nunca mais explica quem você é toda vez.
              </p>
              <p className="mt-2 text-[0.87rem] font-semibold text-[#e4e0d8]">
                Leva menos de 10 minutos. Vai usar toda semana.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.13em] text-[#9f9b94]">Como usar</p>
              <p className="mt-2 text-[0.87rem] leading-relaxed text-[#c2beb7]">
                Cole o Kit completo no início da conversa e diga:
              </p>
              <p className="mt-3 rounded-xl border border-[#f47b4f]/30 bg-[#f47b4f]/8 px-4 py-3 font-mono text-[0.8rem] italic text-[#ffd8c7]">
                &ldquo;Leia e confirme que entendeu meu negócio antes de começar.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main: Steps + Preview */}
      <section className="mx-auto w-full max-w-[1140px] px-4 pb-20 sm:px-6 lg:px-8">

        {/* ── Stepper horizontal ── */}
        <nav className="mb-6 overflow-x-auto">
          <div className="flex min-w-max items-center">
            {STEPS.map((step, idx) => {
              const done = isStepDone(step.id, form);
              const active = activeStep === step.id;
              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setActiveStep(step.id)}
                    className="group flex flex-col items-center gap-1.5 px-1"
                  >
                    {/* Circle */}
                    <span className={`flex h-9 w-9 items-center justify-center rounded-full border-2 font-mono text-[0.7rem] font-bold transition-all ${
                      done
                        ? "border-lime-400/60 bg-lime-400/15 text-lime-300"
                        : active
                        ? "border-[#f47b4f] bg-[#f47b4f]/20 text-[#ffd8c7]"
                        : "border-white/15 bg-white/[0.03] text-[#5a5753] group-hover:border-white/25 group-hover:text-[#a9a59d]"
                    }`}>
                      {done ? <Check size={13} /> : step.number}
                    </span>
                    {/* Label */}
                    <span className={`text-[0.65rem] font-bold uppercase tracking-[0.1em] whitespace-nowrap transition-colors ${
                      active ? "text-[#ffd8c7]" : done ? "text-[#86827b]" : "text-[#4a4744] group-hover:text-[#86827b]"
                    }`}>
                      {step.title}
                    </span>
                  </button>

                  {/* Connector line */}
                  {idx < STEPS.length - 1 && (
                    <div className={`mx-1 mb-5 h-px w-10 shrink-0 transition-colors sm:w-14 ${
                      isStepDone(step.id, form) ? "bg-lime-400/30" : "bg-white/[0.08]"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

          {/* LEFT — Active form */}
          <div className="w-full lg:w-[480px] lg:shrink-0">
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <div className="mb-5 flex items-center gap-3">
                <span className={`flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[0.68rem] font-bold ${
                  isStepDone(activeStep, form)
                    ? "border-lime-400/50 bg-lime-400/15 text-lime-300"
                    : "border-[#f47b4f]/40 bg-[#f47b4f]/12 text-[#ffd8c7]"
                }`}>
                  {isStepDone(activeStep, form) ? <Check size={11} /> : STEPS.find(s => s.id === activeStep)?.number}
                </span>
                <h2 className="text-[0.95rem] font-bold uppercase tracking-wide text-[#e4e0d8]">
                  {STEPS.find(s => s.id === activeStep)?.title}
                </h2>
              </div>

              {activeStep === "empresa"   && <StepEmpresa   f={form} set={set} />}
              {activeStep === "cliente"   && <StepCliente   f={form} set={set} />}
              {activeStep === "tom"       && <StepTom       f={form} set={set} toggle={toggle} />}
              {activeStep === "produtos"  && <StepProdutos  f={form} set={set} />}
              {activeStep === "digital"   && <StepDigital   f={form} set={set} toggle={toggle} />}
              {activeStep === "objetivos" && <StepObjetivos f={form} set={set} />}

              {/* Prev / Next */}
              <div className={`mt-6 grid gap-2 ${activeStep !== "empresa" ? "grid-cols-2" : "grid-cols-1"}`}>
                {activeStep !== "empresa" && (
                  <button
                    onClick={() => {
                      const idx = STEPS.findIndex(s => s.id === activeStep);
                      if (idx > 0) setActiveStep(STEPS[idx - 1].id);
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[0.8rem] font-bold uppercase tracking-wide text-[#7a7672] transition-colors hover:border-white/18 hover:text-[#c2beb7]"
                  >
                    <ChevronRight size={13} className="rotate-180" />
                    Anterior
                  </button>
                )}
                {activeStep !== "objetivos" && (
                  <button
                    onClick={() => {
                      const idx = STEPS.findIndex(s => s.id === activeStep);
                      if (idx < STEPS.length - 1) setActiveStep(STEPS[idx + 1].id);
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-[0.8rem] font-bold uppercase tracking-wide text-[#c2beb7] transition-colors hover:border-white/20 hover:text-[#e6e2d9]"
                  >
                    Próxima etapa
                    <ChevronRight size={13} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT — Preview */}
          <div className="flex-1">
            <div className="sticky top-4 flex flex-col gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/8 bg-white/[0.02] px-5 py-3.5">
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#9f9b94]">
                    Preview do Kit
                  </p>
                  <span className={`rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide transition-colors ${
                    preview.trim()
                      ? "border border-lime-400/30 bg-lime-400/10 text-lime-400"
                      : "border border-white/10 bg-white/[0.03] text-[#5a5753]"
                  }`}>
                    {preview.trim() ? "Preenchendo..." : "Aguardando"}
                  </span>
                </div>

                <div className="min-h-[320px] max-h-[520px] overflow-y-auto p-5">
                  {preview.trim() ? (
                    <pre className="whitespace-pre-wrap font-mono text-[0.78rem] leading-relaxed text-[#b8b4ac]">
                      {preview}
                    </pre>
                  ) : (
                    <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-2 text-center">
                      <p className="text-[0.85rem] font-bold uppercase tracking-wide text-[#4a4744]">
                        Seu kit aparece aqui
                      </p>
                      <p className="text-[0.78rem] text-[#3a3835]">
                        Preencha os campos ao lado
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Copy */}
              <CopyButton text={preview} />

              {/* Progress */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#7a7672]">
                  Progresso
                </p>
                <div className="flex gap-1.5">
                  {STEPS.map(step => (
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
                  {STEPS.filter(s => isStepDone(s.id, form)).length} de {STEPS.length} etapas concluídas
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
