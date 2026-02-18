"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { copy } from "@/styles/copy";

type Language = "pt" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (typeof copy)[Language];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "growplus-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "pt" || stored === "en") {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => {
    return {
      language,
      setLanguage,
      toggleLanguage: () =>
        setLanguage((prev) => (prev === "pt" ? "en" : "pt")),
      t: copy[language],
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
