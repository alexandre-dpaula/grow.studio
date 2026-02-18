import type { ReactNode } from "react";

export default function BrandMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline gap-0 font-heading tracking-[-0.02em] text-[1.03em] ${className}`}
    >
      <span className="font-bold">Grow</span>
      <span className="text-[0.8em] font-light italic">+Studio</span>
    </span>
  );
}

export function withBrand(text: string): ReactNode {
  const token = "Grow+ Studio";
  if (!text.includes(token)) {
    return text;
  }
  const parts = text.split(token);
  return parts.map((part, index) => (
    <span key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 ? <BrandMark /> : null}
    </span>
  ));
}

export function splitBrand(text: string) {
  const token = "Grow+ Studio";
  const index = text.indexOf(token);
  if (index === -1) {
    return { prefix: text, suffix: "", hasBrand: false };
  }
  return {
    prefix: text.slice(0, index),
    suffix: text.slice(index + token.length),
    hasBrand: true,
  };
}
