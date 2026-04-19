"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Volume2, X } from "lucide-react";

const HERO_VIDEO_ID = "kSXAltLt2Ag";

const heroVideoParams = new URLSearchParams({
  autoplay: "1",
  controls: "0",
  enablejsapi: "1",
  loop: "1",
  mute: "1",
  modestbranding: "1",
  playsinline: "1",
  playlist: HERO_VIDEO_ID,
  rel: "0",
});

const modalVideoParams = new URLSearchParams({
  autoplay: "1",
  controls: "1",
  modestbranding: "1",
  playsinline: "1",
  rel: "0",
});

export default function HeroSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const sendPlayerCommand = (func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "https://www.youtube.com"
    );
  };

  const enableAudio = () => {
    if (!isLoaded || isAudioEnabled) {
      return;
    }

    sendPlayerCommand("unMute");
    sendPlayerCommand("setVolume", [100]);
    sendPlayerCommand("playVideo");
    setIsAudioEnabled(true);
  };

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isVideoModalOpen ? "hidden" : "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVideoModalOpen(false);
      }
    };

    if (isVideoModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoModalOpen]);

  return (
    <>
      <section
        id="home"
        className="relative h-dvh min-h-svh overflow-hidden bg-black md:min-h-160"
      >
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2">
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${HERO_VIDEO_ID}?${heroVideoParams.toString()}`}
              title="Grow hero video"
              className="pointer-events-none h-full w-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setIsLoaded(true)}
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-black/45 via-black/10 to-black/35" />
        </div>

        <button
          type="button"
          aria-label="Abrir video completo"
          onClick={openVideoModal}
          className="absolute inset-0 z-1 cursor-pointer"
        >
          <span className="sr-only">Abrir video completo</span>
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-4 sm:p-5 md:p-8">
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={openVideoModal}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2.5 text-[13px] font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/14 md:px-5"
          >
            <Play size={14} className="ml-0.5" />
            <span>Abrir video</span>
          </motion.button>

          {!isAudioEnabled ? (
            <motion.button
              type="button"
              key="audio-toggle"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              aria-label="Ativar som do video"
              onClick={enableAudio}
              disabled={!isLoaded}
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/14 disabled:cursor-not-allowed disabled:opacity-50 md:h-12 md:w-12"
            >
              <Volume2 size={16} />
            </motion.button>
          ) : null}
        </div>
      </section>

      <AnimatePresence>
        {isVideoModalOpen ? (
          <motion.div
            key="hero-video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/82 p-4 backdrop-blur-xl md:p-8"
          >
            <button
              type="button"
              aria-label="Fechar player de video"
              onClick={closeVideoModal}
              className="absolute inset-0"
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[26px] border border-white/10 bg-[rgba(11,11,15,0.96)] shadow-[0_40px_140px_-60px_rgba(0,0,0,0.98)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-video bg-black">
                <button
                  type="button"
                  onClick={closeVideoModal}
                  className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[rgba(11,11,15,0.68)] text-white/78 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-[rgba(11,11,15,0.84)] hover:text-white"
                  aria-label="Fechar"
                >
                  <X size={16} />
                </button>
                <iframe
                  src={`https://www.youtube.com/embed/${HERO_VIDEO_ID}?${modalVideoParams.toString()}`}
                  title="Grow hero modal video"
                  className="absolute inset-0 h-full w-full border-0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
