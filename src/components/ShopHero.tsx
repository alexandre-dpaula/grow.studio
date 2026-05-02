"use client";

import Image from "next/image";
import { ArrowRight, BadgeCheck } from "lucide-react";

const COMMUNITY_PRINT_CARD_IMAGE = "/comunidade-print.png";

export default function ShopHero() {
  return (
    <section className="mx-auto w-full max-w-285 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_30px_120px_-75px_rgba(0,0,0,0.95)] sm:rounded-3xl">
        <div className="grid lg:grid-cols-2">

          {/* LEFT — Community Print (Full Image) */}
          <div className="relative overflow-hidden border-b border-white/8 bg-[#1a1a18] lg:border-b-0 lg:border-r">
            <div className="relative min-h-[300px] w-full sm:min-h-[360px] lg:h-full lg:min-h-[440px]">
              <Image
                src={COMMUNITY_PRINT_CARD_IMAGE}
                alt="Preview da comunidade"
                fill
                className="object-cover object-left"
              />
            </div>
          </div>

          {/* CENTER — Copy + CTA */}
          <div className="flex flex-col justify-center gap-6 p-6 sm:p-8 lg:p-10">
            <div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f47b4f]/45 bg-[#f47b4f]/16 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#ffd8c7]">
                <BadgeCheck size={13} />
                Grow Shop
              </span>
              <h1 className="mt-4 font-serif text-[clamp(1.6rem,4vw,2.6rem)] font-bold uppercase leading-none text-[#f3efe7]">
                Tudo que você precisa para vender com IA.
              </h1>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-[#a9a59d]">
                Templates prontos, materiais do curso e comunidade exclusiva em um só lugar.
              </p>
            </div>
            <a
              href="https://checkout.infinitepay.io/qt-sala01-stageone/3obvvPOUZV"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f47b4f] px-5 py-3.5 text-[0.88rem] font-bold uppercase tracking-wide text-[#1f1f1d] transition-colors active:scale-95 hover:bg-[#f69069] sm:w-auto"
            >
              Acessar comunidade
              <ArrowRight size={15} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
