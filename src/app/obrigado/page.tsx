import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const WHATSAPP_GROUP_URL =
  "https://chat.whatsapp.com/Jf0qePzQfURKwmML6gYC30?mode=gi_t";

export const metadata: Metadata = {
  title: "Obrigado | GrowS",
  description:
    "Obrigado por entrar no treinamento. Acesse o grupo oficial do WhatsApp.",
};

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen bg-[#03070d] text-white">
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_20%_10%,rgba(163,230,53,0.2),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(74,222,128,0.14),transparent_30%),linear-gradient(180deg,#03070d_0%,#040911_100%)]" />

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hf_20260313_144236_d2f1d35b-e783-4287-8d1b-d02c1276a75e.jpeg"
            alt="Obrigado pelo treinamento"
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,13,0.52)_0%,rgba(3,7,13,0.78)_52%,rgba(3,7,13,0.94)_100%)]" />
        </div>

        <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-5 py-16 text-center">
          <div className="w-full">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/30 bg-lime-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-lime-200">
                <CheckCircle2 size={14} />
                Compra Confirmada
              </span>
            </Reveal>

            <Reveal delay={0.08} className="mt-5">
              <h1 className="font-heading text-3xl font-semibold uppercase leading-[1.02] sm:text-5xl">
                Obrigado pela inscrição
              </h1>
            </Reveal>

            <Reveal delay={0.16} className="mx-auto mt-5 max-w-2xl">
              <p className="text-white/75">
                Seu próximo passo é entrar no grupo oficial para receber avisos,
                materiais e orientações do treinamento.
              </p>
            </Reveal>

            <Reveal delay={0.24} className="mt-8">
              <a
                href={WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-200 sm:w-auto"
              >
                <WhatsAppIcon size={16} />
                Acessar o grupo de WhatsApp
                <ArrowRight size={16} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
