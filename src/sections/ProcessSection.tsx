"use client";

import Container from "@/layout/Container";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";

const stepIndexes = ["01", "02", "03", "04"];

export default function ProcessSection() {
  const { t } = useLanguage();

  return (
    <section className="section-spacing" id="process">
      <Container>
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
            {t.process.eyebrow}
          </p>
          <h2 className="mt-4 font-heading text-[clamp(2.2rem,5vw,4rem)] font-bold">
            {t.process.title}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, idx) => (
            <Reveal key={step.title} delay={idx * 0.05}>
              <div className="glass-card relative h-full overflow-hidden rounded-[24px] p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_-40px_rgba(0,130,251,0.7)] before:absolute before:left-0 before:top-0 before:h-[2px] before:w-full before:bg-[#0082fb] before:content-['']">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0082fb]">
                  {stepIndexes[idx]}
                </span>
                <h3 className="mt-6 font-heading text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-white/60">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
