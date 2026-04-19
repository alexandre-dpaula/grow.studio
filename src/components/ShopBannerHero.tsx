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
    sub: "Transformamos o que você sabe em um curso profissional — com captação, edição e entrega pronta para vender.",
    cta: "Quero gravar meu curso",
    href: `https://wa.me/${WA}?text=${encodeURIComponent("Olá Alexandre Dpaula! Vi a Grow+Studio e quero transformar meu conhecimento em um curso profissional. Como funciona o processo de gravação?")}`,
    image: "/cursos.jpg",
  },
  {
    tag: "02",
    service: "Criação de Criativos",
    headline: "Criativo ruim custa caro. Criativo certo vende.",
    sub: "Peças visuais estratégicas para tráfego pago, redes sociais e campanhas — feitas para parar o scroll e converter.",
    cta: "Quero criativos que convertem",
    href: `https://wa.me/${WA}?text=${encodeURIComponent("Olá Alexandre Dpaula! Preciso de criativos que realmente vendam — para tráfego pago e redes sociais. Quero saber mais sobre o trabalho de vocês!")}`,
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
    <section className="relative w-full overflow-hidden bg-[#141412] min-h-[90vh] flex flex-col">

      {/* Background image — crossfade por slide */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slide.image}
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          {/* overlay escuro para legibilidade */}
          <div className="absolute inset-0 bg-[#141412]/75" />
        </motion.div>
      </AnimatePresence>

      {/* Static glow */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(244,123,79,0.14),transparent_65%)]" />

      {/* ── Tabs de serviço ── */}
      <div className="relative z-10 border-b border-white/8">
        <div className="mx-auto flex w-full max-w-285 px-4 sm:px-6 lg:px-8">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`group relative flex flex-1 flex-col items-start gap-1 px-4 py-5 text-left transition-colors md:px-6 md:py-6 ${
                i === current ? "text-[#f3efe7]" : "text-[#5a5650] hover:text-[#9f9b94]"
              }`}
            >
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#f47b4f] opacity-70">
                {s.tag}
              </span>
              <span className="text-[0.8rem] font-bold uppercase tracking-wide leading-tight md:text-[0.9rem]">
                {s.service}
              </span>
              {/* Active bar */}
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#f47b4f] transition-all duration-300 ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── Copy central ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-285 flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={current}
            custom={dir}
            initial={{ opacity: 0, y: dir * 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: dir * -30 }}
            transition={{ duration: 0.42, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="max-w-4xl font-serif text-[clamp(2.6rem,6vw,5.2rem)] font-bold uppercase leading-none tracking-tight text-[#f3efe7]">
              {slide.headline}
            </h1>

            <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-[#a9a59d]">
              {slide.sub}
            </p>

            <a
              href={slide.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#f47b4f] px-7 py-4 text-[0.9rem] font-bold uppercase tracking-wide text-[#1a1916] shadow-[0_8px_32px_rgba(244,123,79,0.35)] transition-all hover:bg-[#f69069] hover:shadow-[0_8px_40px_rgba(244,123,79,0.5)] hover:-translate-y-0.5"
            >
              {slide.cta}
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Progress bar ── */}
      <div className="relative z-10 flex w-full gap-1.5 px-4 pb-6 sm:px-6 lg:px-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10"
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
              <span className="absolute inset-0 rounded-full bg-[#f47b4f]/40" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
