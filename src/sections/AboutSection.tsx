"use client";

import Image from "next/image";
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
        <Reveal className="max-w-[75rem]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0082fb] sm:text-sm sm:tracking-[0.3em]">
            {t.about.eyebrow}
          </p>
          <h2 className="section-title mt-4 font-heading text-[clamp(2.15rem,10vw,4rem)] font-bold sm:mt-5">
            <span className="block lg:whitespace-nowrap">{t.about.title}</span>
            <span className="mt-1 block text-white/70 lg:whitespace-nowrap">
              {t.about.subtitle}
            </span>
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 xl:grid-cols-[0.67fr_0.33fr] xl:items-start">
          <Reveal className="relative">
            <div className="pointer-events-none absolute -left-6 -top-6 h-32 w-32 rounded-full bg-[#0082fb]/14 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 right-8 h-40 w-40 rounded-full bg-white/6 blur-3xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[color:var(--bg-secondary)] shadow-soft sm:rounded-[34px]">
              <div className="relative h-[360px] sm:h-[460px] md:h-[620px] xl:h-[760px]">
                <Image
                  src="/hf_20260313_140155_9f1bc704-126c-461a-ae1a-9c42d5510c77.jpeg"
                  alt="Grow+ Studio positioning section"
                  fill
                  sizes="(max-width: 1279px) 100vw, 67vw"
                  unoptimized
                  className="object-cover object-[50%_24%]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/18 via-transparent to-black/6" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          </Reveal>
          <Reveal className="xl:mt-0">
            <div className="glass-card rounded-[24px] p-5 sm:p-6 md:rounded-[28px] md:p-8 lg:p-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-white/78 sm:px-5 sm:py-3 sm:text-[13px] sm:tracking-[0.22em] md:text-sm">
                {t.about.overlayBadge}
              </div>
              <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                <p className="text-[15px] leading-7 text-white/72 sm:text-base">
                  {withBrand(t.about.textPrimary)}
                </p>
                <p className="text-[15px] leading-7 text-white/72 sm:text-base">
                  {withBrand(t.about.textSecondary)}
                </p>
              </div>
              <div className="mt-7 sm:mt-8">
                <Button
                  href="#contact"
                  variant="secondary"
                  icon={<ArrowRight size={16} />}
                  className="sm:w-auto"
                >
                  {t.about.cta}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
