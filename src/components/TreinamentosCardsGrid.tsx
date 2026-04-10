import Link from "next/link";
import Image from "next/image";
import {
  Camera,
  Clapperboard,
  MonitorSmartphone,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { TREINAMENTOS } from "@/data/treinamentos";

type TreinamentosCardsGridProps = {
  withReveal?: boolean;
};

const iconBySlug: Record<string, LucideIcon> = {
  "crie-paginas": MonitorSmartphone,
  "proprio-comercial": Clapperboard,
  "ensaios-fotograficos": Camera,
};

const cardHeroBySlug: Record<
  string,
  { src: string; alt: string; objectPosition?: string }
> = {
  "crie-paginas": {
    src: "/hf_20260314_230539_c5efb4e7-1371-4502-90d5-c2f4d6eee79e.jpeg",
    alt: "Treinamento para criar páginas de vendas com IA",
    objectPosition: "50% 35%",
  },
  "proprio-comercial": {
    src: "/hf_20260221_174057_4a7dbb61-3676-4c05-892e-3d61a5ffd0ef.jpeg",
    alt: "Treinamento para criar comerciais com IA",
    objectPosition: "50% 35%",
  },
  "ensaios-fotograficos": {
    src: "/hf_20260315_104627_712f5a54-af82-4b0b-b968-a96480fee90a.jpeg",
    alt: "Treinamento para criar ensaios fotográficos com IA",
    objectPosition: "50% 30%",
  },
};

export default function TreinamentosCardsGrid({
  withReveal = true,
}: TreinamentosCardsGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {TREINAMENTOS.map((treinamento, index) => {
        const Icon = iconBySlug[treinamento.slug] ?? MonitorSmartphone;
        const cardHero = cardHeroBySlug[treinamento.slug];

        const card = (
          <article className="h-full">
            <figure className="relative aspect-video overflow-hidden rounded-2xl border border-white/12 bg-[#171715] shadow-[0_24px_70px_-40px_rgba(0,0,0,0.9)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-lime-300/35">
              {cardHero ? (
                <>
                  <Image
                    src={cardHero.src}
                    alt={cardHero.alt}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    style={{ objectPosition: cardHero.objectPosition }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,12,0.12)_0%,rgba(4,8,12,0.52)_100%)]" />
                </>
              ) : null}

              <span className="absolute left-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-lime-300/35 bg-lime-300/15 text-lime-200 backdrop-blur-[2px]">
                <Icon size={16} />
              </span>
            </figure>

            <div className="mt-3 px-1">
              <h2 className="text-[0.95rem] font-semibold uppercase leading-tight text-white">
                {treinamento.title}
              </h2>
              <p className="mt-1.5 text-[0.78rem] leading-[1.5] text-white/72">
                {treinamento.cardDescription}
              </p>
            </div>
          </article>
        );

        if (!withReveal) {
          return (
            <Link
              key={treinamento.slug}
              href={`/treinamentos/${treinamento.slug}`}
              className="group block h-full"
            >
              {card}
            </Link>
          );
        }

        return (
          <Reveal key={treinamento.slug} delay={index * 0.06}>
            <Link
              href={`/treinamentos/${treinamento.slug}`}
              className="group block h-full"
            >
              {card}
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
