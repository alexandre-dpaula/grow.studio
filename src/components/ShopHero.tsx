"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, BadgeCheck, Sparkles, Code2, Users, BookOpen, Layers, Play, Pause } from "lucide-react";

const slides = [
  {
    icon: Users,
    tag: "Comunidade",
    title: "Ambiente exclusivo para alunos",
    desc: "Converse, tire dúvidas e evolua junto com quem está no mesmo caminho que você.",
  },
  {
    icon: Sparkles,
    tag: "Prompts",
    title: "Pack de prompts atualizado",
    desc: "Prompts prontos para criar conteúdo, vender e atender — direto no ChatGPT.",
  },
  {
    icon: BookOpen,
    tag: "Materiais",
    title: "eBooks e insumos do curso",
    desc: "Checklists, roteiros e guias práticos para você aplicar o que aprendeu.",
  },
  {
    icon: Code2,
    tag: "Templates",
    title: "Projetos HTML prontos",
    desc: "Estruturas de página que você adapta e entrega para clientes em horas.",
  },
  {
    icon: Layers,
    tag: "Kit de Contexto",
    title: "Nunca explique seu negócio de novo",
    desc: "Preencha uma vez e cole no início de qualquer conversa com a IA.",
  },
];

// Podcast — único episódio, substitua src pela URL real do áudio
const PODCAST_SRC = "/treinamento_ia.m4a";

function WaveformBars({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-end gap-[3px] h-5">
      {[3, 6, 9, 5, 11, 7, 4, 8, 6, 10, 5, 7].map((h, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-full bg-violet-400 origin-bottom transition-all ${
            playing ? "animate-pulse" : "opacity-40"
          }`}
          style={{
            height: `${h * 2}px`,
            animationDelay: `${i * 80}ms`,
            animationDuration: `${600 + (i % 3) * 200}ms`,
          }}
        />
      ))}
    </div>
  );
}

function PodcastCard() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("--:--");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(fmt(audio.currentTime));
      }
    };
    const onLoaded = () => setDuration(fmt(audio.duration));
    const onEnded = () => { setPlaying(false); setProgress(0); setCurrentTime("0:00"); };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  function fmt(s: number) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().catch(() => {}); setPlaying(true); }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  }

  return (
    <div className="relative flex flex-col justify-between overflow-hidden border-t border-white/8 bg-[linear-gradient(135deg,rgba(139,92,246,0.10),rgba(139,92,246,0.02))] p-8 lg:border-l lg:border-t-0 lg:p-10">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.12),transparent_65%)]" />

      {/* Top — categoria + ícone */}
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-widest text-violet-300">
            {/* Mic icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
            Treinamento Presencial
          </span>

          {/* Waveform ao lado */}
          <WaveformBars playing={playing} />
        </div>

        {/* Capa / arte do episódio */}
        <div className="mt-6 flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <div className="h-16 w-16 rounded-2xl border border-violet-400/25 bg-[linear-gradient(135deg,rgba(139,92,246,0.35),rgba(99,60,180,0.55))] shadow-[0_0_24px_rgba(139,92,246,0.25)]" />
            {/* Ícone centralizado na capa */}
            <div className="absolute inset-0 flex items-center justify-center text-violet-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </div>
          </div>

          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-violet-400">
              Episódio exclusivo
            </p>
            <h2 className="mt-1 font-serif text-[clamp(1.2rem,2vw,1.6rem)] font-bold uppercase leading-tight text-[#f3efe7]">
              IA Sem Limites
            </h2>
            <p className="mt-1 text-[0.75rem] text-[#a9a59d]">
              Grow Podcast · {duration}
            </p>
          </div>
        </div>
      </div>

      {/* Player */}
      <div className="relative mt-8">
        {/* Barra de progresso */}
        <div
          className="group mb-4 h-1.5 w-full cursor-pointer rounded-full bg-white/10 hover:h-2 transition-all duration-150"
          onClick={seek}
        >
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#7c3aed,#a78bfa)] transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Tempo + botão */}
        <div className="flex items-center justify-between">
          <span className="text-[0.68rem] tabular-nums text-[#a9a59d]">
            {currentTime} / {duration}
          </span>

          <button
            onClick={togglePlay}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7c3aed,#6d28d9)] text-white shadow-[0_4px_20px_rgba(124,58,237,0.45)] transition-all hover:scale-105 hover:shadow-[0_4px_28px_rgba(124,58,237,0.6)]"
            aria-label={playing ? "Pausar" : "Reproduzir"}
          >
            {playing ? <Pause size={15} /> : <Play size={15} className="translate-x-px" />}
          </button>

          <span className="text-[0.68rem] text-[#a9a59d]">
            {playing ? "Ao vivo" : "Ouça agora"}
          </span>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} src={PODCAST_SRC} preload="none" />
    </div>
  );
}

export default function ShopHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(i => (i + 1) % slides.length), 3200);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <section className="mx-auto w-full max-w-[1140px] px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-14 lg:px-8 lg:pt-16">
      <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_30px_120px_-75px_rgba(0,0,0,0.95)]">
        <div className="grid lg:grid-cols-3 lg:min-h-[360px]">

          {/* LEFT — Slider */}
          <div className="relative flex flex-col justify-between overflow-hidden border-b border-white/8 bg-[linear-gradient(135deg,rgba(244,123,79,0.12),rgba(244,123,79,0.03))] p-8 lg:border-b-0 lg:border-r lg:p-10">
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(244,123,79,0.10),transparent_60%)]" />

            {/* Slide content */}
            <div className="relative min-h-[160px]">
              <span className="inline-block rounded-full border border-[#f47b4f]/40 bg-[#f47b4f]/12 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-[#ffd8c7]">
                {slide.tag}
              </span>

              <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#f47b4f]/30 bg-[#f47b4f]/10 text-[#ffc4a8]">
                <Icon size={22} />
              </div>

              <h2 className="mt-5 font-serif text-[clamp(1.4rem,2.2vw,1.9rem)] font-bold uppercase leading-tight text-[#f3efe7]">
                {slide.title}
              </h2>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-[#a9a59d]">
                {slide.desc}
              </p>
            </div>

            {/* Dots */}
            <div className="relative mt-8 flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-[#f47b4f]"
                      : "w-1.5 bg-white/20 hover:bg-white/35"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CENTER — Copy + CTA */}
          <div className="flex flex-col justify-center border-b border-white/8 p-8 lg:border-b-0 lg:border-r lg:p-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f47b4f]/45 bg-[#f47b4f]/16 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#ffd8c7]">
              <BadgeCheck size={13} />
              Grow Shop
            </span>

            <h1 className="mt-5 font-serif text-[clamp(1.8rem,3.2vw,2.8rem)] font-bold uppercase leading-[1] text-[#f3efe7]">
              Tudo que você precisa para vender com IA.
            </h1>

            <p className="mt-4 text-[0.92rem] leading-relaxed text-[#a9a59d]">
              Templates prontos, materiais do curso e comunidade exclusiva — em um só lugar.
            </p>

            <div className="mt-8">
              <a
                href="https://checkout.infinitepay.io/qt-sala01-stageone/3obvvPOUZV"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f47b4f] px-5 py-3 text-[0.85rem] font-bold uppercase tracking-wide text-[#1f1f1d] transition-colors hover:bg-[#f69069]"
              >
                Acessar comunidade
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* RIGHT — Podcast */}
          <PodcastCard />

        </div>
      </div>
    </section>
  );
}
