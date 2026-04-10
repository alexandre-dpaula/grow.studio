"use client";

import Image from "next/image";
import Container from "@/layout/Container";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";

export default function PortfolioSection() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="section-spacing">
      <div className="relative h-90 overflow-hidden rounded-3xl bg-(--bg-secondary) sm:h-105 sm:rounded-[28px] lg:h-105">
        <Image
          src="/hf_20260313_144236_d2f1d35b-e783-4287-8d1b-d02c1276a75e.jpeg"
          alt="Grow+ Studio portfolio background"
          fill
          sizes="100vw"
          unoptimized
          className="object-cover object-[50%_42%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(11,11,15,0.24),rgba(11,11,15,0.9))]" />
        <div className="absolute inset-0 hero-overlay opacity-70" />
        <Container className="relative z-10 flex h-full flex-col justify-end px-5 pb-7 sm:justify-center sm:px-6 sm:pb-0 lg:px-[8%]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70 sm:text-sm sm:tracking-[0.3em]">
              {t.portfolio.eyebrow}
            </p>
            <h2 className="section-title mt-3 font-heading text-[clamp(2rem,10vw,4.5rem)] font-bold sm:mt-4">
              {t.portfolio.title}
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] text-white/72 sm:mt-5 sm:text-base">
              {t.portfolio.description}
            </p>
          </Reveal>
        </Container>
      </div>
      <Container>
        <Reveal>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.portfolio.cards.map((project) => (
              <div
                key={project.title}
                className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-(--card) p-5 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_30px_80px_-50px_rgba(0,130,251,0.5)] sm:rounded-3xl sm:p-6"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[#0082fb]/18 via-transparent to-[#0064e0]/18 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-x-6 bottom-0 h-0.5 rounded-full bg-linear-to-r from-[#0082fb] to-[#0064e0]" />
                </div>
                <div className="relative z-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                    {project.category}
                  </p>
                  <h3 className="card-title mt-4 font-heading text-[1.35rem] font-semibold sm:mt-5 sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-[15px] text-white/60 sm:text-sm">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
