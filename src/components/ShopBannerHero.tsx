"use client";

import Image from "next/image";
import { ArrowDown, MousePointerClick } from "lucide-react";

const WHATSAPP_GROUP_URL =
  "https://chat.whatsapp.com/Jf0qePzQfURKwmML6gYC30?mode=gi_t";

export default function ShopBannerHero() {
  return (
    <section className="relative overflow-hidden border-b border-black/10 bg-[#f0ebe1]">
      <div className="mx-auto w-full max-w-[1820px] px-5 pb-0 pt-9 sm:px-8 sm:pb-0 sm:pt-12 lg:px-12 lg:pb-0 lg:pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
          <div className="mt-4 max-w-[700px] px-2 sm:mt-6 sm:px-4 lg:mt-8 lg:px-0">
            <h1 className="font-heading text-[clamp(2rem,8.2vw,3.4rem)] leading-[0.97] tracking-tight text-[#0e0e0d]">
              Domine a <span className="whitespace-nowrap text-[#d97757]">melhor IA</span>
              <br />
              para negócios
            </h1>

            <div className="mt-4 flex items-center gap-3 sm:gap-4">
              <Image
                src="/claude-logo.svg"
                alt="Claude logo"
                width={88}
                height={88}
                className="h-14 w-14 shrink-0 sm:h-12 sm:w-12 lg:h-[62px] lg:w-[62px]"
              />
              <p className="font-serif text-[clamp(3.6rem,14vw,5rem)] font-semibold leading-none tracking-tight text-[#0f0f0f]">
                Claude
              </p>
            </div>

            <p className="mt-6 max-w-[31ch] text-[clamp(1rem,4.9vw,1.35rem)] leading-[1.14] text-[#171715]">
              Não é um curso de IA genérico. É um treinamento prático para você aprender{" "}
              <span className="font-semibold uppercase">
                a ferramenta que está substituindo equipes inteiras dentro de empresas.
              </span>
            </p>

            <div className="mt-7 flex w-full max-w-[560px] flex-col gap-3">
              <a
                href={WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-[88%] items-center justify-center gap-2 border border-[#df7b5b] bg-[#df7b5b] px-3.5 py-2 text-[0.88rem] font-medium text-[#ffe2d3] transition-colors hover:bg-[#d86e4d] lg:w-[78%] lg:px-4 lg:py-2.5 lg:text-[1.05rem]"
              >
                <MousePointerClick size={18} aria-hidden="true" />
                Garantir minha vaga
              </a>

              <a
                href={WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-[88%] items-center justify-center gap-2 border-2 border-[#141412] bg-transparent px-3.5 py-2 text-[0.88rem] font-medium text-[#141412] transition-colors hover:bg-black/5 lg:w-[78%] lg:px-4 lg:py-2.5 lg:text-[1.05rem]"
              >
                O que vou aprender
                <ArrowDown size={16} />
              </a>
            </div>
          </div>

          <div
            className="relative min-h-[360px] overflow-hidden sm:min-h-[460px] lg:min-h-[700px]"
            aria-label="Visual do treinamento"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover object-center"
            >
              <source
                src="/hf_20260502_092738_707f17ce-8a84-4e7f-9232-23174624414a.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
