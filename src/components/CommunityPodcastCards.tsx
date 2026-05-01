"use client";

import {
  ArrowLeft,
  Info,
  List,
  Pause,
  Play,
  Plus,
  Radio,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type PodcastEpisode = {
  id: string;
  title: string;
  description: string;
  dateLabel: string;
  durationLabel: string;
  audioUrl?: string;
  isComingSoon?: boolean;
};

type PodcastShow = {
  id: string;
  title: string;
  author: string;
  category: string;
  frequency: string;
  description: string;
  rating: string;
  followers: string;
  coverImage?: string;
  coverGradient: string;
  episodes: PodcastEpisode[];
};

type Section = {
  title: string;
  showIds: string[];
};

const HERO_IMAGE = "/hf_20260314_230539_c5efb4e7-1371-4502-90d5-c2f4d6eee79e.jpeg";

const PODCAST_SHOWS: PodcastShow[] = [
  {
    id: "ia-sem-limites",
    title: "iA SEM LIMITES",
    author: "GrowS Podcast",
    category: "Negócios",
    frequency: "Semanal",
    description:
      "Podcast oficial da comunidade com estratégias práticas para vender treinamentos, fortalecer comunidade e executar com consistência.",
    rating: "4,9 (1,3 mil)",
    followers: "18,2 mil seguidores",
    coverImage: HERO_IMAGE,
    coverGradient: "from-[#1b4727] via-[#10221a] to-[#0b1110]",
    episodes: [
      {
        id: "ep-01",
        title: "iA SEM LIMITES",
        description: "Como usar IA para acelerar entregas e ganhar consistência no dia a dia.",
        dateLabel: "Hoje",
        durationLabel: "25:36",
        audioUrl: "/treinamento_ia.m4a",
      },
      {
        id: "ep-02",
        title: "NOVO EPISÓDIO",
        description: "Em breve",
        dateLabel: "Em breve",
        durationLabel: "--:--",
        isComingSoon: true,
      },
      {
        id: "ep-03",
        title: "NOVO EPISÓDIO",
        description: "Em breve",
        dateLabel: "Em breve",
        durationLabel: "--:--",
        isComingSoon: true,
      },
      {
        id: "ep-04",
        title: "NOVO EPISÓDIO",
        description: "Em breve",
        dateLabel: "Em breve",
        durationLabel: "--:--",
        isComingSoon: true,
      },
    ],
  },
  {
    id: "vendas-em-foco",
    title: "VENDAS EM FOCO",
    author: "GrowS",
    category: "Negócios",
    frequency: "Semanal",
    description: "Show em produção para casos reais de oferta, conversão e recorrência.",
    rating: "Novo",
    followers: "Em breve",
    coverGradient: "from-[#4c1f1f] via-[#281313] to-[#110d0d]",
    episodes: [
      {
        id: "coming-01",
        title: "NOVO EPISÓDIO",
        description: "Em breve",
        dateLabel: "Em breve",
        durationLabel: "--:--",
        isComingSoon: true,
      },
    ],
  },
  {
    id: "copy-lab",
    title: "COPY LAB",
    author: "GrowS",
    category: "Marketing",
    frequency: "Semanal",
    description: "Show em produção para copywriting, anúncios e criativos de alta conversão.",
    rating: "Novo",
    followers: "Em breve",
    coverGradient: "from-[#14325d] via-[#15223f] to-[#0f1629]",
    episodes: [
      {
        id: "coming-01",
        title: "NOVO EPISÓDIO",
        description: "Em breve",
        dateLabel: "Em breve",
        durationLabel: "--:--",
        isComingSoon: true,
      },
    ],
  },
  {
    id: "operacao-inteligente",
    title: "OPERAÇÃO INTELIGENTE",
    author: "GrowS",
    category: "Produtividade",
    frequency: "Semanal",
    description: "Show em produção para processos, automações e rotina de execução.",
    rating: "Novo",
    followers: "Em breve",
    coverGradient: "from-[#2d2351] via-[#21143e] to-[#140f27]",
    episodes: [
      {
        id: "coming-01",
        title: "NOVO EPISÓDIO",
        description: "Em breve",
        dateLabel: "Em breve",
        durationLabel: "--:--",
        isComingSoon: true,
      },
    ],
  },
  {
    id: "comunidade-cresce",
    title: "COMUNIDADE CRESCE",
    author: "GrowS",
    category: "Comunidade",
    frequency: "Semanal",
    description: "Show em produção sobre retenção, engajamento e experiência de alunos.",
    rating: "Novo",
    followers: "Em breve",
    coverGradient: "from-[#3f2b14] via-[#2a1f12] to-[#16110c]",
    episodes: [
      {
        id: "coming-01",
        title: "NOVO EPISÓDIO",
        description: "Em breve",
        dateLabel: "Em breve",
        durationLabel: "--:--",
        isComingSoon: true,
      },
    ],
  },
  {
    id: "treinamento-premium",
    title: "TREINAMENTO PREMIUM",
    author: "GrowS",
    category: "Educação",
    frequency: "Semanal",
    description: "Show em produção com bastidores e implementações de treinamentos.",
    rating: "Novo",
    followers: "Em breve",
    coverGradient: "from-[#163d32] via-[#132f27] to-[#0e1d19]",
    episodes: [
      {
        id: "coming-01",
        title: "NOVO EPISÓDIO",
        description: "Em breve",
        dateLabel: "Em breve",
        durationLabel: "--:--",
        isComingSoon: true,
      },
    ],
  },
  {
    id: "oferta-digital",
    title: "OFERTA DIGITAL",
    author: "GrowS",
    category: "Negócios",
    frequency: "Semanal",
    description: "Show em produção para posicionamento e escada de valor.",
    rating: "Novo",
    followers: "Em breve",
    coverGradient: "from-[#4c1f38] via-[#291226] to-[#180d17]",
    episodes: [
      {
        id: "coming-01",
        title: "NOVO EPISÓDIO",
        description: "Em breve",
        dateLabel: "Em breve",
        durationLabel: "--:--",
        isComingSoon: true,
      },
    ],
  },
];

const SECTIONS: Section[] = [
  {
    title: "Você pode gostar",
    showIds: [
      "ia-sem-limites",
      "vendas-em-foco",
      "copy-lab",
      "operacao-inteligente",
      "comunidade-cresce",
    ],
  },
  {
    title: "Negócios",
    showIds: [
      "ia-sem-limites",
      "vendas-em-foco",
      "oferta-digital",
      "copy-lab",
      "comunidade-cresce",
    ],
  },
  {
    title: "Educação",
    showIds: [
      "treinamento-premium",
      "ia-sem-limites",
      "operacao-inteligente",
      "comunidade-cresce",
      "copy-lab",
    ],
  },
];

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

export default function CommunityPodcastCards({ className = "" }: { className?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const showsById = useMemo(
    () => new Map(PODCAST_SHOWS.map((show) => [show.id, show])),
    [],
  );

  const defaultTrack = useMemo(() => {
    for (const show of PODCAST_SHOWS) {
      const playable = show.episodes.find((episode) => Boolean(episode.audioUrl));
      if (playable) return { showId: show.id, episodeId: playable.id };
    }
    return { showId: PODCAST_SHOWS[0].id, episodeId: PODCAST_SHOWS[0].episodes[0].id };
  }, []);

  const [selectedShowId, setSelectedShowId] = useState<string | null>(null);
  const [activeTrack, setActiveTrack] = useState(defaultTrack);
  const [autoplayNext, setAutoplayNext] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const activeShow = showsById.get(activeTrack.showId) ?? PODCAST_SHOWS[0];
  const activeEpisode =
    activeShow.episodes.find((episode) => episode.id === activeTrack.episodeId) ?? activeShow.episodes[0];

  const selectedShow = selectedShowId ? showsById.get(selectedShowId) ?? null : null;

  const progress = useMemo(() => {
    if (!duration) return 0;
    return (currentTime / duration) * 100;
  }, [currentTime, duration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
    setCurrentTime(0);

    if (!activeEpisode.audioUrl) return;

    audio.load();

    if (autoplayNext) {
      const tryPlay = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        } finally {
          setAutoplayNext(false);
        }
      };

      void tryPlay();
    }
  }, [activeEpisode.audioUrl, activeEpisode.id, autoplayNext]);

  const playOrPause = () => {
    const audio = audioRef.current;
    if (!audio || !activeEpisode.audioUrl) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  const seekBy = (delta: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const next = Math.min(Math.max(audio.currentTime + delta, 0), duration);
    audio.currentTime = next;
    setCurrentTime(next);
  };

  const setTrack = (showId: string, episodeId: string, autoplay = false) => {
    setActiveTrack({ showId, episodeId });
    setAutoplayNext(autoplay);
  };

  const playLatestFromShow = (show: PodcastShow) => {
    const firstPlayable = show.episodes.find((episode) => Boolean(episode.audioUrl));
    if (!firstPlayable?.audioUrl) return;

    const isSameTrack =
      activeTrack.showId === show.id && activeTrack.episodeId === firstPlayable.id;

    if (isSameTrack) {
      const audio = audioRef.current;
      if (!audio) return;

      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
      return;
    }

    setTrack(show.id, firstPlayable.id, true);
  };

  const showsForSection = (ids: string[]) =>
    ids
      .map((id) => showsById.get(id))
      .filter((show): show is PodcastShow => Boolean(show));

  return (
    <section className={`overflow-hidden rounded-2xl border border-white/10 bg-[#161616] ${className}`.trim()}>
      <div className="sticky top-0 z-20 hidden h-16 items-center gap-3 border-b border-white/8 bg-[#1a1a1ad9] px-4 backdrop-blur-xl md:flex md:px-6">
        <div className="hidden items-center gap-1.5 sm:flex">
          <button
            type="button"
            onClick={() => seekBy(-15)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-[#cfcfcf] transition-colors hover:bg-white/6"
            aria-label="Voltar 15 segundos"
          >
            <SkipBack size={17} />
          </button>
          <button
            type="button"
            onClick={playOrPause}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/18 text-white transition-colors hover:bg-white/8"
            aria-label={isPlaying ? "Pausar" : "Tocar"}
          >
            {isPlaying ? <Pause size={17} /> : <Play size={17} className="translate-x-[1px]" />}
          </button>
          <button
            type="button"
            onClick={() => seekBy(30)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-[#cfcfcf] transition-colors hover:bg-white/6"
            aria-label="Avançar 30 segundos"
          >
            <SkipForward size={17} />
          </button>
        </div>

        <div className="mx-auto flex w-full max-w-[760px] items-center gap-3 rounded-md bg-[#404040c7] px-2.5 py-1.5">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-[6px] border border-white/12 bg-black/30">
            {activeShow.coverImage ? (
              <div
                className="m-0 h-full w-full bg-cover bg-center p-0"
                style={{ backgroundImage: `url(${activeShow.coverImage})` }}
              />
            ) : (
              <div className={`h-full w-full bg-gradient-to-br ${activeShow.coverGradient}`} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.72rem] font-semibold text-[#f2f2f2] sm:text-[0.79rem]">
              {activeEpisode.title}
            </p>
            <p className="truncate text-[0.66rem] text-[#c9c9c9] sm:text-[0.73rem]">
              {activeShow.title} • {activeEpisode.dateLabel}
            </p>
            <div className="mt-1.5 h-[3px] w-full rounded-full bg-white/18">
              <div className="h-full rounded-full bg-white/95" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Volume2 size={17} className="text-[#bdbdbd]" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            className="h-1 w-26 accent-white"
            aria-label="Volume"
          />
          <button type="button" className="text-[#c9c9c9] transition-colors hover:text-white" aria-label="AirPlay">
            <Radio size={18} />
          </button>
          <button type="button" className="text-[#c9c9c9] transition-colors hover:text-white" aria-label="Informações">
            <Info size={18} />
          </button>
          <button type="button" className="text-[#c9c9c9] transition-colors hover:text-white" aria-label="Fila">
            <List size={18} />
          </button>
        </div>
      </div>

      <div className="min-h-[760px]">
        <div className="overflow-y-auto bg-[radial-gradient(circle_at_18%_0%,rgba(58,58,58,0.2),transparent_34%),linear-gradient(180deg,#171718_0%,#131314_100%)] px-4 pb-28 pt-5 text-[#e8e8e8] md:px-6 md:pb-10 md:text-inherit">
          {selectedShow ? (
            <>
              <div className="md:hidden">
                {(() => {
                  const hasPlayableEpisode = selectedShow.episodes.some((episode) => Boolean(episode.audioUrl));
                  return (
                    <>
                <div className="rounded-2xl border border-white/10 bg-[#1b1c1f] px-4 pb-6 pt-4 text-white">
                  <div className="mb-5 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedShowId(null)}
                      className="inline-flex h-13 w-13 items-center justify-center rounded-full border border-white/16 bg-[#2b2c31] text-[#ececec]"
                      aria-label="Voltar"
                    >
                      <ArrowLeft size={26} />
                    </button>
                  </div>

                  <div className="mx-auto relative aspect-square w-full max-w-[270px] overflow-hidden rounded-2xl border border-white/20">
                    {selectedShow.coverImage ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${selectedShow.coverImage})` }}
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${selectedShow.coverGradient}`} />
                    )}
                  </div>

                  <div className="mt-5 text-center">
                    <h2 className="text-[2rem] font-bold leading-tight">{selectedShow.title}</h2>
                    <p className="mt-1 text-[1.05rem] text-white/85">{selectedShow.author}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => playLatestFromShow(selectedShow)}
                    disabled={!hasPlayableEpisode}
                    className={`mx-auto mt-4 inline-flex w-full max-w-[320px] items-center justify-center gap-2 rounded-full py-3 text-[1.05rem] font-semibold ${
                      hasPlayableEpisode
                        ? "bg-lime-400 text-[#11190f]"
                        : "cursor-not-allowed bg-lime-400/35 text-lime-100/80"
                    }`}
                  >
                    <Play size={18} />
                    {hasPlayableEpisode ? "Último episódio" : "Em breve"}
                  </button>

                  <p className="mt-5 text-[0.94rem] leading-relaxed text-white/92">
                    {selectedShow.description}
                  </p>
                  <p className="mt-3 text-[0.95rem] font-medium text-white/80">
                    ★ {selectedShow.rating} • {selectedShow.category} • {selectedShow.frequency}
                  </p>
                </div>

                <div className="mt-4 rounded-t-3xl border border-white/10 bg-[#141416] px-4 pt-4 text-[#e8e8e8]">
                  <h3 className="border-b border-white/10 pb-3 text-[2.05rem] font-bold leading-none">
                    Episódios
                  </h3>
                  <div className="divide-y divide-white/8">
                    {selectedShow.episodes.map((episode) => {
                      const isActiveTrack =
                        activeTrack.showId === selectedShow.id && activeTrack.episodeId === episode.id;
                      return (
                        <div key={episode.id} className="flex items-start gap-3 py-4">
                          <div className="min-w-0 flex-1">
                            <p className="text-[0.83rem] font-semibold uppercase tracking-[0.07em] text-[#9f9f9f]">
                              {episode.dateLabel}
                            </p>
                            <button
                              type="button"
                              disabled={!episode.audioUrl}
                              onClick={() => {
                                if (!episode.audioUrl) return;
                                setTrack(selectedShow.id, episode.id, true);
                              }}
                              className={`mt-1 text-left text-[1.28rem] font-bold leading-tight ${
                                episode.audioUrl ? "text-[#f0f0f0]" : "text-[#7a7a7a]"
                              }`}
                            >
                              {episode.title}
                            </button>
                            <p className="mt-1 line-clamp-2 text-[1rem] leading-snug text-[#b3b3b3]">
                              {episode.description}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-[0.92rem] text-[#bbbbbb]">{episode.durationLabel}</span>
                              {isActiveTrack ? (
                                <span className="rounded-full border border-lime-300/45 bg-lime-300/20 px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-lime-200">
                                  Tocando
                                </span>
                              ) : null}
                            </div>
                          </div>
                          <div className="h-22 w-22 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/20">
                            {selectedShow.coverImage ? (
                              <div
                                className="h-full w-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${selectedShow.coverImage})` }}
                              />
                            ) : (
                              <div className={`h-full w-full bg-gradient-to-br ${selectedShow.coverGradient}`} />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                    </>
                  );
                })()}
              </div>

              <div className="hidden md:block">
                {(() => {
                  const hasPlayableEpisode = selectedShow.episodes.some((episode) => Boolean(episode.audioUrl));
                  return (
                    <>
                <button
                  type="button"
                  onClick={() => setSelectedShowId(null)}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/12 px-2.5 py-1.5 text-[0.82rem] text-[#c7c7c7] transition-colors hover:bg-white/8"
                >
                  <ArrowLeft size={15} />
                  Voltar
                </button>

                <div className="mt-5 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-[#222]">
                    {selectedShow.coverImage ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${selectedShow.coverImage})` }}
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${selectedShow.coverGradient}`} />
                    )}
                  </div>

                  <div>
                    <h2 className="text-[2rem] font-bold leading-tight text-[#ececec]">{selectedShow.title}</h2>
                    <p className="mt-1 text-[1.02rem] text-[#c8c8c8]">{selectedShow.author}</p>
                    <p className="mt-3 text-[0.95rem] text-[#afafaf]">
                      ★ {selectedShow.rating} • {selectedShow.category} • {selectedShow.frequency}
                    </p>
                    <p className="mt-4 max-w-3xl text-[0.98rem] leading-relaxed text-[#cecece]">
                      {selectedShow.description}
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => playLatestFromShow(selectedShow)}
                      disabled={!hasPlayableEpisode}
                      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[0.94rem] font-semibold transition-colors ${
                        hasPlayableEpisode
                          ? "bg-lime-400 text-[#10150d] hover:bg-lime-300"
                          : "cursor-not-allowed bg-lime-300/35 text-lime-100/90"
                      }`}
                    >
                      <Play size={15} />
                      {hasPlayableEpisode ? "Retomar" : "Em breve"}
                    </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg border border-lime-300/45 bg-lime-300/18 px-4 py-2 text-[0.9rem] font-medium text-lime-200"
                      >
                        <Plus size={14} />
                        Seguir
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-[1.05rem] font-semibold text-[#e4e4e4]">Episódios</h3>
                  <div className="mt-3 divide-y divide-white/8 rounded-xl border border-white/8 bg-black/10">
                    {selectedShow.episodes.map((episode) => {
                      const isActiveTrack =
                        activeTrack.showId === selectedShow.id && activeTrack.episodeId === episode.id;

                      return (
                        <div key={episode.id} className="flex items-start gap-4 px-3 py-3.5">
                          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-white/10 bg-black/20">
                            {selectedShow.coverImage ? (
                              <div
                                className="m-0 h-full w-full bg-cover bg-center p-0"
                                style={{ backgroundImage: `url(${selectedShow.coverImage})` }}
                              />
                            ) : (
                              <div className={`h-full w-full bg-gradient-to-br ${selectedShow.coverGradient}`} />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-[0.73rem] font-semibold uppercase tracking-[0.08em] text-[#a8a8a8]">
                              {episode.dateLabel}
                            </p>
                            <button
                              type="button"
                              disabled={!episode.audioUrl}
                              onClick={() => {
                                if (!episode.audioUrl) return;
                                setTrack(selectedShow.id, episode.id, true);
                              }}
                              className={`mt-0.5 text-left text-[1.05rem] font-semibold leading-tight ${
                                episode.audioUrl
                                  ? "text-[#ececec] hover:text-white"
                                  : "cursor-not-allowed text-[#7f7f7f]"
                              }`}
                            >
                              {episode.title}
                            </button>
                            <p className="mt-1 line-clamp-2 text-[0.88rem] text-[#b1b1b1]">{episode.description}</p>
                          </div>

                          <div className="flex shrink-0 flex-col items-end gap-2 pt-1 text-[0.85rem] text-[#adadad]">
                            <span>{episode.durationLabel}</span>
                            {isActiveTrack ? (
                              <span className="rounded-full border border-lime-300/45 bg-lime-300/20 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-lime-200">
                                Tocando
                              </span>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                    </>
                  );
                })()}
              </div>
            </>
          ) : (
            <>
              <div className="space-y-8 md:hidden">
                {SECTIONS.map((section) => {
                  const sectionShows = showsForSection(section.showIds);

                  return (
                    <section key={section.title}>
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-[2.15rem] font-bold leading-none text-[#e8e8e8]">{section.title}</h3>
                        <span className="text-[2.3rem] leading-none text-[#8d8d8d]">›</span>
                      </div>

                      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                        {sectionShows.map((show) => (
                          <button
                            key={show.id}
                            type="button"
                            onClick={() => setSelectedShowId(show.id)}
                            className="w-[41vw] min-w-[156px] max-w-[188px] shrink-0 text-left"
                          >
                            <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black/20">
                              {show.coverImage ? (
                                <div
                                  className="absolute inset-0 bg-cover bg-center"
                                  style={{ backgroundImage: `url(${show.coverImage})` }}
                                />
                              ) : (
                                <div className={`absolute inset-0 bg-gradient-to-br ${show.coverGradient}`} />
                              )}
                            </div>
                            <p className="mt-2 text-[0.95rem] font-semibold text-[#e5e5e5]">{show.title}</p>
                            <p className="text-[0.82rem] text-[#b4b4b4]">{show.category}</p>
                            <p className="text-[0.82rem] text-[#b4b4b4]">{show.frequency}</p>
                          </button>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>

              <div className="hidden space-y-8 md:block">
                {SECTIONS.map((section) => {
                  const sectionShows = showsForSection(section.showIds);

                  return (
                    <section key={section.title}>
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-[1.9rem] font-bold leading-none text-[#e6e6e6]">{section.title}</h3>
                        <span className="text-[1.6rem] leading-none text-[#8b8b8b]">›</span>
                      </div>

                      <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
                        {sectionShows.map((show) => (
                          <button
                            key={show.id}
                            type="button"
                            onClick={() => setSelectedShowId(show.id)}
                            className="group w-[182px] shrink-0 text-left"
                          >
                            <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black/20">
                              {show.coverImage ? (
                                <div
                                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                                  style={{ backgroundImage: `url(${show.coverImage})` }}
                                />
                              ) : (
                                <div className={`absolute inset-0 bg-gradient-to-br ${show.coverGradient}`} />
                              )}
                              {!show.coverImage ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                  <span className="rounded-full border border-white/25 bg-black/20 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.11em] text-white/80">
                                    Em breve
                                  </span>
                                </div>
                              ) : null}
                              <span className="pointer-events-none absolute bottom-2.5 left-2.5 inline-flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-white/45 bg-black/45 text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                                <Play size={15} className="translate-x-[1px]" />
                              </span>
                            </div>
                            <p className="mt-2.5 truncate text-[0.98rem] font-semibold text-[#e5e5e5]">{show.title}</p>
                            <p className="text-[0.8rem] text-[#b4b4b4]">{show.category}</p>
                            <p className="text-[0.8rem] text-[#b4b4b4]">{show.frequency}</p>
                          </button>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="fixed inset-x-3 bottom-3 z-30 md:hidden">
        <div className="rounded-[22px] border border-white/10 bg-[#18191cf2] p-2 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.65)] backdrop-blur-xl">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#232428] px-3 py-2">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-white/12 bg-black/25">
              {activeShow.coverImage ? (
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${activeShow.coverImage})` }}
                />
              ) : (
                <div className={`h-full w-full bg-gradient-to-br ${activeShow.coverGradient}`} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[1rem] font-semibold text-[#eeeeee]">{activeEpisode.title}</p>
              <p className="truncate text-[0.86rem] text-[#b5b5b5]">{activeEpisode.dateLabel}</p>
            </div>
            <button
              type="button"
              onClick={playOrPause}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-[#f4f4f4]"
              aria-label={isPlaying ? "Pausar" : "Tocar"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="translate-x-[1px]" />}
            </button>
            <button
              type="button"
              onClick={() => seekBy(30)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-[#f4f4f4]"
              aria-label="Avançar 30 segundos"
            >
              <SkipForward size={18} />
            </button>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={activeEpisode.audioUrl} preload="metadata" />
    </section>
  );
}
