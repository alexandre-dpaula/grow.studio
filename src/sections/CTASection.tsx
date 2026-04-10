"use client";

import { ArrowRight } from "lucide-react";
import Button from "@/components/Button";
import { withBrand } from "@/components/BrandMark";
import { useLanguage } from "@/components/LanguageProvider";
import Container from "@/layout/Container";
import Reveal from "@/components/Reveal";

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section-spacing">
      <Container>
        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[color:var(--bg-secondary)] p-6 sm:rounded-[28px] sm:p-10 md:p-16">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b0b0f]/70 via-[#0b0b0f]/35 to-transparent" />
          <Reveal className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50 sm:text-sm sm:tracking-[0.3em]">
              {t.cta.eyebrow}
            </p>
            <h2 className="section-title mt-3 font-heading text-[clamp(2rem,10vw,4rem)] font-bold sm:mt-4">
              {withBrand(t.cta.title)}
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] text-white/70 sm:text-base">
              {withBrand(t.cta.description)}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button icon={<ArrowRight size={16} />} className="sm:w-auto">
                {t.cta.primary}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
