"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";
import Container from "@/layout/Container";

const INITIAL_DELAY_MS = 280;
const LOOP_DELAY_MS = 1450;

export default function TrustStrip() {
  const { t } = useLanguage();
  const items = t.trust.items;
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    let intervalId: number | undefined;

    setActiveIndex(-1);

    const startTimeout = window.setTimeout(() => {
      setActiveIndex(0);
      intervalId = window.setInterval(() => {
        setActiveIndex((current) => (current + 1) % items.length);
      }, LOOP_DELAY_MS);
    }, INITIAL_DELAY_MS);

    return () => {
      window.clearTimeout(startTimeout);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [items]);

  return (
    <section className="relative overflow-hidden border-y border-white/6 bg-[color:var(--bg-secondary)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_58%)] opacity-70" />
      <Container>
        <Reveal className="relative py-6 md:py-10">
          <div className="hide-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <div className="flex min-w-max items-center gap-3 sm:min-w-0 sm:flex-wrap sm:justify-center md:gap-4">
            {items.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.span
                  key={item}
                  animate={{
                    opacity: isActive ? 1 : 0.28,
                    y: isActive ? -2 : 0,
                    scale: isActive ? 1 : 0.985,
                    color: isActive
                      ? "rgba(255,255,255,0.96)"
                      : "rgba(255,255,255,0.32)",
                    backgroundColor: isActive
                      ? "rgba(255,255,255,0.09)"
                      : "rgba(255,255,255,0.02)",
                    borderColor: isActive
                      ? "rgba(255,255,255,0.18)"
                      : "rgba(255,255,255,0.06)",
                    boxShadow: isActive
                      ? "0 18px 40px -28px rgba(255,255,255,0.55)"
                      : "0 0 0 rgba(255,255,255,0)",
                  }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="shrink-0 rounded-full border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] backdrop-blur-md sm:px-4 md:px-5 md:py-2.5 md:text-[11px] md:tracking-[0.28em]"
                >
                  {item}
                </motion.span>
              );
            })}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
