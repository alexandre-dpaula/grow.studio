"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpCircle,
  ChevronRight,
  ChevronsUpDown,
  CircleHelp,
  Download,
  Globe,
  LogOut,
  Settings,
} from "lucide-react";

type CommunityUserProfileProps = {
  profile: {
    avatarInitial: string;
    name: string;
    email: string;
    contact: string;
    role: string;
    plan: string;
  };
};

type ProfileMenuItem = {
  label: string;
  icon: typeof Settings;
  href: string;
  actionLabel: string;
  trailingIcon?: typeof ChevronRight;
};

const topMenuItems = [
  {
    label: "Configurações",
    icon: Settings,
    href: "/comunidade?view=configuracoes",
    actionLabel: "Editar Perfil",
  },
  {
    label: "Idioma",
    icon: Globe,
    href: "/comunidade?view=idioma",
    actionLabel: "Português e Inglês",
    trailingIcon: ChevronRight,
  },
  {
    label: "Receber ajuda",
    icon: CircleHelp,
    href: "/comunidade?view=chat",
    actionLabel: "Novo bate-papo",
  },
] satisfies ProfileMenuItem[];

const middleMenuItems = [
  {
    label: "Fazer upgrade do plano",
    icon: ArrowUpCircle,
    href: "/comunidade?view=upgrade",
    actionLabel: "Assinante",
  },
] satisfies ProfileMenuItem[];

export default function CommunityUserProfile({
  profile,
}: CommunityUserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (!containerRef.current) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (!containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {isOpen ? (
        <div className="absolute bottom-[calc(100%+10px)] left-0 right-0 rounded-3xl border border-white/15 bg-[#2b2b2a] p-4 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.95)]">
          <p className="truncate text-[0.82rem] text-[#a6a39d]">{profile.email}</p>
          <p className="mt-1 text-[0.75rem] text-[#8f8c86]">{profile.contact}</p>

          <div className="mt-3.5 space-y-1.5">
            {topMenuItems.map((item) => {
              const Icon = item.icon;
              const TrailingIcon = item.trailingIcon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  aria-label={`${item.label}: ${item.actionLabel}`}
                  className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-[0.9rem] text-[#d4d0c8] transition-colors hover:bg-white/6"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Icon size={16} className="text-white/70" />
                    {item.label}
                  </span>
                  {TrailingIcon ? (
                    <TrailingIcon size={15} className="text-white/45" />
                  ) : null}
                </Link>
              );
            })}
          </div>

          <div className="my-3 border-t border-white/10" />

          <div className="space-y-1.5">
            {middleMenuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  aria-label={`${item.label}: ${item.actionLabel}`}
                  className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-[0.9rem] text-[#d4d0c8] transition-colors hover:bg-white/6"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <Icon size={16} className="text-white/70" />
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="my-3 border-t border-white/10" />

          <button
            type="button"
            className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left text-[0.9rem] text-[#d4d0c8] transition-colors hover:bg-white/6"
          >
            <LogOut size={16} className="text-white/70" />
            Sair
          </button>
        </div>
      ) : null}

      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/3 px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#d2d2cd] text-[1.05rem] font-semibold text-[#2a2a28]">
            {profile.avatarInitial}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[0.92rem] font-semibold text-[#e4e0d8]">
              {profile.name}
            </p>
            <div className="mt-0.5 inline-flex items-center gap-1.5">
              <span className="text-[0.74rem] text-white/45">{profile.plan}</span>
              <span className="rounded-full border border-white/16 bg-[#2a2a28] px-1.5 py-0.5 text-[0.62rem] text-[#cdc9c2]">
                {profile.role}
              </span>
            </div>
          </div>
        </div>

        <div className="ml-2 flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 text-white/70 transition-colors hover:bg-white/6"
            aria-label="Baixar"
          >
            <Download size={14} />
          </button>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 text-white/70 transition-colors hover:bg-white/6"
            aria-label="Abrir menu do perfil"
          >
            <ChevronsUpDown size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
