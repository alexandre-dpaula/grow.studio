"use client";

import { Compass, Globe, Megaphone, PenTool, Video } from "lucide-react";
import Container from "@/layout/Container";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";

const serviceIcons = [Compass, PenTool, Video, Globe, Megaphone];

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative overflow-hidden section-spacing">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,12,0.84)_0%,rgba(8,8,12,0.74)_34%,rgba(8,8,12,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,130,251,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%)]" />
      </div>
      <Container className="relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6">
          <Reveal className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50 sm:text-sm sm:tracking-[0.3em]">
              {t.services.eyebrow}
            </p>
            <h2 className="section-title mt-3 font-heading text-[clamp(2rem,10vw,4rem)] font-bold sm:mt-4">
              {t.services.title}
            </h2>
          </Reveal>
          <Reveal>
            <p className="max-w-md text-[15px] text-white/70 sm:text-sm">
              {t.services.description}
            </p>
          </Reveal>
        </div>
        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {t.services.cards.map((service, idx) => {
            const Icon = serviceIcons[idx] ?? Compass;
            return (
              <Reveal key={service.title} delay={idx * 0.05}>
                <div className="group relative h-full rounded-[22px] border border-white/10 bg-[rgba(11,11,15,0.72)] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-white/20 sm:rounded-[24px] sm:p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-[0.3em] text-white/40">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white/80 transition-all duration-300 group-hover:scale-110 group-hover:text-white sm:h-12 sm:w-12">
                        <Icon size={22} />
                      </div>
                    </div>
                    <h3 className="card-title mt-6 font-heading text-[1.2rem] font-semibold sm:mt-8 sm:text-xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[15px] text-white/60 sm:text-sm">
                      {service.description}
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
