"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import Button from "@/components/Button";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";
import Container from "@/layout/Container";
import { motion } from "framer-motion";

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="absolute left-0 top-0 z-30 w-full"
    >
      <Container className="flex items-center justify-between py-6">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex h-4 w-4 items-center justify-center">
            <Image src="/icon-logo.svg" alt="Grow+ Studio logo" width={12} height={12} />
          </span>
          <BrandMark className="text-lg tracking-tight" />
        </div>
        <nav className="hidden items-center gap-10 text-sm font-medium text-white/70 md:flex">
          {t.nav.items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition-colors duration-300 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <div className="hidden md:block">
            <Button
              href="#contact"
              variant="secondary"
              icon={<ArrowUpRight size={16} />}
              className="hover:text-white"
            >
              {t.nav.contact}
            </Button>
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
