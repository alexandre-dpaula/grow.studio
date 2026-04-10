"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type PromptCard = {
  id: string;
  title: string;
  description: string;
  prompt: string;
};

type PromptCardsGridProps = {
  prompts: PromptCard[];
};

const FILTER_TAGS = ["Todos", "Imagem", "Video", "Web", "Estrategia"] as const;
type PromptFilterTag = (typeof FILTER_TAGS)[number];
const PROMPTS_PER_PAGE = 12;

function normalizePromptText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getPromptCategory(prompt: PromptCard): Exclude<PromptFilterTag, "Todos"> {
  const source = normalizePromptText(`${prompt.id} ${prompt.title} ${prompt.prompt}`);

  if (
    source.includes("imagem") ||
    source.includes("midjourney") ||
    source.includes("dall") ||
    source.includes("leonardo") ||
    source.includes("higgsfield") ||
    source.includes("thumbnail")
  ) {
    return "Imagem";
  }

  if (
    source.includes("web") ||
    source.includes("landing page") ||
    source.includes("pagina de captura") ||
    source.includes("html") ||
    source.includes("css") ||
    source.includes("javascript") ||
    source.includes("js") ||
    source.includes("vibe coding")
  ) {
    return "Web";
  }

  if (
    source.includes("reels") ||
    source.includes("tiktok") ||
    source.includes("shorts") ||
    source.includes("video") ||
    source.includes("capcut") ||
    source.includes("storytime") ||
    source.includes("hook")
  ) {
    return "Video";
  }

  return "Estrategia";
}

export default function PromptCardsGrid({ prompts }: PromptCardsGridProps) {
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<PromptFilterTag>("Todos");
  const [currentPage, setCurrentPage] = useState(1);

  const promptsWithCategory = useMemo(
    () =>
      prompts.map((item) => ({
        ...item,
        category: getPromptCategory(item),
      })),
    [prompts],
  );

  const filteredPrompts = useMemo(
    () =>
      activeFilter === "Todos"
        ? promptsWithCategory
        : promptsWithCategory.filter((item) => item.category === activeFilter),
    [activeFilter, promptsWithCategory],
  );

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredPrompts.length / PROMPTS_PER_PAGE)),
    [filteredPrompts.length],
  );

  const paginatedPrompts = useMemo(() => {
    const start = (currentPage - 1) * PROMPTS_PER_PAGE;
    const end = start + PROMPTS_PER_PAGE;
    return filteredPrompts.slice(start, end);
  }, [currentPage, filteredPrompts]);

  useEffect(() => {
    if (!copiedPromptId) return;
    const timer = setTimeout(() => setCopiedPromptId(null), 1600);
    return () => clearTimeout(timer);
  }, [copiedPromptId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  async function copyPrompt(prompt: string, promptId: string) {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPromptId(promptId);
    } catch {
      setCopiedPromptId(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {FILTER_TAGS.map((tag) => {
          const isActive = activeFilter === tag;

          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveFilter(tag)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.8rem] transition-colors ${
                isActive
                  ? "border-[#f47b4f]/55 bg-[#f47b4f] font-medium text-[#1f1f1d]"
                  : "border-white/12 text-[#cbc7bf] hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {paginatedPrompts.map((item) => {
        const isCopied = copiedPromptId === item.id;

        return (
          <article
            key={item.id}
            className="rounded-2xl border border-white/12 bg-[rgba(55,55,53,0.45)] p-5"
          >
            <h3 className="text-base font-semibold text-[#e3dfd7]">{item.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#b6b3ab]">
              {item.description}
            </p>

            <button
              type="button"
              onClick={() => copyPrompt(item.prompt, item.id)}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#f47b4f]/55 bg-[#f47b4f] px-4 py-2.5 text-sm font-semibold text-[#1f1f1d] transition-colors hover:bg-[#f69069] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f47b4f]/60"
            >
              {isCopied ? <Check size={16} /> : <Copy size={16} />}
              {isCopied ? "Prompt copiado" : "Copiar prompt"}
            </button>
          </article>
        );
      })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[rgba(55,55,53,0.3)] px-3 py-2.5">
        <p className="text-[0.8rem] text-[#aaa79f]">
          Página {currentPage} de {totalPages} • {filteredPrompts.length} prompts
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-white/12 px-2.5 py-1.5 text-[0.78rem] text-[#d7d3cb] transition-colors hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`h-8 min-w-8 rounded-lg border px-2 text-[0.78rem] transition-colors ${
                  isActive
                    ? "border-[#f47b4f]/55 bg-[#f47b4f] font-semibold text-[#1f1f1d]"
                    : "border-white/12 text-[#c3c0b9] hover:bg-white/8"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPage === totalPages}
            className="rounded-lg border border-white/12 px-2.5 py-1.5 text-[0.78rem] text-[#d7d3cb] transition-colors hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
