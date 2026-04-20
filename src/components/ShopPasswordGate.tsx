"use client";

import { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";

const SENHA = "iA1104";
const IMG = "/2hf_20260314_230539_c5efb4e7-1371-4502-90d5-c2f4d6eee79e.jpg";

export default function ShopPasswordGate({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === SENHA) {
      setUnlocked(true);
    } else {
      setError(true);
      setInput("");
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <>
      {/* ── MOBILE: tela cheia com imagem de fundo ── */}
      <div className="fixed inset-0 z-50 sm:hidden" style={{ minHeight: "100svh" }}>
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG}
          alt="IA Sem Limites"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        {/* Gradiente de cima para baixo */}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/30 to-black/90" />

        {/* Textos sobre a imagem — parte superior */}
        <div className="absolute inset-x-0 top-0 px-6 pt-8 text-center">
          <h4
            className="text-[0.7rem] font-bold uppercase leading-none tracking-[0.22em] text-white/90"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Material do Treinamento
          </h4>
          <h1
            className="mt-1 text-[2.1rem] font-bold uppercase leading-none tracking-tight text-lime-300"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            IA Sem Limites
          </h1>
        </div>

        {/* Formulário fixo na base */}
        <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-[#141412]/96 px-6 pb-10 pt-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <h1
              className="text-[1.3rem] font-bold uppercase leading-tight text-[#ebe7df]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Área exclusiva
            </h1>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-[#f47b4f]/35 bg-[#f47b4f]/12 text-[#ffc4a8]">
              <Lock size={14} />
            </span>
          </div>
          <p className="mt-1.5 text-[0.8rem] leading-relaxed text-[#7a7670]">
            Digite a senha para acessar o material IA Sem Limites.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
            <input
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="Senha de acesso"
              autoFocus
              style={{ fontSize: "16px" }}
              className={`w-full rounded-xl border bg-white/6 px-4 py-3 text-[#e6e2d9] placeholder-[#4e4c48] outline-none transition-colors focus:border-[#f47b4f]/60 ${
                error ? "border-red-500/60" : "border-white/10"
              }`}
            />
            {error && (
              <p className="text-[0.78rem] text-red-400">Senha incorreta. Tente novamente.</p>
            )}
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f47b4f] px-5 py-3.5 text-[0.88rem] font-bold uppercase tracking-wide text-[#1a1916] shadow-[0_8px_24px_rgba(244,123,79,0.35)] transition-all active:scale-95"
            >
              Acessar material
              <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </div>

      {/* ── DESKTOP: card split ── */}
      <div className="fixed inset-0 z-50 hidden items-center justify-center bg-[#0e0e0c] px-6 sm:flex">
        <div className="relative flex w-full max-w-3xl overflow-hidden rounded-3xl border border-white/8 shadow-[0_40px_120px_rgba(0,0,0,0.9)] sm:flex-row">

          {/* Imagem lado esquerdo */}
          <div className="relative shrink-0 overflow-hidden sm:w-[52%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMG}
              alt="IA Sem Limites"
              className="h-full min-h-105 w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#141412]/85" />

            {/* Textos na base da imagem */}
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/95 to-transparent px-6 pb-24 pt-16 text-center">
              <h4
                className="text-[0.85rem] font-bold uppercase leading-none tracking-[0.22em] text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Material do Treinamento
              </h4>
              <h1
                className="mt-2 text-[2.6rem] font-bold uppercase leading-none tracking-tight text-lime-300"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                IA Sem Limites
              </h1>
            </div>
          </div>

          {/* Formulário lado direito */}
          <div className="flex flex-1 flex-col justify-center bg-[#141412] px-8 py-12">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#f47b4f]/35 bg-[#f47b4f]/12 text-[#ffc4a8]">
              <Lock size={18} />
            </span>
            <h1
              className="mt-4 text-[1.55rem] font-bold uppercase leading-tight text-[#ebe7df]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Área exclusiva
            </h1>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-[#7a7670]">
              Digite a senha do treinamento para acessar o material IA Sem Limites.
            </p>
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
              <input
                type="password"
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(false); }}
                placeholder="Senha de acesso"
                autoFocus
                className={`w-full rounded-xl border bg-white/4 px-4 py-3.5 text-[0.9rem] text-[#e6e2d9] placeholder-[#4e4c48] outline-none transition-colors focus:border-[#f47b4f]/60 ${
                  error ? "border-red-500/60" : "border-white/10"
                }`}
              />
              {error && (
                <p className="text-[0.78rem] text-red-400">Senha incorreta. Tente novamente.</p>
              )}
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f47b4f] px-5 py-3.5 text-[0.88rem] font-bold uppercase tracking-wide text-[#1a1916] shadow-[0_8px_24px_rgba(244,123,79,0.35)] transition-all active:scale-95 hover:bg-[#f69069]"
              >
                Acessar material
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
