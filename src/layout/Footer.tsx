"use client";

import Image from "next/image";
import Container from "@/layout/Container";
import BrandMark, { splitBrand } from "@/components/BrandMark";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  const brand = splitBrand(t.footer.tagline);
  const tagline = brand.hasBrand
    ? brand.suffix.trimStart() || t.footer.tagline
    : t.footer.tagline;

  return (
    <footer className="border-t border-white/5 py-6 md:py-10">
      <Container className="flex flex-col items-center gap-2 text-center text-sm text-white/60 md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-1 md:flex-row md:items-center md:gap-3">
          <span className="inline-flex items-center gap-1.5">
            <Image src="/icon-logo.svg" alt="GROW +STUDIO logo" width={10} height={10} />
            <BrandMark className="text-white" />
          </span>
          <span className="text-white/50">{tagline}</span>
        </div>
        <span className="inline-flex items-center gap-2">
          <span className="flex items-center gap-2">
            <Image src="/pt.svg" alt="Brasil" width={18} height={18} />
            <Image src="/en.svg" alt="United States" width={18} height={18} />
          </span>
        </span>
      </Container>
    </footer>
  );
}
