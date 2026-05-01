import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Layers,
  LayoutTemplate,
  Mic2,
  Play,
  Sparkles,
  Users2,
  type LucideIcon,
} from "lucide-react";
import ShopHero from "@/components/ShopHero";
import ShopBannerHero from "@/components/ShopBannerHero";
import TreinamentosCardsGrid from "@/components/TreinamentosCardsGrid";
import ShopPasswordGate from "@/components/ShopPasswordGate";
import ShopHeaderMenu from "@/components/ShopHeaderMenu";

type BonusItem = {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: LucideIcon;
  coverImage?: string;
};

const PODCAST_CARD_BG =
  "/hf_20260501_191207_cb1c7d02-f74e-4cc1-88dc-7543a7be7f49.png";
const PROMPT_PAGINA_VENDAS_CARD_BG =
  "/hf_20260501_193136_2dd9a147-18b6-41a3-b97a-8bf1f77f2385.png";
const PACK_PROMPTS_CARD_BG =
  "/hf_20260501_193648_b30036f0-627d-4404-8fb8-e2b9d91a8c23.png";
const EBOOK_CARD_BG =
  "/hf_20260314_230539_c5efb4e7-1371-4502-90d5-c2f4d6eee79e.jpeg";
const KIT_CONTEXTO_CARD_BG =
  "/hf_20260501_191725_4767c164-cd5a-4899-9460-9cc85d74cde0.png";
const PODCAST_CARD_SOON_1 =
  "/hf_20260314_214334_b0f80242-6be4-4125-9e9c-49e3f24ef1fe.jpeg";
const PODCAST_CARD_SOON_2 =
  "/hf_20260313_144236_d2f1d35b-e783-4287-8d1b-d02c1276a75e.jpeg";
const PODCAST_CARD_SOON_3 =
  "/hf_20260313_140155_9f1bc704-126c-461a-ae1a-9c42d5510c77.jpeg";
const COMMUNITY_CHECKOUT_URL =
  "https://checkout.infinitepay.io/qt-sala01-stageone/3obvvPOUZV";

const bonusItems: BonusItem[] = [
  {
    id: "prompt-pagina-de-vendas",
    title: "Prompt para Página de Vendas",
    description:
      "Gere um prompt pronto para criar sua página de vendas com IA.",
    cta: "Gerar agora",
    href: "/prompt-pagina-de-vendas?from=shop",
    icon: LayoutTemplate,
    coverImage: PROMPT_PAGINA_VENDAS_CARD_BG,
  },
  {
    id: "ebooks",
    title: "Baixar EBooks",
    description:
      "Aprenda IA aplicada ao negócio com método prático e estratégico.",
    cta: "Baixar eBooks",
    href: "https://drive.google.com/uc?export=download&id=1vTArDG5vreAP7UvDnZpnZ6DKMKuOe5Wo",
    icon: BookOpen,
    coverImage: EBOOK_CARD_BG,
  },
  {
    id: "prompts",
    title: "Pack de Prompts",
    description:
      "Prompts validados para páginas, campanhas e conteúdo com IA.",
    cta: "Abrir prompts",
    href: "/prompts?from=shop",
    icon: Sparkles,
    coverImage: PACK_PROMPTS_CARD_BG,
  },
  {
    id: "podcast",
    title: "iA SEM LIMITES",
    description:
      "Episódio exclusivo IA Sem Limites para aplicar IA com mais velocidade e consistência.",
    cta: "Ouvir episódio",
    href: "/treinamento_ia.m4a",
    icon: Mic2,
  },
  {
    id: "kit-contexto",
    title: "Kit de Contexto",
    description:
      "Contexto completo para a IA responder com precisão desde o início.",
    cta: "Acessar kit",
    href: "/kit-contexto?from=shop",
    icon: Layers,
    coverImage: KIT_CONTEXTO_CARD_BG,
  },
];



export const metadata: Metadata = {
  title: "Shop | GrowS",
  description:
    "Templates prontos para vender, bônus exclusivos do treinamento gratuito e acesso à comunidade para alunos do curso de IA.",
};

export default function ShopPage() {
  const podcastItem = bonusItems.find((item) => item.id === "podcast");
  const materialItems = bonusItems.filter((item) => item.id !== "podcast");
  const podcastShowCards = [
    {
      id: "show-live",
      title: podcastItem?.title ?? "iA SEM LIMITES",
      category: "Negócios",
      frequency: "Semanal",
      coverImage: PODCAST_CARD_BG,
      isComingSoon: false,
    },
    {
      id: "show-soon-1",
      title: "VENDAS EM FOCO",
      category: "Negócios",
      frequency: "Semanal",
      coverImage: PODCAST_CARD_SOON_1,
      coverGradient: "from-[#4c1f38] via-[#291226] to-[#180d17]",
      isComingSoon: true,
    },
    {
      id: "show-soon-2",
      title: "COPY LAB",
      category: "Marketing",
      frequency: "Semanal",
      coverImage: PODCAST_CARD_SOON_2,
      coverGradient: "from-[#14325d] via-[#15223f] to-[#0f1629]",
      isComingSoon: true,
    },
    {
      id: "show-soon-3",
      title: "OPERAÇÃO INTELIGENTE",
      category: "Produtividade",
      frequency: "Semanal",
      coverImage: PODCAST_CARD_SOON_3,
      coverGradient: "from-[#163d32] via-[#132f27] to-[#0e1d19]",
      isComingSoon: true,
    },
  ];

  return (
    <ShopPasswordGate>
    <main className="min-h-screen bg-[#1f1f1d] pb-36 text-[#e6e2d9]">
      <ShopHeaderMenu />

      {/* Botão flutuante Instagram */}
      <Link
        href="https://www.instagram.com/alexandredpaula/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram de Alexandre Dpaula"
        className="fixed bottom-28 right-6 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-black/80 hover:text-white hover:scale-105"
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
      <section
        id="podcast-episodios"
        className="mx-auto w-full max-w-285 px-5 pb-10 sm:px-6 sm:pb-16 lg:px-8"
      >
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[#6a6660]">
            Bônus Free · Material de Apoio
          </p>
          <h2 className="mt-2 font-serif text-[clamp(1.3rem,5vw,2rem)] leading-tight text-[#ebe7df]">
            Materiais: Treinamento IA Sem Limites
          </h2>
        </div>

        <div className="mt-6 space-y-9">
          <div>
            <h3 className="mb-3 text-[1.7rem] font-semibold uppercase tracking-[0.08em] text-[#9b9790]">
              Materiais
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {materialItems.map((item) => {
                const isEbook = item.id === "ebooks";
                const hasCoverImage = Boolean(item.coverImage);
                const materialOverlayClass = hasCoverImage
                  ? "bg-black/45"
                  : isEbook
                    ? "bg-black/12"
                    : "bg-black/18";
                const accentClass = isEbook
                  ? "border-lime-300 bg-lime-300 text-[#1a1a18]"
                  : "border-[#f47b4f] bg-[#f47b4f] text-[#1a1a18]";

                return (
                  <article
                    key={item.id}
                    className="group text-left"
                  >
                    <div
                      className={`relative aspect-square overflow-hidden rounded-xl border transition-colors ${
                        hasCoverImage
                          ? "border-white/12 bg-black/25"
                          : isEbook
                            ? "border-lime-300 bg-lime-300"
                            : "border-white/12 bg-[radial-gradient(circle_at_20%_18%,rgba(244,123,79,0.2),transparent_45%),linear-gradient(180deg,#1f1f1d_0%,#171716_100%)]"
                      }`}
                    >
                      {hasCoverImage ? (
                        <>
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                            style={{ backgroundImage: `url(${item.coverImage})` }}
                          />
                        </>
                      ) : null}
                      <div className={`absolute inset-0 ${materialOverlayClass}`} />

                      <div
                        className={`absolute inset-x-0 bottom-0 border-t px-3 py-3 ${
                          hasCoverImage
                            ? "border-white/15 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.72)_100%)]"
                            : isEbook
                              ? "border-black/12 bg-black/[0.08]"
                              : "border-white/10 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.42)_100%)]"
                        }`}
                      >
                        <h3 className={`text-[1.04rem] font-bold uppercase leading-tight tracking-wide ${
                          hasCoverImage ? "text-[#f8f5ef]" : isEbook ? "text-slate-900" : "text-[#e4e0d8]"
                        }`}>
                          {item.title}
                        </h3>

                        <p className={`mt-1 line-clamp-1 text-[0.79rem] leading-relaxed ${
                          hasCoverImage ? "text-[#ddd8cf]" : isEbook ? "text-slate-800" : "text-[#b4b0a8]"
                        }`}>
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-[0.8rem] font-bold transition-colors ${accentClass} hover:brightness-95`}
                    >
                      {item.cta}
                      <ArrowRight size={12} />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-[1.7rem] font-semibold uppercase tracking-[0.08em] text-[#9b9790]">
              Podcast
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {podcastShowCards.map((card) =>
                card.isComingSoon ? (
                  <Link
                    key={card.id}
                    href={COMMUNITY_CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-left"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-xl border border-white/12 bg-black/20">
                      {card.coverImage ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundImage: `url(${card.coverImage})` }}
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.coverGradient ?? "from-[#262626] to-[#111111]"}`} />
                      )}
                      <div className="absolute inset-0 bg-black/72" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/36">
                        <span className="rounded-full border border-lime-300 bg-lime-300 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.11em] text-[#1a1a18]">
                          Em breve
                        </span>
                      </div>
                      <span className="pointer-events-none absolute bottom-2.5 left-2.5 inline-flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-white/45 bg-black/45 text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                        <Play size={15} className="translate-x-[1px]" />
                      </span>
                    </div>
                    <p className="mt-2.5 truncate text-[0.94rem] font-semibold text-[#e5e5e5]">{card.title}</p>
                    <p className="text-[0.79rem] text-[#b4b4b4]">{card.category}</p>
                  </Link>
                ) : (
                  <Link
                    key={card.id}
                    href="/comunidade?view=podcast"
                    className="group text-left"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-xl border border-white/12 bg-black/20">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url(${card.coverImage})` }}
                      />
                      <span className="pointer-events-none absolute bottom-2.5 left-2.5 inline-flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-white/45 bg-black/45 text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                        <Play size={15} className="translate-x-[1px]" />
                      </span>
                    </div>
                    <p className="mt-2.5 truncate text-[0.94rem] font-semibold text-[#e5e5e5]">{card.title}</p>
                    <p className="text-[0.79rem] text-[#b4b4b4]">{card.category}</p>
                  </Link>
                ),
              )}
            </div>
          </div>
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

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-[#ededed]/96 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1820px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-1.5 text-[#121210] sm:gap-x-6 sm:gap-y-2">
            <div className="flex items-center gap-2 text-[0.86rem] sm:gap-3 sm:text-[0.95rem]">
              <CalendarDays size={17} className="text-[#1c1b18] sm:h-5 sm:w-5" />
              <div className="leading-tight">
                <p className="text-[0.78rem] font-medium text-[#3a3936] sm:text-[0.9rem]">Datas disponíveis</p>
                <p className="text-[0.92rem] font-semibold sm:text-[1.05rem]">MAIO</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[0.9rem] font-semibold sm:gap-3 sm:text-[1rem]">
              <Users2 size={17} className="text-[#1c1b18] sm:h-5 sm:w-5" />
              <span className="whitespace-nowrap">Turma reduzida</span>
            </div>
          </div>

          <Link
            href={COMMUNITY_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 min-h-11 w-[44%] min-w-[165px] items-center justify-center whitespace-nowrap bg-[#d97757] px-3 text-[0.9rem] font-medium text-[#fff2ea] transition-colors hover:bg-[#cd6f51] sm:min-h-14 sm:w-[42%] sm:min-w-[170px] sm:text-[1.35rem] lg:min-h-12 lg:w-auto lg:min-w-[210px] lg:px-4 lg:text-[1.05rem]"
          >
            Comprar ingresso
          </Link>
        </div>
      </div>
    </main>
    </ShopPasswordGate>
  );
}
