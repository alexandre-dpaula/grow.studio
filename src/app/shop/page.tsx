import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Layers,
  LayoutTemplate,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import ShopHero from "@/components/ShopHero";
import ShopBannerHero from "@/components/ShopBannerHero";
import TreinamentosCardsGrid from "@/components/TreinamentosCardsGrid";
import ShopPasswordGate from "@/components/ShopPasswordGate";

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
    id: "prompt-pagina-de-vendas",
    title: "Prompt para Página de Vendas",
    description:
      "Preencha os campos e gere um prompt completo para o Gemini criar sua página de vendas do zero.",
    cta: "Gerar agora",
    href: "/prompt-pagina-de-vendas",
    icon: LayoutTemplate,
  },
  {
    id: "ebooks",
    title: "Baixar EBooks",
    description:
      "Esse Treinamento ensina a utilizarem a Inteligência Artificial de forma estratégica, abandonando o uso superficial e genérico.",
    cta: "Baixar eBooks",
    href: "https://drive.google.com/uc?export=download&id=1vTArDG5vreAP7UvDnZpnZ6DKMKuOe5Wo",
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
    <ShopPasswordGate>
    <main className="min-h-screen bg-[#1f1f1d] text-[#e6e2d9]">
      {/* Botão flutuante Instagram */}
      <Link
        href="https://www.instagram.com/alexandredpaula/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram de Alexandre Dpaula"
        className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-black/80 hover:text-white hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      </Link>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_10%_8%,rgba(244,123,79,0.16),transparent_38%),radial-gradient(circle_at_88%_0%,rgba(241,237,228,0.13),transparent_30%),linear-gradient(180deg,#1f1f1d_0%,#181816_100%)]" />

      <ShopBannerHero />

      <ShopHero />

      {/* ── Bônus ── */}
      <section className="mx-auto w-full max-w-285 px-5 pb-10 sm:px-6 sm:pb-16 lg:px-8">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[#6a6660]">
            Bônus Free · Material de Apoio
          </p>
          <h2 className="mt-2 font-serif text-[clamp(1.3rem,5vw,2rem)] leading-tight text-[#ebe7df]">
            Materiais: Treinamento IA Sem Limites
          </h2>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
          {bonusItems.map((item) => {
            const Icon = item.icon;
            const isEbook = item.id === "ebooks";
            return (
              <article
                key={item.id}
                className={`flex flex-col rounded-2xl p-4 transition-colors sm:p-5 ${
                  isEbook
                    ? "border-2 border-lime-300 bg-lime-300 hover:bg-lime-200"
                    : "border border-white/10 bg-white/3 hover:bg-white/5"
                }`}
              >
                <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                  isEbook
                    ? "border border-black/15 bg-black/10 text-slate-900"
                    : "border border-[#f47b4f]/35 bg-[#f47b4f]/12 text-[#ffd7c6]"
                }`}>
                  <Icon size={15} />
                </span>
                <h3 className={`mt-3 text-[0.82rem] font-bold uppercase leading-tight tracking-wide sm:text-[0.88rem] ${isEbook ? "text-slate-900" : "text-[#e4e0d8]"}`}>
                  {item.title}
                </h3>
                <p className={`mt-2 flex-1 text-[0.78rem] leading-relaxed sm:text-[0.82rem] ${isEbook ? "text-slate-800" : "text-[#a9a59d]"}`}>
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`mt-4 inline-flex items-center gap-1.5 text-[0.78rem] font-bold transition-colors ${
                    isEbook
                      ? "text-slate-900 hover:text-slate-700"
                      : "text-[#f7d1be] hover:text-[#ffe4d7]"
                  }`}
                >
                  {item.cta}
                  <ArrowRight size={12} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Treinamentos ── */}
      <section
        id="templates-html"
        className="mx-auto w-full max-w-285 px-5 pb-16 sm:px-6 sm:pb-24 lg:px-8"
      >
        <div className="mb-6">
          <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[#6a6660]">
            Treinamentos · Presencial
          </p>
          <h2 className="mt-2 font-serif text-[clamp(1.4rem,4vw,2rem)] text-[#ebe7df]">
            Aprenda na prática e saia com o projeto pronto
          </h2>
        </div>
        <TreinamentosCardsGrid withReveal={false} />
      </section>
    </main>
    </ShopPasswordGate>
  );
}
