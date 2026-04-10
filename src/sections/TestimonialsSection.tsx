"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import Container from "@/layout/Container";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";

function getYouTubeEmbedUrl(url: string) {
  if (!url) {
    return null;
  }

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      const videoId = parsed.pathname.slice(1);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        const videoId = parsed.searchParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      if (parsed.pathname.startsWith("/embed/")) {
        return `https://www.youtube.com${parsed.pathname}`;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollRef.current;

    if (!scroller) {
      return;
    }

    const updateActiveIndex = () => {
      if (window.innerWidth >= 768) {
        setActiveIndex(0);
        return;
      }

      const cards = Array.from(
        scroller.querySelectorAll<HTMLElement>("[data-testimonial-card]")
      );

      if (!cards.length) {
        return;
      }

      const viewportCenter = scroller.scrollLeft + scroller.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    let isTicking = false;

    const handleScroll = () => {
      if (isTicking) {
        return;
      }

      isTicking = true;
      window.requestAnimationFrame(() => {
        updateActiveIndex();
        isTicking = false;
      });
    };

    updateActiveIndex();

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [t.testimonials.cards.length]);

  return (
    <section id="testimonials" className="overflow-hidden section-spacing">
      <Container className="relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50 sm:text-sm sm:tracking-[0.3em]">
              {t.testimonials.eyebrow}
            </p>
            <h2 className="section-title mt-3 font-heading text-[clamp(2rem,10vw,4rem)] font-bold sm:mt-4">
              {t.testimonials.title}
            </h2>
          </Reveal>
          <Reveal>
            <p className="max-w-xl text-[15px] text-white/68 sm:text-sm">
              {t.testimonials.description}
            </p>
          </Reveal>
        </div>

        <div className="relative mt-8 sm:mt-10 md:mt-12">
          <div
            ref={scrollRef}
            className="hide-scrollbar -mx-5 overflow-x-auto px-5 md:mx-0 md:overflow-visible md:px-0"
          >
            <div className="grid auto-cols-[84%] grid-flow-col gap-4 pr-8 snap-x snap-mandatory md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:gap-6 md:pr-0 lg:grid-cols-3 xl:grid-cols-5">
          {t.testimonials.cards.map((card, index) => {
            const embedUrl = getYouTubeEmbedUrl(card.videoUrl);

            return (
              <div
                key={card.label}
                data-testimonial-card
                className={`snap-start transition-[opacity,transform] duration-300 md:snap-none md:opacity-100 ${
                  activeIndex === index ? "opacity-100" : "opacity-[0.42]"
                }`}
              >
                <article className="group relative aspect-[9/16] overflow-hidden rounded-[24px] border border-white/10 bg-[rgba(11,11,15,0.82)] shadow-soft sm:rounded-[28px]">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={`${card.label} video`}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <Image
                        src={card.poster}
                        alt={card.name}
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 20vw"
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,15,0.15)_0%,rgba(11,11,15,0.08)_34%,rgba(11,11,15,0.92)_100%)]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_24px_80px_-40px_rgba(255,255,255,0.65)] backdrop-blur-xl transition-transform duration-300 group-hover:scale-105">
                          <Play className="ml-1" size={26} />
                        </div>
                      </div>
                    </>
                  )}

                </article>
                <div className="px-1 pt-3">
                  <p className="font-heading text-lg font-semibold uppercase tracking-[0.06em] leading-[1.02] text-white">
                    {card.name}
                  </p>
                  {card.role ? (
                    <p className="mt-1 text-sm leading-[1.08] text-white/56">{card.role}</p>
                  ) : null}
                </div>
              </div>
            );
          })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
