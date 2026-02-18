"use client";

import { PenTool, Sparkles, Video, Webhook } from "lucide-react";
import Container from "@/layout/Container";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";

const services = [
  {
    icon: Sparkles,
    index: "01",
  },
  {
    icon: PenTool,
    index: "02",
  },
  {
    icon: Video,
    index: "03",
  },
  {
    icon: Webhook,
    index: "04",
  },
];

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="section-spacing gradient-orbit">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
              {t.services.eyebrow}
            </p>
            <h2 className="mt-4 font-heading text-[clamp(2.2rem,5vw,4rem)] font-bold">
              {t.services.title}
            </h2>
          </Reveal>
          <Reveal>
            <p className="max-w-md text-sm text-white/70">
              {t.services.description}
            </p>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const copy = t.services.cards[idx];
            return (
              <Reveal key={service.index} delay={idx * 0.05}>
                <div className="group relative h-full rounded-[24px] border border-white/10 bg-[color:var(--card)] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-[0.3em] text-white/40">
                        {service.index}
                      </span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white/80 transition-all duration-300 group-hover:scale-110 group-hover:text-white">
                        <Icon size={22} />
                      </div>
                    </div>
                    <h3 className="mt-8 font-heading text-xl font-semibold">
                      {copy.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/60">
                      {copy.description}
                    </p>
                    <div className="pointer-events-none absolute inset-0 rounded-[23px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute inset-x-6 bottom-0 h-[2px] rounded-full bg-[#0082fb]" />
                    </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
