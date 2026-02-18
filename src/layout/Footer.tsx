"use client";

import Image from "next/image";
import Container from "@/layout/Container";
import BrandMark, { splitBrand } from "@/components/BrandMark";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  const brand = splitBrand(t.footer.tagline);

  return (
    <footer className="border-t border-white/5 py-10">
      <Container className="flex flex-wrap items-center justify-between gap-4 text-sm text-white/60">
        <span className="inline-flex items-center gap-1.5">
          <Image src="/icon-logo.svg" alt="Grow+ Studio logo" width={10} height={10} />
          {brand.hasBrand ? (
            <>
              {brand.prefix}
              <BrandMark className="text-white" />
              <span className="text-white/50">{brand.suffix}</span>
            </>
          ) : (
            <span className="text-white/50">{t.footer.tagline}</span>
          )}
        </span>
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
