"use client";

import { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";

const SENHA = "iASEMLIMITES";

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
    <div className="relative min-h-screen overflow-hidden">
      {/* Conteúdo ao fundo com blur */}
      <div className="pointer-events-none select-none blur-sm brightness-50">
        {children}
      </div>

      {/* Overlay + caixa de senha */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-md">
        <div className="w-full max-w-sm">
          <div className="rounded-3xl border border-white/12 bg-[#1a1a18]/90 p-8 shadow-[0_30px_120px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#f47b4f]/35 bg-[#f47b4f]/12 text-[#ffc4a8]">
              <Lock size={20} />
            </span>

            <h1 className="mt-5 font-serif text-2xl text-[#ebe7df]">Área exclusiva</h1>
            <p className="mt-2 text-[0.85rem] text-[#8e8b85]">
              Digite a senha do treinamento para acessar a shop.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-3">
              <input
                type="password"
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(false); }}
                placeholder="Senha"
                autoFocus
                className={`w-full rounded-xl border px-4 py-3 text-[0.9rem] bg-white/[0.04] text-[#e6e2d9] placeholder-[#5e5c58] outline-none transition-colors focus:border-[#f47b4f]/60 ${
                  error ? "border-red-500/60" : "border-white/12"
                }`}
              />
              {error && (
                <p className="text-[0.78rem] text-red-400">Senha incorreta. Tente novamente.</p>
              )}
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f47b4f] px-5 py-3 text-[0.85rem] font-bold uppercase tracking-wide text-[#1f1f1d] transition-colors hover:bg-[#f69069]"
              >
                Entrar
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
