import type { ReactNode } from "react";

const baseStyles =
  "inline-flex items-center justify-between gap-3 rounded-full px-6 py-3 text-base font-semibold font-heading transition-all duration-300 ease-out";

const iconWrap =
  "flex h-9 w-9 items-center justify-center rounded-full text-current transition-all duration-300";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  className?: string;
  href?: string;
};

export default function Button({
  children,
  variant = "primary",
  icon,
  className = "",
  href,
}: ButtonProps) {
  const variantStyles =
    variant === "primary"
      ? "bg-white text-black shadow-soft hover:bg-white/90 hover:shadow-[0_30px_80px_-40px_rgba(255,255,255,0.5)]"
      : variant === "secondary"
        ? "bg-white/5 text-white ring-1 ring-white/15 hover:bg-white/10"
        : "bg-transparent text-white/80 hover:text-white";

  const content = (
    <>
      {children}
      {icon ? <span className={iconWrap}>{icon}</span> : null}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${variantStyles} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={`${baseStyles} ${variantStyles} ${className}`}>
      {content}
    </button>
  );
}
