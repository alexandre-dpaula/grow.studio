"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

type LanguageToggleProps = {
  iconOnly?: boolean;
};

export default function LanguageToggle({ iconOnly = false }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`flex items-center rounded-full border border-white/10 bg-black/20 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60 backdrop-blur-md ${
        iconOnly ? "gap-1 p-1.5" : "gap-2 bg-white/5 p-1"
      }`}
    >
      <button
        type="button"
        aria-label="Switch to Portuguese"
        aria-pressed={language === "pt"}
        onClick={() => setLanguage("pt")}
        className={`flex items-center rounded-full transition-all duration-300 ${
          iconOnly ? "px-2 py-2" : "gap-2 px-3 py-2"
        } ${
          language === "pt"
            ? "bg-white/15 text-white ring-1 ring-white/25 shadow-[0_12px_30px_-20px_rgba(255,255,255,0.5)]"
            : "text-white/50 hover:text-white hover:bg-white/10"
        }`}
      >
        <span className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/20">
          <Image
            src="/pt.svg"
            alt="Portuguese flag"
            width={20}
            height={20}
            className="h-full w-full object-cover"
          />
        </span>
        {iconOnly ? null : "BR"}
      </button>
      <button
        type="button"
        aria-label="Switch to English"
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
        className={`flex items-center rounded-full transition-all duration-300 ${
          iconOnly ? "px-2 py-2" : "gap-2 px-3 py-2"
        } ${
          language === "en"
            ? "bg-white/15 text-white ring-1 ring-white/25 shadow-[0_12px_30px_-20px_rgba(255,255,255,0.5)]"
            : "text-white/50 hover:text-white hover:bg-white/10"
        }`}
      >
        <span className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/20">
          <Image
            src="/en.svg"
            alt="English flag"
            width={20}
            height={20}
            className="h-full w-full object-cover"
          />
        </span>
        {iconOnly ? null : "EN"}
      </button>
    </div>
  );
}
