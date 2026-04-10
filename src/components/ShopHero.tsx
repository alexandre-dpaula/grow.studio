"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Sparkles, Code2, Users, BookOpen, Layers } from "lucide-react";

const slides = [
  {
    icon: Users,
    tag: "Comunidade",
    title: "Ambiente exclusivo para alunos",
    desc: "Converse, tire dúvidas e evolua junto com quem está no mesmo caminho que você.",
  },
  {
    icon: Sparkles,
    tag: "Prompts",
    title: "Pack de prompts atualizado",
    desc: "Prompts prontos para criar conteúdo, vender e atender — direto no ChatGPT.",
  },
  {
    icon: BookOpen,
    tag: "Materiais",
    title: "eBooks e insumos do curso",
    desc: "Checklists, roteiros e guias práticos para você aplicar o que aprendeu.",
  },
  {
    icon: Code2,
    tag: "Templates",
    title: "Projetos HTML prontos",
    desc: "Estruturas de página que você adapta e entrega para clientes em horas.",
  },
  {
    icon: Layers,
    tag: "Kit de Contexto",
    title: "Nunca explique seu negócio de novo",
    desc: "Preencha uma vez e cole no início de qualquer conversa com a IA.",
  },
];

export default function ShopHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(i => (i + 1) % slides.length), 3200);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <section className="mx-auto w-full max-w-[1140px] px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-14 lg:px-8 lg:pt-16">
      <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_30px_120px_-75px_rgba(0,0,0,0.95)]">
        <div className="grid lg:grid-cols-2 lg:min-h-[360px]">

          {/* LEFT — Slider */}
          <div className="relative flex flex-col justify-between overflow-hidden border-b border-white/8 bg-[linear-gradient(135deg,rgba(244,123,79,0.12),rgba(244,123,79,0.03))] p-8 lg:border-b-0 lg:border-r lg:p-10">
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(244,123,79,0.10),transparent_60%)]" />

            {/* Slide content */}
            <div className="relative min-h-[160px]">
              <span className="inline-block rounded-full border border-[#f47b4f]/40 bg-[#f47b4f]/12 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-[#ffd8c7]">
                {slide.tag}
              </span>

              <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#f47b4f]/30 bg-[#f47b4f]/10 text-[#ffc4a8]">
                <Icon size={22} />
              </div>

              <h2 className="mt-5 font-serif text-[clamp(1.4rem,2.2vw,1.9rem)] font-bold uppercase leading-tight text-[#f3efe7]">
                {slide.title}
              </h2>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-[#a9a59d]">
                {slide.desc}
              </p>
            </div>

            {/* Dots */}
            <div className="relative mt-8 flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-[#f47b4f]"
                      : "w-1.5 bg-white/20 hover:bg-white/35"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — Copy + CTA */}
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f47b4f]/45 bg-[#f47b4f]/16 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#ffd8c7]">
              <BadgeCheck size={13} />
              Grow Shop
            </span>

            <h1 className="mt-5 font-serif text-[clamp(1.8rem,3.2vw,2.8rem)] font-bold uppercase leading-[1] text-[#f3efe7]">
              Tudo que você precisa para vender com IA.
            </h1>

            <p className="mt-4 text-[0.92rem] leading-relaxed text-[#a9a59d]">
              Templates prontos, materiais do curso e comunidade exclusiva — em um só lugar.
            </p>

            <div className="mt-8">
              <a
                href="https://checkout.infinitepay.io/qt-sala01-stageone/3obvvPOUZV"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f47b4f] px-5 py-3 text-[0.85rem] font-bold uppercase tracking-wide text-[#1f1f1d] transition-colors hover:bg-[#f69069]"
              >
                Acessar comunidade
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
