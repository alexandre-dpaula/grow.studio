"use client";

import { ArrowRight } from "lucide-react";
import Button from "@/components/Button";
import { withBrand } from "@/components/BrandMark";
import { useLanguage } from "@/components/LanguageProvider";
import Container from "@/layout/Container";
import Reveal from "@/components/Reveal";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-spacing">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0082fb]">
              {t.about.eyebrow}
            </p>
            <h2 className="mt-5 font-heading text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight">
              {t.about.title}
              <span className="block text-white/70">{t.about.subtitle}</span>
            </h2>
            <p className="mt-6 text-base text-white/70">
              {withBrand(t.about.textPrimary)}
            </p>
            <p className="mt-4 text-base text-white/70">
              {withBrand(t.about.textSecondary)}
            </p>
            <div className="mt-8">
              <Button href="#contact" variant="secondary" icon={<ArrowRight size={16} />}>
                {t.about.cta}
              </Button>
            </div>
          </Reveal>
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-soft">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(140deg, rgba(11,11,15,0.2), rgba(11,11,15,0.85)), url('https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="relative z-10 h-[420px] p-10">
                <div className="glass-card inline-flex items-center gap-3 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                  {t.about.overlayBadge}
                </div>
                <div className="mt-6 space-y-4 text-sm text-white/70">
                  <p>{t.about.overlayText[0]}</p>
                  <p>{t.about.overlayText[1]}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
