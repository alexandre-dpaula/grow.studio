"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";

type PromptTypewriterProps = {
  text?: string;
};

const DEFAULT_PROMPT = "Gere uma Imagem com 1080px";

export default function PromptTypewriter({
  text = DEFAULT_PROMPT,
}: PromptTypewriterProps) {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = window.setTimeout(() => {
        setIsPaused(false);
      }, 1100);

      return () => window.clearTimeout(pauseTimer);
    }

    const finishedTyping = !isDeleting && currentText === text;
    const finishedDeleting = isDeleting && currentText.length === 0;

    if (finishedTyping) {
      setIsPaused(true);
      setIsDeleting(true);
      return;
    }

    if (finishedDeleting) {
      setIsDeleting(false);
      return;
    }

    const speed = isDeleting ? 38 : 70;

    const timer = window.setTimeout(() => {
      const nextLength = isDeleting
        ? Math.max(0, currentText.length - 1)
        : currentText.length + 1;

      setCurrentText(text.slice(0, nextLength));
    }, speed);

    return () => window.clearTimeout(timer);
  }, [currentText, isDeleting, isPaused, text]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full rounded-2xl border border-white/15 bg-[rgba(5,12,20,0.72)] p-2 shadow-[0_30px_90px_-45px_rgba(0,0,0,0.92)] backdrop-blur-xl"
    >
      <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-black/35 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="rounded-full border border-lime-300/30 bg-lime-300/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-lime-200">
            [ prompt ]
          </span>
          <div className="flex min-w-0 items-center gap-2 text-sm text-white/90 sm:text-base">
            <Search size={16} className="shrink-0 text-lime-200/80" />
            <span className="truncate">{currentText}</span>
            <span className="h-4 w-px animate-pulse bg-lime-200" />
          </div>
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-lime-300/40 bg-lime-300/20 px-4 py-2 text-sm font-semibold text-lime-100 transition-all duration-300 hover:border-lime-200/60 hover:bg-lime-300/30"
        >
          <Sparkles size={15} />
          Gerar
        </button>
      </div>
    </motion.div>
  );
}
