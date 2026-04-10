"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type RollingWordsHeroProps = {
  words: string[];
  tone?: "lime" | "white";
  align?: "center" | "left";
  className?: string;
  pauseMs?: number;
  transitionMs?: number;
  widthCh?: number;
};

export default function RollingWordsHero({
  words,
  tone = "lime",
  align = "center",
  className,
  pauseMs = 2200,
  transitionMs = 560,
  widthCh,
}: RollingWordsHeroProps) {
  const normalizedWords = words
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => item.toUpperCase());

  const loopWords =
    normalizedWords.length > 1
      ? [...normalizedWords, normalizedWords[0]]
      : normalizedWords;
  const stepPercentage = loopWords.length ? 100 / loopWords.length : 100;

  const [index, setIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    setIndex(0);
    setIsResetting(false);
  }, [normalizedWords.length]);

  useEffect(() => {
    if (normalizedWords.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setIsResetting(false);
      setIndex((current) => current + 1);
    }, pauseMs);

    return () => window.clearInterval(timer);
  }, [normalizedWords.length, pauseMs]);

  const longestWordLength = normalizedWords.length
    ? Math.max(...normalizedWords.map((item) => item.length))
    : 14;

  const computedWidthCh = widthCh ?? Math.max(14, longestWordLength + 2);
  const itemScale = longestWordLength >= 20 ? 0.84 : 1.02;
  const toneClass =
    tone === "white"
      ? "rolling-words-hero-item-white"
      : "rolling-words-hero-item-lime";
  const alignClass =
    align === "left"
      ? "rolling-words-hero-item-left"
      : "rolling-words-hero-item-center";

  const handleTransitionEnd = () => {
    if (normalizedWords.length <= 1) return;
    if (index !== normalizedWords.length) return;

    setIsResetting(true);
    setIndex(0);
  };

  return (
    <span
      className={`rolling-words-hero ${className ?? ""}`.trim()}
      style={
        {
          "--rolling-hero-width": `${computedWidthCh}ch`,
          "--rolling-hero-item-scale": `${itemScale}em`,
        } as CSSProperties
      }
      aria-hidden
    >
      <span
        className="rolling-words-hero-track"
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translate3d(0, -${index * stepPercentage}%, 0)`,
          transition: isResetting
            ? "none"
            : `transform ${transitionMs}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        {loopWords.map((item, itemIndex) => (
          <span
            key={`${item}-${itemIndex}`}
            className={`rolling-words-hero-item ${toneClass} ${alignClass}`}
          >
            {item}
          </span>
        ))}
      </span>
    </span>
  );
}
