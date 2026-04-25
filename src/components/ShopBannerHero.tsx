"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const WA = "5527998721786";

const slides = [
  {
    tag: "01",
    service: "Gravação de Cursos",
    headline: "Seu conhecimento merece uma produção à altura.",
    sub: "Transformamos o que você sabe em um curso profissional, com captação, edição e entrega pronta para vender.",
    cta: "Quero gravar meu curso",
    href: `https://wa.me/${WA}?text=${encodeURIComponent("Olá Alexandre Dpaula! Vi a Grow+Studio e quero transformar meu conhecimento em um curso profissional. Como funciona o processo de gravação?")}`,
    image: "/cursos.jpg",
  },
  {
    tag: "02",
    service: "Criação de Criativos",
    headline: "Criativo ruim custa caro. Criativo certo vende.",
    sub: "Peças visuais estratégicas para tráfego pago, redes sociais e campanhas. Feitas para parar o scroll e converter.",
    cta: "Quero criativos que convertem",
    href: `https://wa.me/${WA}?text=${encodeURIComponent("Olá Alexandre Dpaula! Preciso de criativos que realmente vendam para tráfego pago e redes sociais. Quero saber mais sobre o trabalho de vocês!")}`,
    image: "/criativos.jpg",
  },
  {
    tag: "03",
    service: "Páginas de Vendas",
    headline: "Uma página certa pode mudar seu faturamento este mês.",
    sub: "Páginas de vendas com estrutura persuasiva, copy profissional e design que guia o visitante direto para o botão de compra.",
    cta: "Quero minha página de vendas",
    href: `https://wa.me/${WA}?text=${encodeURIComponent("Olá Alexandre Dpaula! Quero uma página de vendas profissional para o meu produto. Como a Grow+Studio pode me ajudar?")}`,
    image: "/lp.jpg",
  },
];

export default function ShopBannerHero() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setCurrent((i) => (i + 1) % slides.length);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  function goTo(idx: number) {
    setDir(idx > current ? 1 : -1);
    setCurrent(idx);
  }

  const slide = slides[current];

  return (
    /* Safari: usar -webkit-fill-available via style inline para min-height */
    <section
      className="relative flex w-full flex-col overflow-hidden bg-[#141412]"
      style={{ minHeight: "100svh" }}
    >
      {/* Background image — crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slide.image}
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradiente mais denso em baixo para o copy respirar */}
          <div className="absolute inset-0 bg-linear-to-b from-[#141412]/70 via-[#141412]/60 to-[#141412]/92" />
        </motion.div>
      </AnimatePresence>

      {/* Glow laranja topo */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(244,123,79,0.13),transparent_60%)]" />

      {/* ── Tabs — sempre visíveis, scroll horizontal no mobile ── */}
      <div className="relative z-10 border-b border-white/10">
        <div className="flex w-full overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`relative flex shrink-0 flex-col gap-1 px-5 py-4 text-left transition-colors duration-200 sm:flex-1 sm:px-6 sm:py-5 ${
                i === current ? "text-[#f3efe7]" : "text-[#4a4845] hover:text-[#8a8680]"
              }`}
            >
              <span className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-[#f47b4f]/80">
                {s.tag}
              </span>
              <span className="whitespace-nowrap text-[0.75rem] font-bold uppercase leading-tight tracking-wide sm:text-[0.82rem]">
                {s.service}
              </span>
              {/* Barra ativa */}
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#f47b4f] transition-opacity duration-300 ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── Copy — centro vertical ── */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-8 pt-10 text-center sm:px-10 sm:pb-12 sm:pt-16 lg:px-16">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={current}
            custom={dir}
            initial={{ opacity: 0, y: dir * 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: dir * -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex w-full max-w-2xl flex-col items-center"
          >
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 rounded-full border border-[#f47b4f]/35 bg-[#f47b4f]/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-[#ffd8c7]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f47b4f]" />
              {slide.service}
            </span>

            {/* Headline — fluido, nunca vai estourar */}
            <h1 className="mt-5 w-full font-serif text-[clamp(1.75rem,6vw,4.5rem)] font-bold uppercase leading-[1.05] tracking-tight text-[#f3efe7]">
              {slide.headline}
            </h1>

            {/* Sub */}
            <p className="mt-4 w-full max-w-md text-[0.9rem] leading-[1.65] text-[#a9a59d] sm:text-[1rem]">
              {slide.sub}
            </p>

            {/* CTA */}
            <a
              href={slide.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-[#f47b4f] px-6 py-3.5 text-[0.88rem] font-bold uppercase tracking-wide text-[#1a1916] shadow-[0_8px_32px_rgba(244,123,79,0.35)] transition-all active:scale-95 hover:bg-[#f69069] sm:px-7 sm:py-4"
            >
              {slide.cta}
              <ArrowRight size={15} />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Progress bars — canto inferior ── */}
      <div className="relative z-10 flex w-full gap-1.5 px-6 pb-8 sm:px-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-0.75 flex-1 overflow-hidden rounded-full bg-white/15"
          >
            {i === current && (
              <motion.span
                key={current}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 8, ease: "linear" }}
                className="absolute inset-0 origin-left rounded-full bg-[#f47b4f]"
              />
            )}
            {i < current && (
              <span className="absolute inset-0 rounded-full bg-[#f47b4f]/45" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
