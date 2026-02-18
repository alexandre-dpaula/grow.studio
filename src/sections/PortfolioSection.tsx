"use client";

import Container from "@/layout/Container";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";

export default function PortfolioSection() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="section-spacing">
      <div
        className="relative h-[420px] overflow-hidden rounded-[28px] bg-[color:var(--bg-secondary)]"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(11,11,15,0.2), rgba(11,11,15,0.9)), url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 hero-overlay opacity-70" />
        <Container className="relative z-10 flex h-full flex-col justify-center px-7 sm:px-[8%]">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              {t.portfolio.eyebrow}
            </p>
            <h2 className="mt-4 font-heading text-[clamp(2.4rem,5vw,4.5rem)] font-bold">
              {t.portfolio.title}
            </h2>
          </Reveal>
        </Container>
      </div>
      <Container className="px-7 sm:px-[8%]">
        <Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.portfolio.cards.map((project) => (
              <div
                key={project.title}
                className="group relative h-full overflow-hidden rounded-[24px] border border-white/10 bg-[color:var(--card)] p-6 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_30px_80px_-50px_rgba(0,130,251,0.5)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0082fb]/18 via-transparent to-[#0064e0]/18 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-x-6 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-[#0082fb] to-[#0064e0]" />
                </div>
                <div className="relative z-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                    {project.category}
                  </p>
                  <h3 className="mt-5 font-heading text-2xl font-semibold">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/60">
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
