"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import Button from "@/components/Button";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";
import Container from "@/layout/Container";

export default function Navbar() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="absolute left-0 top-0 z-30 w-full"
    >
      <Container className="py-4 md:py-6">
        <div className="rounded-full border border-white/10 bg-black/26 px-3 py-2.5 backdrop-blur-xl md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex h-4 w-4 items-center justify-center">
                <Image src="/icon-logo.svg" alt="Grow+ Studio logo" width={12} height={12} />
              </span>
              <BrandMark className="text-base tracking-tight sm:text-lg" />
            </div>
            <nav className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
              {t.nav.items.map((item) => {
                const isExternal = !item.href.startsWith("#");
                const isHighlight = "highlight" in item && item.highlight;
                const NavLink = isExternal ? Link : "a";
                return (
                  <NavLink
                    key={item.label}
                    href={item.href}
                    className={
                      isHighlight
                        ? "rounded-full bg-[#f47b4f] px-3.5 py-1.5 text-[0.8rem] font-semibold text-[#1f1f1d] transition-colors hover:bg-[#f69069]"
                        : "transition-colors duration-300 hover:text-white"
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="md:hidden">
                <LanguageToggle iconOnly />
              </div>
              <div className="hidden md:block">
                <LanguageToggle />
              </div>
              <button
                type="button"
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((current) => !current)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/82 transition-all duration-300 hover:bg-white/12 md:hidden"
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
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
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden"
            >
              <div className="mt-3 rounded-[28px] border border-white/10 bg-[rgba(11,11,15,0.92)] p-4 shadow-[0_30px_100px_-50px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                <nav className="flex flex-col gap-2">
                  {t.nav.items.map((item) => {
                    const isExternal = !item.href.startsWith("#");
                    const isHighlight = "highlight" in item && item.highlight;
                    const NavLink = isExternal ? Link : "a";
                    return (
                      <NavLink
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={
                          isHighlight
                            ? "rounded-2xl bg-[#f47b4f] px-4 py-3 text-base font-semibold text-[#1f1f1d] transition-all duration-300 hover:bg-[#f69069]"
                            : "rounded-2xl border border-transparent bg-white/3 px-4 py-3 text-base font-medium text-white/82 transition-all duration-300 hover:border-white/10 hover:bg-white/6"
                        }
                      >
                        {item.label}
                      </NavLink>
                    );
                  })}
                </nav>
                <div className="mt-4 border-t border-white/8 pt-4">
                  <Button
                    href="#contact"
                    variant="secondary"
                    icon={<ArrowUpRight size={16} />}
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-white"
                  >
                    {t.nav.contact}
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
}
