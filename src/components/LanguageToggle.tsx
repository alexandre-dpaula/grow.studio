"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
      <button
        type="button"
        aria-label="Switch to Portuguese"
        aria-pressed={language === "pt"}
        onClick={() => setLanguage("pt")}
        className={`flex items-center gap-2 rounded-full px-3 py-2 transition-all duration-300 ${
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
        BR
      </button>
      <button
        type="button"
        aria-label="Switch to English"
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-2 rounded-full px-3 py-2 transition-all duration-300 ${
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
        EN
      </button>
    </div>
  );
}
