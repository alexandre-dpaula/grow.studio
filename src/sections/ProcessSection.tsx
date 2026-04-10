"use client";

import { withBrand } from "@/components/BrandMark";
import Container from "@/layout/Container";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";

export default function ProcessSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden section-spacing" id="process">
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,8,12,0.84)_0%,rgba(8,8,12,0.74)_34%,rgba(8,8,12,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,130,251,0.16),transparent_34%),radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%)]" />
      <Container className="relative z-10">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50 sm:text-sm sm:tracking-[0.3em]">
            {t.process.eyebrow}
          </p>
          <h2 className="section-title mt-3 font-heading text-[clamp(2rem,10vw,4rem)] font-bold sm:mt-4">
            {withBrand(t.process.title)}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {t.process.steps.map((step, idx) => (
            <Reveal key={step.title} delay={idx * 0.05}>
              <div className="relative h-full overflow-hidden rounded-[22px] border border-white/10 bg-[rgba(11,11,15,0.72)] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_60px_-40px_rgba(0,130,251,0.7)] before:absolute before:left-0 before:top-0 before:h-[2px] before:w-full before:bg-[#0082fb] before:content-[''] sm:rounded-[24px] sm:p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0082fb]">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="card-title mt-5 font-heading text-[1.2rem] font-semibold sm:mt-6 sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] text-white/60 sm:text-sm">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
