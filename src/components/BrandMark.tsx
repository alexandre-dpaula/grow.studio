import type { ReactNode } from "react";

const FULL_BRAND_PATTERN = "grow\\s*\\+\\s*studio";
const SHORT_BRAND_PATTERN = "grow\\s*\\+";
const BRAND_PATTERN = `${FULL_BRAND_PATTERN}|${SHORT_BRAND_PATTERN}`;

function createBrandRegex(global = false) {
  return new RegExp(BRAND_PATTERN, global ? "gi" : "i");
}

type BrandMarkProps = {
  className?: string;
  variant?: "full" | "short";
};

function isFullBrand(text: string) {
  return new RegExp(`^${FULL_BRAND_PATTERN}$`, "i").test(text);
}

export default function BrandMark({
  className = "",
  variant = "full",
}: BrandMarkProps) {
  return (
    <span
      className={`inline-flex items-baseline gap-0 font-heading text-[1.03em] ${className}`}
    >
      <span className="font-bold">GROW</span>
      <span className="text-[0.8em] italic font-light">
        {variant === "full" ? "+STUDIO" : "+"}
      </span>
    </span>
  );
}

export function withBrand(text: string): ReactNode {
  const regex = createBrandRegex(true);
  let match = regex.exec(text);
  if (!match) {
    return text;
  }
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  while (match) {
    const prefix = text.slice(lastIndex, match.index);
    if (prefix) {
      nodes.push(prefix);
    }
    nodes.push(
      <BrandMark
        key={`brand-${match.index}`}
        variant={isFullBrand(match[0]) ? "full" : "short"}
      />
    );
    lastIndex = match.index + match[0].length;
    match = regex.exec(text);
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

export function splitBrand(text: string) {
  const regex = createBrandRegex(true);
  const match = regex.exec(text);
  if (!match) {
    return { prefix: text, suffix: "", hasBrand: false, variant: null };
  }
  return {
    prefix: text.slice(0, match.index),
    suffix: text.slice(match.index + match[0].length),
    hasBrand: true,
    variant: isFullBrand(match[0]) ? "full" : "short",
  };
}
