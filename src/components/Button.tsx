import type { ReactNode } from "react";

const baseStyles =
  "inline-flex w-full items-center justify-center gap-2.5 rounded-full px-5 py-3 text-[15px] font-semibold font-heading transition-all duration-300 ease-out sm:w-auto sm:justify-between sm:gap-3 sm:px-6 sm:text-base";

const iconWrap =
  "flex h-8 w-8 items-center justify-center rounded-full text-current transition-all duration-300 sm:h-9 sm:w-9";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "primary",
  icon,
  className = "",
  href,
  onClick,
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
      <a href={href} onClick={onClick} className={`${baseStyles} ${variantStyles} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${baseStyles} ${variantStyles} ${className}`}>
      {content}
    </button>
  );
}
