import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Gift,
  Layers,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import ShopHero from "@/components/ShopHero";
import TreinamentosCardsGrid from "@/components/TreinamentosCardsGrid";

type BonusItem = {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: LucideIcon;
};

const bonusItems: BonusItem[] = [
  {
    id: "insumos",
    title: "Meus Treinamentos",
    description:
      "Aprenda na prática — cursos diretos ao ponto para você criar, vender e crescer com IA.",
    cta: "Ver treinamentos",
    href: "/treinamentos",
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
        <div className="mb-6">
          <p className="text-[0.76rem] uppercase tracking-[0.14em] text-[#9f9b94]">
            Treinamentos · Ao vivo
          </p>
          <h2 className="mt-3 font-serif text-[clamp(1.7rem,2.5vw,2.2rem)] text-[#ebe7df]">
            Aprenda na prática e saia com o projeto pronto
          </h2>
        </div>

        <TreinamentosCardsGrid withReveal={false} />
      </section>
    </main>
  );
}
