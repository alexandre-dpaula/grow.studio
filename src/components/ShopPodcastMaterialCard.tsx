"use client";

import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { type MouseEvent, useEffect, useMemo, useRef, useState } from "react";

type ShopPodcastMaterialCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  audioSrc: string;
  episodeLabel?: string;
  metaLabel?: string;
  layout?: "compact" | "streaming";
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

export default function ShopPodcastMaterialCard({
  title,
  description,
  imageSrc,
  audioSrc,
  episodeLabel = "Episódio 01",
  metaLabel = "Podcast",
  layout = "compact",
}: ShopPodcastMaterialCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
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

  const seekBy = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextTime = Math.min(Math.max(audio.currentTime + seconds, 0), duration || 0);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleSeek = (event: MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const percent = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = percent * duration;
    setCurrentTime(audio.currentTime);
  };

  const isStreaming = layout === "streaming";

  if (isStreaming) {
    return (
      <article className="group relative h-full overflow-hidden rounded-[24px] border border-white/22 bg-[#0f0f0e] shadow-[0_20px_45px_-30px_rgba(0,0,0,0.9)]">
        <div className="relative aspect-square w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover"
            style={{ backgroundImage: `url(${imageSrc})`, backgroundPosition: "center top" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.14)_100%)]" />
        </div>

        <div className="relative aspect-square overflow-hidden border-t border-white/28 px-4 pb-4 pt-3 sm:px-5">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-45"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.84)_42%,rgba(0,0,0,0.97)_100%)]" />

          <div className="relative flex h-full flex-col">
            <div>
              <div className="flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-white/90">
                <span>{episodeLabel}</span>
                <span className="h-1 w-1 rounded-full bg-white/55" />
                <span>{metaLabel}</span>
              </div>
              <h3 className="mt-1 text-[1.12rem] font-bold uppercase leading-tight tracking-wide text-white sm:text-[1.2rem]">
                {title}
              </h3>
              <p className="mt-1.5 max-w-[34ch] text-[0.66rem] font-medium lowercase leading-snug tracking-[0.01em] text-white/85 sm:text-[0.68rem]">
                {description}
              </p>
            </div>

            <div className="mt-auto">
              <div
                className="h-[9px] w-full cursor-pointer rounded-full bg-white/20"
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

              <div className="mt-1.5 flex items-center justify-between text-[0.82rem] font-medium text-white/90">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              <div className="mt-3 flex items-center justify-center gap-6">
                <button
                  type="button"
                  onClick={() => seekBy(-10)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-transparent text-white transition-colors hover:bg-white/10"
                  aria-label="Voltar 10 segundos"
                >
                  <SkipBack size={18} />
                </button>

                <button
                  type="button"
                  onClick={togglePlayback}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/80 bg-transparent text-white transition-transform duration-150 hover:scale-105 hover:bg-white/10 active:scale-95"
                  aria-label={isPlaying ? "Pausar episódio" : "Reproduzir episódio"}
                >
                  {isPlaying ? <Pause size={21} /> : <Play size={21} className="translate-x-[1px]" />}
                </button>

                <button
                  type="button"
                  onClick={() => seekBy(10)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-transparent text-white transition-colors hover:bg-white/10"
                  aria-label="Avançar 10 segundos"
                >
                  <SkipForward size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <audio ref={audioRef} src={audioSrc} preload="metadata" />
      </article>
    );
  }

  return (
    <article className="group relative h-full min-h-[248px] overflow-hidden rounded-2xl border border-white/14 bg-[#121210] shadow-[0_20px_45px_-30px_rgba(0,0,0,0.9)] sm:min-h-[260px]">
      <div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: `url(${imageSrc})`, backgroundPosition: "center top" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.2)_45%,rgba(0,0,0,0.82)_100%)]" />

      <div className="absolute inset-x-0 bottom-0 border-t border-white/35 bg-black/35 px-4 pb-2.5 pt-3 backdrop-blur-md sm:px-5 sm:pb-3 sm:pt-3.5">
        <div className="mb-2.5">
          <div className="flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/90">
            <span>{episodeLabel}</span>
            <span className="h-1 w-1 rounded-full bg-white/55" />
            <span>{metaLabel}</span>
          </div>
          <h3 className="mt-1 text-[0.96rem] font-bold uppercase leading-tight tracking-wide text-white sm:text-[1.04rem]">
            {title}
          </h3>
          <p className="mt-1.5 max-w-[34ch] text-[0.67rem] font-medium lowercase leading-snug tracking-[0.01em] text-white/85 sm:text-[0.7rem]">
            {description}
          </p>
        </div>

        <div
          className="h-1.5 w-full cursor-pointer rounded-full bg-white/20"
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

        <div className="mt-1.5 flex items-center justify-between text-[0.73rem] font-medium text-white/90">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="mt-1.5 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => seekBy(-10)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-transparent text-white transition-colors hover:bg-white/10"
            aria-label="Voltar 10 segundos"
          >
            <SkipBack size={16} />
          </button>

          <button
            type="button"
            onClick={togglePlayback}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-transparent text-white transition-transform duration-150 hover:scale-105 hover:bg-white/10 active:scale-95"
            aria-label={isPlaying ? "Pausar episódio" : "Reproduzir episódio"}
          >
            {isPlaying ? <Pause size={17} /> : <Play size={17} className="translate-x-[1px]" />}
          </button>

          <button
            type="button"
            onClick={() => seekBy(10)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-transparent text-white transition-colors hover:bg-white/10"
            aria-label="Avançar 10 segundos"
          >
            <SkipForward size={16} />
          </button>
        </div>
      </div>

      <audio ref={audioRef} src={audioSrc} preload="metadata" />
    </article>
  );
}
