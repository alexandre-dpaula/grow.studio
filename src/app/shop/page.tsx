import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Eye,
  Gift,
  Layers,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import ShopHero from "@/components/ShopHero";

type BonusItem = {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: LucideIcon;
};

type TemplateItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  previewUrl: string;
  category: string;
};

const bonusItems: BonusItem[] = [
  {
    id: "insumos",
    title: "Insumos do Treinamento",
    description:
      "Checklist, roteiros de execução e materiais de apoio para acelerar suas entregas.",
    cta: "Ver insumos",
    href: "/comunidade?view=treinamentos",
    icon: Gift,
  },
  {
    id: "ebooks",
    title: "EBooks Estratégicos",
    description:
      "Guias práticos de oferta, copy e posicionamento para transformar serviço em produto.",
    cta: "Ler eBooks",
    href: "/comunidade?view=treinamentos",
    icon: BookOpen,
  },
  {
    id: "prompts",
    title: "Pack de Prompts",
    description:
      "Prompts prontos para criação de páginas, campanhas e estrutura de conteúdo com IA.",
    cta: "Abrir prompts",
    href: "/prompts",
    icon: Sparkles,
  },
  {
    id: "kit-contexto",
    title: "Kit de Contexto",
    description:
      "Preencha uma vez e nunca mais explique seu negócio para a IA. Cole no ChatGPT e comece a trabalhar.",
    cta: "Acessar kit",
    href: "/kit-contexto",
    icon: Layers,
  },
];

const templates: TemplateItem[] = [
  {
    id: "crie-paginas",
    title: "Template 01 - Página de Vendas",
    description:
      "Estrutura completa com headline, prova social, promessa e CTA para conversão.",
    href: "/treinamentos/crie-paginas",
    previewUrl: "/treinamentos/crie-paginas",
    category: "Landing Page",
  },
  {
    id: "proprio-comercial",
    title: "Template 02 - Comercial em Oferta",
    description:
      "Template orientado para captação de leads e apresentação de oferta presencial.",
    href: "/treinamentos/proprio-comercial",
    previewUrl: "/treinamentos/proprio-comercial",
    category: "Captação",
  },
  {
    id: "ensaios-fotograficos",
    title: "Template 03 - Showcase Criativo",
    description:
      "Página para apresentar ensaio, portfólio e proposta comercial com visual premium.",
    href: "/treinamentos/ensaios-fotograficos",
    previewUrl: "/treinamentos/ensaios-fotograficos",
    category: "Portfólio",
  },
];


export const metadata: Metadata = {
  title: "Shop | GrowS",
  description:
    "Templates prontos para vender, bônus exclusivos do treinamento gratuito e acesso à comunidade para alunos do curso de IA.",
};

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#1f1f1d] text-[#e6e2d9]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_10%_8%,rgba(244,123,79,0.16),transparent_38%),radial-gradient(circle_at_88%_0%,rgba(241,237,228,0.13),transparent_30%),linear-gradient(180deg,#1f1f1d_0%,#181816_100%)]" />

      <ShopHero />

      <section className="mx-auto w-full max-w-[1140px] px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.76rem] uppercase tracking-[0.14em] text-[#9f9b94]">
              Bônus Free · Material de Apoio
            </p>
            <h2 className="mt-3 font-serif text-[clamp(1.7rem,2.5vw,2.2rem)] text-[#ebe7df]">
              Materiais: Treinamento — IA Sem Limites
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {bonusItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.id}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.05]"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#f47b4f]/35 bg-[#f47b4f]/12 text-[#ffd7c6]">
                  <Icon size={16} />
                </span>

                <h3 className="mt-4 text-[0.92rem] font-bold uppercase tracking-wide text-[#e4e0d8]">{item.title}</h3>
                <p className="mt-2 flex-1 text-[0.82rem] leading-relaxed text-[#a9a59d]">
                  {item.description}
                </p>

                <Link
                  href={item.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-[#f7d1be] transition-colors hover:text-[#ffe4d7]"
                >
                  {item.cta}
                  <ArrowRight size={13} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="templates-html"
        className="mx-auto w-full max-w-[1140px] px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.76rem] uppercase tracking-[0.14em] text-[#9f9b94]">
              Templates HTML · À venda
            </p>
            <h2 className="mt-3 font-serif text-[clamp(1.7rem,2.5vw,2.2rem)] text-[#ebe7df]">
              Projetos prontos para usar com seus clientes
            </h2>
          </div>
          <span className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-[0.75rem] uppercase tracking-[0.09em] text-[#b4b0a8]">
            Preview + CTA
          </span>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <article
              key={template.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#191917]"
            >
              <div className="relative aspect-video overflow-hidden border-b border-white/8 bg-[#121210]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(244,123,79,0.08),rgba(255,255,255,0.03))]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="space-y-2 text-center opacity-20">
                    {[80, 60, 70, 50].map((w, i) => (
                      <div key={i} className="mx-auto h-2 rounded-full bg-white" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                </div>
                <span className="absolute left-3 top-3 rounded-full border border-white/14 bg-black/45 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.1em] text-[#d9d5ce]">
                  {template.category}
                </span>
                <Link
                  href={template.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg border border-lime-300/50 bg-lime-300 px-3 py-1.5 text-[0.72rem] font-semibold text-slate-950 opacity-100 transition-all hover:bg-lime-200 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                >
                  <Eye size={13} />
                  Preview
                </Link>
              </div>

              <div className="p-4">
                <h3 className="text-[0.95rem] font-medium text-[#e3dfd7]">
                  {template.title}
                </h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-[#a7a39c]">
                  {template.description}
                </p>

                <Link
                  href={template.href}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#f47b4f]/60 bg-[#f47b4f] px-3 py-2.5 text-[0.8rem] font-semibold text-[#1f1f1d] transition-colors hover:bg-[#f69069]"
                >
                  Adquirir template
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
