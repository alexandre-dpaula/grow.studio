"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { type MouseEvent, useEffect, useMemo, useRef, useState } from "react";

type PodcastEpisode = {
  id: string;
  episode: string;
  title: string;
  description: string;
  episodeUrl: string;
  backgroundImageUrl: string;
};

const EPISODE_BACKGROUND_URL = "/2hf_20260314_230539_c5efb4e7-1371-4502-90d5-c2f4d6eee79e.jpg";

const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: "ep-01",
    episode: "EPISÓDIO 01",
    title: "IA Sem Limites",
    description: "COMO USAR IA PARA ACELERAR ENTREGAS E GANHAR CONSISTÊNCIA NO DIA A DIA.",
    episodeUrl: "/treinamento_ia.m4a",
    backgroundImageUrl: EPISODE_BACKGROUND_URL,
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

function PodcastEpisodeCard({ episode }: { episode: PodcastEpisode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

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

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

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

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleSeek = (event: MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const percent = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = percent * duration;
    setCurrentTime(audio.currentTime);
  };

  return (
    <article className="group relative h-[560px] w-[340px] max-w-full overflow-hidden rounded-[15px] border border-white/30 shadow-[0_20px_45px_-30px_rgba(0,0,0,0.8)] transition-transform duration-200 hover:-translate-y-0.5">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${episode.backgroundImageUrl})` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.08)_58%,rgba(0,0,0,0.34)_100%)]" />

      <div className="relative flex h-full flex-col">
        <div className="mt-14 flex flex-1 flex-col justify-end px-7 pb-3">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.75)]">
            {episode.episode}
          </p>
          <h3 className="mt-1.5 font-serif text-[clamp(1.5rem,3.2vw,2.35rem)] font-bold uppercase leading-[0.98] text-white [text-shadow:0_4px_18px_rgba(0,0,0,0.85)]">
            {episode.title}
          </h3>
          <p className="mt-2 max-w-[26ch] text-[0.8rem] font-medium lowercase leading-snug text-white sm:text-[0.88rem] [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">
            {episode.description}
          </p>
        </div>

        <div className="border-t border-white/45 bg-black/20 px-6 py-5 backdrop-blur-sm">
          <div
            className="h-2 w-full cursor-pointer rounded-full bg-white/15"
            onClick={handleSeek}
            role="slider"
            aria-label="Progresso do episódio"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <div
              className="h-full rounded-full bg-white/95 transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-[0.8rem] font-medium text-white/85">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <button
              type="button"
              onClick={togglePlayback}
              className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/80 bg-transparent text-white transition-transform duration-150 hover:scale-105 hover:bg-white/10 active:scale-95"
              aria-label={isPlaying ? "Pausar episódio" : "Reproduzir episódio"}
            >
              {isPlaying ? (
                <Pause size={18} />
              ) : (
                <Play size={18} className="translate-x-[1px]" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-transparent text-white transition-colors hover:bg-white/10"
              aria-label={isMuted ? "Ativar áudio" : "Silenciar áudio"}
            >
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={episode.episodeUrl} preload="metadata" />
    </article>
  );
}

export default function CommunityPodcastCards() {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[0.9rem] font-semibold uppercase tracking-[0.14em] text-[#aaa59a]">
          Episódio em destaque
        </h2>
        <p className="text-[0.8rem] text-[#908b80]">
          Layout visual no estilo streaming
        </p>
      </div>

      <div className="mt-4 grid max-w-[460px] gap-4">
        {PODCAST_EPISODES.map((episode) => (
          <PodcastEpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
    </section>
  );
}
