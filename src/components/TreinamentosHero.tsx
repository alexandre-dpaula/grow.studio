"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    slug: "crie-paginas",
    src: "/hf_20260314_230539_c5efb4e7-1371-4502-90d5-c2f4d6eee79e.jpeg",
    label: "Projetos Web",
    title: "Crie Projetos WEB em 5min",
    desc: "Sai com sua página no ar. Oferta estruturada, copy pronta e projeto publicado no mesmo dia.",
  },
  {
    slug: "proprio-comercial",
    src: "/hf_20260221_174057_4a7dbb61-3676-4c05-892e-3d61a5ffd0ef.jpeg",
    label: "Comercial",
    title: "Crie seu Próprio Comercial",
    desc: "Roteiro, gravação e edição no presencial. Você sai com o comercial finalizado e pronto para rodar.",
  },
  {
    slug: "ensaios-fotograficos",
    src: "/hf_20260315_104627_712f5a54-af82-4b0b-b968-a96480fee90a.jpeg",
    label: "Ensaios",
    title: "Crie Ensaios Fotográficos",
    desc: "Direção visual, estilo e geração com IA. Você sai com um ensaio completo pronto para feed e anúncio.",
  },
];

export default function TreinamentosHero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const t = setInterval(() => goTo((current + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [current]);

  function goTo(idx: number) {
    if (idx === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 280);
  }

  const slide = slides[current];

  return (
    <section className="relative isolate overflow-hidden border-b border-white/10">
      {/* Background images — all mounted, opacity transition */}
      {slides.map((s, i) => (
        <div
          key={s.slug}
          className="absolute inset-0 -z-10 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={s.src}
            alt={s.title}
            fill
            priority={i === 0}
            unoptimized
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(4,9,16,0.88)_10%,rgba(4,9,16,0.55)_50%,rgba(163,230,53,0.18)_100%)]" />
        </div>
      ))}

      <div className="mx-auto flex min-h-[64svh] w-full max-w-6xl flex-col items-center justify-center px-5 py-20 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-lime-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-lime-200">
          Treinamentos Presenciais
        </span>

        {/* Slide label */}
        <div
          className="mt-5 transition-all duration-300"
          style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(6px)" : "translateY(0)" }}
        >
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-lime-300/60">
            {slide.label}
          </p>
          <h1 className="mt-2 font-heading text-4xl font-semibold uppercase leading-[1.02] sm:text-5xl md:text-6xl">
            {slide.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/70 sm:text-lg">
            {slide.desc}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/treinamentos/${slide.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-lime-300 px-5 py-3 text-[0.85rem] font-bold uppercase tracking-wide text-[#03070d] transition-colors hover:bg-lime-200"
            >
              Ver este treinamento
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-lime-300" : "w-2 bg-white/25 hover:bg-white/45"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
