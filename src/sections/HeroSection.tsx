"use client";

import { ArrowRight, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import BrandMark from "@/components/BrandMark";
import { useLanguage } from "@/components/LanguageProvider";
import Container from "@/layout/Container";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-32 md:pt-40"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-0 bg-[url('/mobile.jpg')] bg-cover bg-[position:center_70%] md:bg-[url('/desktop.jpg')] md:bg-[position:center_100%]"
      />
      <Container className="relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60"
          >
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="mt-6 mb-6 font-heading text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[0.95]"
          >
            <BrandMark className="text-white" />
            <span className="mt-2 block text-[clamp(1.6rem,3.4vw,2.7rem)] font-semibold text-white/90">
              AGÊNCIA CRIATIVA &amp;
              <span className="block">ESTÚDIO DE CONTEÚDO</span>
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mt-8 mb-6 max-w-2xl text-lg text-white/75"
          >
            Construímos presença digital, conteúdo cinematográfico e
            <span className="block">sistemas escaláveis para marcas prontas para crescer.</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              href="#contact"
              icon={<ArrowRight size={16} />}
              className="min-w-[220px]"
            >
              {t.hero.ctaPrimary}
            </Button>
            <Button
              href="#projects"
              variant="secondary"
              icon={<PlayCircle size={16} />}
              className="min-w-[220px]"
            >
              {t.hero.ctaSecondary}
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
