import type { Metadata } from "next";
import Link from "next/link";
import {
  AppWindow,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Boxes,
  ChevronDown,
  Download,
  Eye,
  GraduationCap,
  Layers,
  LayoutTemplate,
  Menu,
  MessageSquare,
  Mic2,
  Moon,
  Plus,
  Sparkles,
  Sun,
} from "lucide-react";
import CommunityAgentChat from "@/components/CommunityAgentChat";
import ClaudeSkillsGrid from "@/components/ClaudeSkillsGrid";
import CommunityConversationsList from "@/components/CommunityConversationsList";
import CommunityRecentsList from "@/components/CommunityRecentsList";
import CommunityUserProfile from "@/components/CommunityUserProfile";
import CommunityPodcastCards from "@/components/CommunityPodcastCards";
import PromptCardsGrid from "@/components/PromptCardsGrid";
import TreinamentosCardsGrid from "@/components/TreinamentosCardsGrid";
import { COMMUNITY_PROMPTS } from "@/data/community-prompts";

type PageProps = {
  searchParams: Promise<{
    view?: string;
    id?: string;
    lang?: string;
    theme?: string;
  }>;
};

type ThemeMode = "dark" | "light";

function withCommunityTheme(href: string, theme: ThemeMode) {
  if (href.startsWith("http")) {
    return href;
  }

  const [pathAndQuery, hashFragment] = href.split("#");
  const [pathname, queryString] = pathAndQuery.split("?");
  const params = new URLSearchParams(queryString ?? "");

  if (theme === "light") {
    params.set("theme", "light");
  } else {
    params.delete("theme");
  }

  const nextQueryString = params.toString();
  const hash = hashFragment ? `#${hashFragment}` : "";
  return `${pathname}${nextQueryString ? `?${nextQueryString}` : ""}${hash}`;
}

const sidebarMainItems = [
  { label: "Novo bate-papo", icon: Plus, href: "/comunidade?view=chat" },
];

const sidebarSecondaryItems = [
  { label: "Conversas", icon: MessageSquare, href: "/comunidade?view=conversas" },
  { label: "Treinamentos", icon: GraduationCap, href: "/comunidade?view=treinamentos" },
  { label: "Gerar Página de Vendas", icon: LayoutTemplate, href: "/prompt-pagina-de-vendas?from=comunidade" },
  { label: "Kit de Contexto", icon: Layers, href: "/kit-contexto?from=comunidade" },
  {
    label: "Baixar EBooks",
    icon: BookOpen,
    href: "https://drive.google.com/uc?export=download&id=1vTArDG5vreAP7UvDnZpnZ6DKMKuOe5Wo",
  },
  { label: "Podcast", icon: Mic2, href: "/comunidade?view=podcast" },
  { label: "Skills", icon: Sparkles, href: "/comunidade?view=skills" },
  { label: "Pack de Prompts", icon: AppWindow, href: "/prompts?from=comunidade" },
  { label: "Projetos", icon: Boxes, href: "/comunidade?view=projetos" },
];

const projectFilters = [
  "Todos",
  "Aprenda algo",
  "Dicas e truques",
  "Jogar um jogo",
  "Seja criativo",
  "Relaxe",
];

const projectPreviewScale = 0.2;

const projectCards = [
  {
    id: "landing-page-01",
    title: "01. Landing Page",
    href: "https://growstudio.vercel.app/treinamentos/crie-paginas",
    previewUrl: "https://growstudio.vercel.app/treinamentos/crie-paginas",
    icon: "</>",
    gradient: "from-[#3d3d3f] to-[#232325]",
    accent: "from-[#f8f7f5] to-[#d9d4cb]",
  },
  {
    id: "landing-page-02",
    title: "02. Landing Page",
    href: "https://growstudio.vercel.app/treinamentos/proprio-comercial",
    previewUrl: "https://growstudio.vercel.app/treinamentos/proprio-comercial",
    icon: "</>",
    gradient: "from-[#3d3d3f] to-[#232325]",
    accent: "from-[#f8f7f5] to-[#d9d4cb]",
  },
  {
    id: "landing-page-03",
    title: "03. Landing Page",
    href: "https://growstudio.vercel.app/treinamentos/ensaios-fotograficos",
    previewUrl: "https://growstudio.vercel.app/treinamentos/ensaios-fotograficos",
    icon: "</>",
    gradient: "from-[#3d3d3f] to-[#232325]",
    accent: "from-[#f8f7f5] to-[#d9d4cb]",
  },
];

const communityUserProfile = {
  avatarInitial: "A",
  name: "Alexandre de Paula",
  email: "alexandre@growacademy.com",
  contact: "+55 (11) 99999-9999",
  role: "Aluno",
  plan: "Assinante",
};

export const metadata: Metadata = {
  title: "Comunidade | GrowS",
  description: "Layout base da página da comunidade GrowS.",
};

export default async function ComunidadePage({ searchParams }: PageProps) {
  const { view, id, lang, theme } = await searchParams;
  const isPromptsView = view === "prompts";
  const isConversationsView = view === "conversas";
  const isTrainingsView = view === "treinamentos";
  const isProjectsView = view === "projetos";
  const isPodcastView = view === "podcast";
  const isSkillsView = view === "skills";
  const isSettingsView = view === "configuracoes";
  const isLanguageView = view === "idioma";
  const isUpgradeView = view === "upgrade";
  const isThreadView = view === "thread";
  const isChatView =
    !isThreadView &&
    !isPromptsView &&
    !isConversationsView &&
    !isProjectsView &&
    !isPodcastView &&
    !isSkillsView &&
    !isTrainingsView &&
    !isSettingsView &&
    !isLanguageView &&
    !isUpgradeView;
  const activeConversationId =
    typeof id === "string" && id.trim().length > 0 ? id : null;
  const activeLanguage = lang === "en" ? "en" : "pt";
  const activeTheme: ThemeMode = theme === "light" ? "light" : "dark";
  const isLightTheme = activeTheme === "light";
  const nextTheme: ThemeMode = isLightTheme ? "dark" : "light";
  const toggleThemeParams = new URLSearchParams();

  if (typeof view === "string" && view.trim().length > 0) {
    toggleThemeParams.set("view", view);
  }
  if (typeof id === "string" && id.trim().length > 0) {
    toggleThemeParams.set("id", id);
  }
  if (typeof lang === "string" && lang.trim().length > 0) {
    toggleThemeParams.set("lang", lang);
  }
  if (nextTheme === "light") {
    toggleThemeParams.set("theme", "light");
  }

  const toggleThemeHref = `/comunidade${toggleThemeParams.toString() ? `?${toggleThemeParams.toString()}` : ""}`;

  return (
    <main
      className={`h-screen overflow-hidden ${
        isLightTheme ? "bg-[#EFEDE8] text-[#1A1A18]" : "bg-[#1f1f1d] text-[#d9d6ce]"
      }`}
    >
      <input
        id="community-sidebar-toggle"
        type="checkbox"
        className="peer sr-only"
      />

      <label
        htmlFor="community-sidebar-toggle"
        className={`pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity peer-checked:pointer-events-auto peer-checked:opacity-100 md:hidden ${
          isLightTheme ? "bg-[#1A1A18]/35" : "bg-black/50"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-[300px] -translate-x-full flex-col overflow-hidden border-r transition-transform duration-200 peer-checked:translate-x-0 md:translate-x-0 ${
          isLightTheme
            ? "border-[#E0DDD8] bg-[#F8F7F4]"
            : "border-white/10 bg-[#1d1d1b]"
        }`}
      >
          <div
            className={`flex items-center gap-2 border-b px-4 py-4 ${
              isLightTheme ? "border-[#E0DDD8]" : "border-white/8"
            }`}
          >
            <label
              htmlFor="community-sidebar-toggle"
              className={`inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border md:hidden ${
                isLightTheme
                  ? "border-[#D8D5D0] text-[#1A1A18] hover:bg-[#ECEAE6]"
                  : "border-white/10 text-white/75"
              }`}
            >
              <Menu size={14} />
            </label>
            <button
              type="button"
              className={`hidden h-7 w-7 items-center justify-center rounded-md border md:inline-flex ${
                isLightTheme
                  ? "border-[#D8D5D0] text-[#1A1A18] hover:bg-[#ECEAE6]"
                  : "border-white/10 text-white/75"
              }`}
            >
              <Menu size={14} />
            </button>
            <button
              type="button"
              className={`inline-flex h-7 w-7 items-center justify-center rounded-md border ${
                isLightTheme
                  ? "border-[#D8D5D0] text-[#1A1A18] hover:bg-[#ECEAE6]"
                  : "border-white/10 text-white/75"
              }`}
            >
              <ArrowLeft size={14} />
            </button>
            <button
              type="button"
              className={`inline-flex h-7 w-7 items-center justify-center rounded-md border ${
                isLightTheme
                  ? "border-[#D8D5D0] text-[#1A1A18] hover:bg-[#ECEAE6]"
                  : "border-white/10 text-white/75"
              }`}
            >
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="space-y-5 px-4 py-5">
            <nav className="space-y-1">
              {sidebarMainItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.label === "Novo bate-papo" && isChatView;

                if (item.href) {
                  return (
                    <Link
                      key={item.label}
                      href={withCommunityTheme(item.href, activeTheme)}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[0.93rem] transition-colors ${
                        isActive
                          ? isLightTheme
                            ? "bg-[#ECEAE6] text-[#1A1A18]"
                            : "bg-black/55 text-[#e2dfd7]"
                          : isLightTheme
                            ? "text-[#1A1A18] hover:bg-[#ECEAE6]"
                            : "text-[#d6d3cb] hover:bg-white/6"
                      }`}
                    >
                      <Icon
                        size={15}
                        className={isLightTheme ? "text-[#1A1A18]" : "text-white/70"}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                }

                return (
                  <button
                    type="button"
                    key={item.label}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[0.93rem] text-[#d6d3cb] transition-colors hover:bg-white/6"
                  >
                    <Icon size={15} className="text-white/70" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <nav className="space-y-1 pt-1">
              {sidebarSecondaryItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  (item.label === "Conversas" && isConversationsView) ||
                  (item.label === "Treinamentos" && isTrainingsView) ||
                  (item.label === "Podcast" && isPodcastView) ||
                  (item.label === "Skills" && isSkillsView) ||
                  (item.label === "Projetos" && isProjectsView);

                if (item.href) {
                  return (
                    <Link
                      key={item.label}
                      href={withCommunityTheme(item.href, activeTheme)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[0.93rem] transition-colors ${
                        isActive
                          ? isLightTheme
                            ? "bg-[#ECEAE6] text-[#1A1A18]"
                            : "bg-black/55 text-[#e2dfd7]"
                          : isLightTheme
                            ? "text-[#1A1A18] hover:bg-[#ECEAE6]"
                            : "text-[#bebbb4] hover:bg-white/6"
                      }`}
                    >
                      <Icon
                        size={15}
                        className={isLightTheme ? "text-[#1A1A18]" : "text-white/60"}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                }

                return (
                  <button
                    type="button"
                    key={item.label}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[0.93rem] text-[#bebbb4] transition-colors hover:bg-white/6"
                  >
                    <Icon size={15} className="text-white/60" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-4">
            <p
              className={`px-3 pb-2 text-[0.8rem] uppercase tracking-[0.12em] ${
                isLightTheme ? "text-[#1A1A18]" : "text-white/45"
              }`}
            >
              Recentes
            </p>
            <CommunityRecentsList
              activeConversationId={isThreadView ? activeConversationId : null}
              theme={activeTheme}
            />
          </div>

          <div
            className={`border-t px-4 py-4 ${
              isLightTheme ? "border-[#E0DDD8]" : "border-white/8"
            }`}
          >
            <CommunityUserProfile profile={communityUserProfile} theme={activeTheme} />
          </div>
        </aside>

        <section className="relative ml-0 flex h-screen min-h-0 flex-col overflow-hidden md:ml-[300px]">
          <header className="flex h-16 items-center justify-between px-4 md:px-10">
            <div className="inline-flex items-center gap-2 md:hidden">
              <label
                htmlFor="community-sidebar-toggle"
                className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border ${
                  isLightTheme
                    ? "border-[#D8D5D0] text-[#1A1A18] hover:bg-[#ECEAE6]"
                    : "border-white/10 text-white/75"
                }`}
              >
                <Menu size={16} />
              </label>
              <p
                className={`text-[0.88rem] font-medium ${
                  isLightTheme ? "text-[#1A1A18]" : "text-[#d8d4cc]"
                }`}
              >
                {isThreadView
                  ? "Conversa"
                  : isPromptsView
                    ? "Prompts"
                    : isTrainingsView
                      ? "Treinamentos"
                    : isPodcastView
                      ? "Podcast"
                    : isSkillsView
                      ? "Skills"
                    : isProjectsView
                      ? "Projetos"
                    : isConversationsView
                      ? "Conversas"
                      : isSettingsView
                        ? "Configurações"
                        : isLanguageView
                          ? "Idioma"
                          : isUpgradeView
                            ? "Upgrade"
                      : "Comunidade"}
              </p>
            </div>

            <div className="hidden md:inline-flex">
              {isThreadView ? (
                <button
                  type="button"
                  className={`inline-flex items-center gap-2 rounded-lg px-2 py-1 text-[0.9rem] transition-colors ${
                    isLightTheme
                      ? "text-[#1A1A18] hover:bg-[#ECEAE6]"
                      : "text-[#d6d2cb] hover:bg-white/6"
                  }`}
                >
                  Conversa
                  <ChevronDown
                    size={13}
                    className={isLightTheme ? "text-[#1A1A18]" : "text-white/60"}
                  />
                </button>
              ) : isTrainingsView ? (
                <p className={`text-[0.9rem] ${isLightTheme ? "text-[#1A1A18]" : "text-[#d6d2cb]"}`}>Treinamentos</p>
              ) : isPodcastView ? (
                <p className={`text-[0.9rem] ${isLightTheme ? "text-[#1A1A18]" : "text-[#d6d2cb]"}`}>Podcast</p>
              ) : isSkillsView ? (
                <p className={`text-[0.9rem] ${isLightTheme ? "text-[#1A1A18]" : "text-[#d6d2cb]"}`}>Skills</p>
              ) : isPromptsView ? (
                <p className={`text-[0.9rem] ${isLightTheme ? "text-[#1A1A18]" : "text-[#d6d2cb]"}`}>Prompts</p>
              ) : isProjectsView ? (
                <p className={`text-[0.9rem] ${isLightTheme ? "text-[#1A1A18]" : "text-[#d6d2cb]"}`}>Projetos</p>
              ) : isConversationsView ? (
                <p className={`text-[0.9rem] ${isLightTheme ? "text-[#1A1A18]" : "text-[#d6d2cb]"}`}>Conversas</p>
              ) : isSettingsView ? (
                <p className={`text-[0.9rem] ${isLightTheme ? "text-[#1A1A18]" : "text-[#d6d2cb]"}`}>Configurações</p>
              ) : isLanguageView ? (
                <p className={`text-[0.9rem] ${isLightTheme ? "text-[#1A1A18]" : "text-[#d6d2cb]"}`}>Idioma</p>
              ) : isUpgradeView ? (
                <p className={`text-[0.9rem] ${isLightTheme ? "text-[#1A1A18]" : "text-[#d6d2cb]"}`}>Upgrade</p>
              ) : (
                <span />
              )}
            </div>

            <div className="inline-flex items-center gap-1.5">
              <Link
                href={toggleThemeHref}
                aria-label={isLightTheme ? "Ativar modo escuro" : "Ativar modo claro"}
                title={isLightTheme ? "Modo escuro" : "Modo claro"}
                className={`group relative inline-flex h-8 w-[62px] items-center rounded-full border p-1 transition-all duration-200 ${
                  isLightTheme
                    ? "border-[#D8D5D0] bg-[#F5F4F0] hover:bg-[#ECEAE6]"
                    : "border-white/12 bg-white/5 hover:bg-white/8"
                }`}
              >
                <span
                  className={`absolute left-[5px] top-1/2 -translate-y-1/2 transition-opacity ${
                    isLightTheme ? "opacity-100" : "opacity-55 group-hover:opacity-80"
                  }`}
                >
                  <Sun
                    size={13}
                    className={isLightTheme ? "text-[#1A1A18]" : "text-[#f2d48e]"}
                  />
                </span>
                <span
                  className={`absolute right-[5px] top-1/2 -translate-y-1/2 transition-opacity ${
                    isLightTheme ? "opacity-55 group-hover:opacity-80" : "opacity-100"
                  }`}
                >
                  <Moon
                    size={13}
                    className={isLightTheme ? "text-[#1A1A18]" : "text-[#d6d2cb]"}
                  />
                </span>
                <span
                  className={`h-6 w-6 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.2)] ring-1 transition-transform duration-200 ${
                    isLightTheme
                      ? "translate-x-0 bg-[#FFFFFF] ring-[#D8D5D0]"
                      : "translate-x-[30px] bg-[#2a2a28] ring-white/15"
                  }`}
                />
              </Link>
            </div>
          </header>

          {isThreadView ? (
            <CommunityAgentChat
              mode="thread"
              conversationId={activeConversationId}
              theme={activeTheme}
            />
          ) : isChatView ? (
            <CommunityAgentChat mode="welcome" theme={activeTheme} />
          ) : isSettingsView ? (
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-8 pt-8 md:px-10 md:pt-10">
              <div className="mx-auto w-full max-w-[920px]">
                <p className="text-xs uppercase tracking-[0.14em] text-[#9d9a93]">
                  Perfil
                </p>
                <h1 className="mt-3 font-serif text-[clamp(1.45rem,1.8vw,1.8rem)] font-bold uppercase text-[#e0dcd4]">
                  Editar perfil
                </h1>
                <p className="mt-3 max-w-2xl text-[0.9rem] text-[#aca9a2]">
                  Atualize seus dados para manter sua conta organizada dentro da
                  comunidade.
                </p>

                <div className="mt-7 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                  <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <h2 className="text-[1rem] text-[#ddd9d2]">Dados da conta</h2>
                    <form className="mt-4 grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-[0.78rem] uppercase tracking-[0.1em] text-[#8f8b84]">
                          Nome
                        </span>
                        <input
                          type="text"
                          defaultValue={communityUserProfile.name}
                          className="mt-2 h-11 w-full rounded-xl border border-white/12 bg-[#2b2b29] px-3 text-[0.92rem] text-[#e0dcd4] outline-none transition-colors focus:border-[#4a4843]"
                        />
                      </label>
                      <label className="block">
                        <span className="text-[0.78rem] uppercase tracking-[0.1em] text-[#8f8b84]">
                          E-mail
                        </span>
                        <input
                          type="email"
                          defaultValue={communityUserProfile.email}
                          className="mt-2 h-11 w-full rounded-xl border border-white/12 bg-[#2b2b29] px-3 text-[0.92rem] text-[#e0dcd4] outline-none transition-colors focus:border-[#4a4843]"
                        />
                      </label>
                      <label className="block">
                        <span className="text-[0.78rem] uppercase tracking-[0.1em] text-[#8f8b84]">
                          Contato
                        </span>
                        <input
                          type="text"
                          defaultValue={communityUserProfile.contact}
                          className="mt-2 h-11 w-full rounded-xl border border-white/12 bg-[#2b2b29] px-3 text-[0.92rem] text-[#e0dcd4] outline-none transition-colors focus:border-[#4a4843]"
                        />
                      </label>
                      <label className="block">
                        <span className="text-[0.78rem] uppercase tracking-[0.1em] text-[#8f8b84]">
                          Avatar
                        </span>
                        <input
                          type="text"
                          defaultValue={communityUserProfile.avatarInitial}
                          maxLength={2}
                          className="mt-2 h-11 w-full rounded-xl border border-white/12 bg-[#2b2b29] px-3 text-[0.92rem] text-[#e0dcd4] outline-none transition-colors focus:border-[#4a4843]"
                        />
                      </label>
                    </form>
                  </section>

                  <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <h2 className="text-[1rem] text-[#ddd9d2]">Acesso atual</h2>
                    <div className="mt-4 rounded-xl border border-white/10 bg-[#262624] p-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#d2d2cd] text-[1.15rem] font-semibold text-[#2a2a28]">
                        {communityUserProfile.avatarInitial}
                      </div>
                      <p className="mt-3 text-[0.98rem] font-medium text-[#e4e0d8]">
                        {communityUserProfile.name}
                      </p>
                      <p className="mt-1 text-[0.82rem] text-[#aaa79f]">
                        {communityUserProfile.email}
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="rounded-full border border-white/15 bg-[#2f2f2d] px-2.5 py-1 text-[0.74rem] text-[#d7d3cb]">
                          {communityUserProfile.role}
                        </span>
                        <span className="rounded-full border border-[#91533e]/45 bg-[#3a2a24] px-2.5 py-1 text-[0.74rem] text-[#ffbb93]">
                          {communityUserProfile.plan}
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-[0.82rem] text-[#96938d]">
                      Essas informações aparecem no seu perfil da comunidade e
                      ajudam a identificar seu nível de acesso.
                    </p>
                  </section>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-end gap-2.5">
                  <Link
                    href={withCommunityTheme("/comunidade?view=chat", activeTheme)}
                    className="rounded-xl border border-white/12 px-4 py-2 text-[0.86rem] text-[#b5b2aa] transition-colors hover:bg-white/6"
                  >
                    Cancelar
                  </Link>
                  <button
                    type="button"
                    className="rounded-xl bg-[#f1ede5] px-4 py-2 text-[0.86rem] font-medium text-[#1f1f1d] transition-colors hover:bg-white"
                  >
                    Salvar alterações
                  </button>
                </div>
              </div>
            </div>
          ) : isLanguageView ? (
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-8 pt-8 md:px-10 md:pt-10">
              <div className="mx-auto w-full max-w-[920px]">
                <p className="text-xs uppercase tracking-[0.14em] text-[#9d9a93]">
                  Preferências
                </p>
                <h1 className="mt-3 font-serif text-[clamp(1.45rem,1.8vw,1.8rem)] font-bold uppercase text-[#e0dcd4]">
                  Idioma da interface
                </h1>
                <p className="mt-3 max-w-2xl text-[0.9rem] text-[#aca9a2]">
                  Selecione como você quer navegar na comunidade e receber os
                  textos padrão do sistema.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <Link
                    href={withCommunityTheme("/comunidade?view=idioma&lang=pt", activeTheme)}
                    className={`rounded-2xl border p-5 transition-colors ${
                      activeLanguage === "pt"
                        ? "border-[#c67652]/70 bg-[#2e2521]"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/6"
                    }`}
                  >
                    <p className="text-[1rem] text-[#e0dcd4]">Português</p>
                    <p className="mt-2 text-[0.84rem] text-[#a7a39b]">
                      Menus, botões e mensagens em português.
                    </p>
                  </Link>
                  <Link
                    href={withCommunityTheme("/comunidade?view=idioma&lang=en", activeTheme)}
                    className={`rounded-2xl border p-5 transition-colors ${
                      activeLanguage === "en"
                        ? "border-[#c67652]/70 bg-[#2e2521]"
                        : "border-white/10 bg-white/[0.03] hover:bg-white/6"
                    }`}
                  >
                    <p className="text-[1rem] text-[#e0dcd4]">English</p>
                    <p className="mt-2 text-[0.84rem] text-[#a7a39b]">
                      Interface and default system messages in English.
                    </p>
                  </Link>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[0.86rem] text-[#b5b2ab]">
                    Idioma ativo:
                    <span className="ml-1.5 font-medium text-[#e0dcd4]">
                      {activeLanguage === "pt" ? "Português" : "English"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ) : isUpgradeView ? (
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-8 pt-8 md:px-10 md:pt-10">
              <div className="mx-auto w-full max-w-[920px]">
                <p className="text-xs uppercase tracking-[0.14em] text-[#9d9a93]">
                  Plano
                </p>
                <h1 className="mt-3 font-serif text-[clamp(1.45rem,1.8vw,1.8rem)] font-bold uppercase text-[#e0dcd4]">
                  Upgrade do plano
                </h1>
                <p className="mt-3 max-w-2xl text-[0.9rem] text-[#aca9a2]">
                  Compare os níveis de acesso e mantenha o plano alinhado com
                  o seu momento na comunidade.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-[0.78rem] uppercase tracking-[0.11em] text-[#8e8b85]">
                      Plano base
                    </p>
                    <h2 className="mt-2 text-[1.08rem] text-[#d9d6cf]">Aluno</h2>
                    <p className="mt-2 text-[0.84rem] text-[#9f9b94]">
                      Acesso ao chat da comunidade e conteúdos essenciais.
                    </p>
                  </article>

                  <article className="rounded-2xl border border-[#c67652]/70 bg-[#2e2521] p-5">
                    <p className="text-[0.78rem] uppercase tracking-[0.11em] text-[#ffb892]">
                      Plano atual
                    </p>
                    <h2 className="mt-2 text-[1.08rem] text-[#ffe0cf]">
                      Assinante
                    </h2>
                    <p className="mt-2 text-[0.84rem] text-[#f2c6ab]">
                      Recursos completos, prioridade no suporte e novidades em
                      primeira mão.
                    </p>
                  </article>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-[0.9rem] text-[#d8d4cc]">
                    Benefícios ativos do seu plano
                  </p>
                  <div className="mt-3 space-y-2 text-[0.84rem] text-[#aba8a1]">
                    <p>Atendimento com prioridade no Agente Grow+.</p>
                    <p>Biblioteca completa de prompts e projetos.</p>
                    <p>Acesso liberado aos treinamentos da comunidade.</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-end gap-2.5">
                  <Link
                    href={withCommunityTheme("/comunidade?view=chat", activeTheme)}
                    className="rounded-xl border border-white/12 px-4 py-2 text-[0.86rem] text-[#b5b2aa] transition-colors hover:bg-white/6"
                  >
                    Voltar para comunidade
                  </Link>
                  <a
                    href="https://checkout.infinitepay.io/qt-sala01-stageone/3obvvPOUZV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-[#f1ede5] px-4 py-2 text-[0.86rem] font-medium text-[#1f1f1d] transition-colors hover:bg-white"
                  >
                    Gerenciar assinatura
                  </a>
                </div>
              </div>
            </div>
          ) : isPromptsView ? (
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-8 md:px-10 md:py-10">
              <div className="mx-auto w-full max-w-[1180px]">
                <p className="text-xs uppercase tracking-[0.15em] text-[#a4a19b]">
                  Biblioteca
                </p>
                <h1 className="mt-3 font-serif text-3xl font-bold uppercase text-[#e1ddd6] sm:text-4xl">
                  Prompts da Comunidade
                </h1>
                <p className="mt-4 max-w-2xl text-[0.92rem] text-[#b6b3ab]">
                  Escolha prompt, copie e use com o agente de IA para acelerar
                  seus resultados.
                </p>

                <div className="mt-8">
                  <PromptCardsGrid
                    prompts={COMMUNITY_PROMPTS}
                    isLightTheme={isLightTheme}
                  />
                </div>
              </div>
            </div>
          ) : isSkillsView ? (
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-8 md:px-10 md:py-10">
              <div className="mx-auto w-full max-w-[1180px]">
                <p className={`text-xs uppercase tracking-[0.15em] ${isLightTheme ? "text-[#1A1A18]" : "text-[#a4a19b]"}`}>
                  Biblioteca
                </p>
                <h1 className={`mt-3 font-serif text-3xl font-bold uppercase sm:text-4xl ${isLightTheme ? "text-[#1A1A18]" : "text-[#e1ddd6]"}`}>
                  Skills
                </h1>
                <p className={`mt-4 max-w-2xl text-[0.92rem] ${isLightTheme ? "text-[#1A1A18]" : "text-[#b6b3ab]"}`}>
                  Skills prontas para usar no Claude. Escolha uma skill, copie e
                  cole no chat.
                </p>

                <div className="mt-8">
                  <ClaudeSkillsGrid isLightTheme={isLightTheme} />
                </div>
              </div>
            </div>
          ) : isTrainingsView ? (
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-8 pt-8 md:px-10 md:pt-10">
              <div className="mx-auto w-full max-w-[920px]">
                <h1 className="font-serif text-[clamp(1.45rem,1.8vw,1.75rem)] font-bold uppercase text-[#dcd8d0]">
                  Treinamentos
                </h1>
                <p className="mt-3 text-[0.86rem] text-[#a6a39d]">
                  Acesse os conteúdos da comunidade.
                </p>

                <div className="mt-6">
                  <TreinamentosCardsGrid
                    withReveal={false}
                    isLightTheme={isLightTheme}
                  />
                </div>
              </div>
            </div>
          ) : isPodcastView ? (
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-8 pt-4 md:px-6 md:pt-5">
              <CommunityPodcastCards className="mx-auto w-full max-w-[1380px]" />
            </div>
          ) : isProjectsView ? (
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-8 pt-8 md:px-10 md:pt-10">
              <div className="mx-auto w-full max-w-[1040px]">
                <div>
                  <div>
                    <h1 className="font-serif text-[clamp(1.45rem,1.8vw,1.75rem)] font-bold uppercase text-[#dcd8d0]">
                      Código-fonte dos treinamentos
                    </h1>
                    <p className="mt-2 text-[0.86rem] text-[#a8a59e]">
                      Visualize ou Baixe Código-fonte dos treinamentos.
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex items-end gap-8 border-b border-white/8">
                  <button
                    type="button"
                    className="border-b-2 border-[#ece9e1] pb-3 text-[0.9rem] text-[#e2ded6]"
                  >
                    Inspiração
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  {projectFilters.map((filter) => {
                    const isActive = filter === "Todos";
                    return (
                      <button
                        key={filter}
                        type="button"
                        className={`rounded-full px-3.5 py-1.5 text-[0.84rem] transition-colors ${
                          isActive
                            ? "bg-black text-[#ece8df]"
                            : "text-[#9f9b94] hover:bg-white/6 hover:text-[#c9c5bd]"
                        }`}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {projectCards.map((project) => (
                    <article key={project.id} className="group">
                      <div
                        className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#171715]"
                      >
                        <div className="pointer-events-none absolute inset-0">
                          <iframe
                            src={project.previewUrl}
                            title={`Preview ${project.title}`}
                            loading="lazy"
                            className="absolute left-0 top-0 border-0"
                            style={{
                              width: `${100 / projectPreviewScale}%`,
                              height: `${100 / projectPreviewScale}%`,
                              transform: `scale(${projectPreviewScale})`,
                              transformOrigin: "top left",
                            }}
                          />
                        </div>
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.42)_100%)]" />
                        <div className="pointer-events-none absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100" />
                        <div className="absolute inset-x-3 bottom-3 z-20 flex items-center gap-2 rounded-xl border border-white/14 bg-[#1c1c1a]/86 p-1.5 shadow-[0_12px_24px_-14px_rgba(0,0,0,0.9)] backdrop-blur-md opacity-100 sm:translate-y-2 sm:opacity-0 sm:transition-all sm:duration-200 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
                          <a
                            href={project.previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-lime-300/45 bg-[var(--color-lime-300)] px-3 py-2 text-[0.78rem] font-medium text-slate-950 transition-colors hover:border-lime-200/65 hover:bg-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-200/55"
                          >
                            <Eye size={13} />
                            Preview
                          </a>
                          <a
                            href={`/api/comunidade/projeto/download?id=${encodeURIComponent(project.id)}`}
                            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#f47b4f]/55 bg-[#f47b4f] px-3 py-2 text-[0.78rem] font-medium text-[#1f1f1d] transition-colors hover:bg-[#f69069] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f47b4f]/60"
                          >
                            <Download size={13} />
                            Baixar
                          </a>
                        </div>
                        <div className="absolute bottom-5 right-5 rounded-lg border border-white/15 bg-black/30 px-3 py-1 text-xs font-semibold tracking-wide text-[#ece8df]">
                          {project.icon}
                        </div>
                      </div>
                      <p className="mt-2.5 text-[0.86rem] text-[#d8d4cc] transition-colors group-hover:text-[#ede9e0]">
                        {project.title}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          ) : isConversationsView ? (
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-8 pt-8 md:px-10 md:pt-10">
              <div className="mx-auto w-full max-w-[920px]">
                <div className="flex items-center justify-between gap-4">
                  <h1 className="font-serif text-[clamp(1.45rem,1.8vw,1.75rem)] font-bold uppercase text-[#dcd8d0]">
                    Conversas
                  </h1>
                  <button
                    type="button"
                    aria-label="Nova conversa"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#f0ece4] text-[#1a1a18] transition-colors hover:bg-white"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                <CommunityConversationsList theme={activeTheme} />
              </div>
            </div>
          ) : null}
        </section>
    </main>
  );
}
