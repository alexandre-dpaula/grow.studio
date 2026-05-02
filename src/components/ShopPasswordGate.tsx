"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Lock, ArrowRight } from "lucide-react";
import {
  SHOP_DEFAULT_PASSWORD,
  SHOP_IDLE_TIMEOUT_MS,
  SHOP_LAST_ACTIVITY_SESSION_KEY,
  SHOP_OPEN_PASSWORD_PANEL_EVENT,
  SHOP_PASSWORD_ENABLED_STORAGE_KEY,
  SHOP_PASSWORD_STORAGE_KEY,
  SHOP_TOGGLE_PASSWORD_EVENT,
} from "@/lib/shop-access";

const IMG = "/2hf_20260314_230539_c5efb4e7-1371-4502-90d5-c2f4d6eee79e.jpg";

export default function ShopPasswordGate({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [sessionMessage, setSessionMessage] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(true);
  const [password, setPassword] = useState(SHOP_DEFAULT_PASSWORD);
  const [isPasswordPanelOpen, setIsPasswordPanelOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordPanelError, setPasswordPanelError] = useState("");
  const [passwordPanelSuccess, setPasswordPanelSuccess] = useState("");
  const activityWriteRef = useRef(0);

  function clearAccessSession() {
    window.sessionStorage.removeItem(SHOP_LAST_ACTIVITY_SESSION_KEY);
  }

  function hasActiveSession() {
    const raw = window.sessionStorage.getItem(SHOP_LAST_ACTIVITY_SESSION_KEY);
    if (!raw) {
      return false;
    }

    const lastActivity = Number(raw);
    if (!Number.isFinite(lastActivity)) {
      return false;
    }

    return Date.now() - lastActivity < SHOP_IDLE_TIMEOUT_MS;
  }

  function persistActivity(force = false) {
    const now = Date.now();
    if (!force && now - activityWriteRef.current < 15000) {
      return;
    }

    activityWriteRef.current = now;
    window.sessionStorage.setItem(SHOP_LAST_ACTIVITY_SESSION_KEY, String(now));
  }

  function lockAccess(message: string) {
    clearAccessSession();
    setUnlocked(false);
    setIsPasswordPanelOpen(false);
    setError(false);
    setInput("");
    setSessionMessage(message);
  }

  useEffect(() => {
    const storedPassword = window.localStorage.getItem(SHOP_PASSWORD_STORAGE_KEY);
    if (storedPassword) {
      setPassword(storedPassword);
    }

    const storedPasswordEnabled = window.localStorage.getItem(SHOP_PASSWORD_ENABLED_STORAGE_KEY);
    let enabled = true;

    if (storedPasswordEnabled !== null) {
      enabled = storedPasswordEnabled === "true";
      setIsPasswordEnabled(enabled);
    }

    if (!enabled) {
      setUnlocked(true);
      clearAccessSession();
      return;
    }

    if (hasActiveSession()) {
      setUnlocked(true);
      persistActivity(true);
    } else {
      clearAccessSession();
      setUnlocked(false);
    }
  }, []);

  useEffect(() => {
    function onOpenPasswordPanel() {
      if (!unlocked) {
        return;
      }
      setIsPasswordPanelOpen(true);
      setPasswordPanelError("");
      setPasswordPanelSuccess("");
      setSessionMessage("");
    }

    window.addEventListener(SHOP_OPEN_PASSWORD_PANEL_EVENT, onOpenPasswordPanel);
    return () => window.removeEventListener(SHOP_OPEN_PASSWORD_PANEL_EVENT, onOpenPasswordPanel);
  }, [unlocked]);

  useEffect(() => {
    function onTogglePasswordEnabled(event: Event) {
      const customEvent = event as CustomEvent<{ enabled?: boolean }>;
      const enabled = customEvent.detail?.enabled ?? true;
      setIsPasswordEnabled(enabled);
      window.localStorage.setItem(SHOP_PASSWORD_ENABLED_STORAGE_KEY, String(enabled));

      if (!enabled) {
        clearAccessSession();
        setUnlocked(true);
        setIsPasswordPanelOpen(false);
        setError(false);
        setInput("");
        setSessionMessage("");
        return;
      }

      clearAccessSession();
      setIsPasswordPanelOpen(false);
      setUnlocked(false);
      setError(false);
      setInput("");
      setSessionMessage("Senha habilitada. Faça login novamente.");
    }

    window.addEventListener(SHOP_TOGGLE_PASSWORD_EVENT, onTogglePasswordEnabled);
    return () => window.removeEventListener(SHOP_TOGGLE_PASSWORD_EVENT, onTogglePasswordEnabled);
  }, []);

  useEffect(() => {
    if (!unlocked || !isPasswordEnabled) {
      return;
    }

    persistActivity(true);
    setSessionMessage("");

    function onActivity() {
      persistActivity();
    }

    function verifyIdleTimeout() {
      if (!hasActiveSession()) {
        lockAccess("Sessão expirada após 1h de inatividade. Digite a senha novamente.");
      }
    }

    function onVisibilityChange() {
      if (document.visibilityState !== "visible") {
        return;
      }
      verifyIdleTimeout();
      persistActivity();
    }

    const activityEvents: Array<keyof WindowEventMap> = [
      "click",
      "keydown",
      "mousemove",
      "scroll",
      "touchstart",
    ];

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, onActivity, { passive: true });
    });

    document.addEventListener("visibilitychange", onVisibilityChange);
    const intervalId = window.setInterval(verifyIdleTimeout, 30000);

    return () => {
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, onActivity);
      });
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.clearInterval(intervalId);
    };
  }, [isPasswordEnabled, unlocked]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isPasswordEnabled) {
      setUnlocked(true);
      setSessionMessage("");
      return;
    }

    if (input === password) {
      setUnlocked(true);
      setError(false);
      setSessionMessage("");
      persistActivity(true);
    } else {
      setError(true);
      setInput("");
      setSessionMessage("");
    }
  }

  function resetPasswordPanelFields() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordPanelError("");
  }

  function closePasswordPanel() {
    setIsPasswordPanelOpen(false);
    resetPasswordPanelFields();
    setPasswordPanelSuccess("");
  }

  function handleChangePassword(e: FormEvent) {
    e.preventDefault();
    setPasswordPanelError("");
    setPasswordPanelSuccess("");

    if (currentPassword !== password) {
      setPasswordPanelError("A senha atual está incorreta.");
      return;
    }

    if (newPassword.length < 4) {
      setPasswordPanelError("A nova senha precisa ter pelo menos 4 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordPanelError("A confirmação da senha não confere.");
      return;
    }

    if (newPassword === password) {
      setPasswordPanelError("A nova senha precisa ser diferente da senha atual.");
      return;
    }

    setPassword(newPassword);
    window.localStorage.setItem(SHOP_PASSWORD_STORAGE_KEY, newPassword);
    resetPasswordPanelFields();
    setPasswordPanelSuccess("Senha alterada com sucesso.");
  }

  if (unlocked) {
    return (
      <>
        {children}
        {isPasswordPanelOpen ? (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4">
            <div className="w-full max-w-md rounded-2xl border border-white/14 bg-[#151513] p-5 shadow-[0_36px_120px_-48px_rgba(0,0,0,0.95)] sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#8f8a82]">
                    Área exclusiva
                  </p>
                  <h2 className="mt-1 text-[1.1rem] font-semibold text-[#e6e2d9]">
                    Alterar a senha
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closePasswordPanel}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/12 text-white/70 transition-colors hover:bg-white/8"
                  aria-label="Fechar painel de alteração de senha"
                >
                  X
                </button>
              </div>

              <form onSubmit={handleChangePassword} className="mt-5 space-y-3">
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Senha atual"
                  className="w-full rounded-xl border border-white/12 bg-white/4 px-3.5 py-3 text-[0.88rem] text-[#e6e2d9] placeholder-[#5c5a56] outline-none transition-colors focus:border-[#f47b4f]/60"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nova senha"
                  className="w-full rounded-xl border border-white/12 bg-white/4 px-3.5 py-3 text-[0.88rem] text-[#e6e2d9] placeholder-[#5c5a56] outline-none transition-colors focus:border-[#f47b4f]/60"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmar nova senha"
                  className="w-full rounded-xl border border-white/12 bg-white/4 px-3.5 py-3 text-[0.88rem] text-[#e6e2d9] placeholder-[#5c5a56] outline-none transition-colors focus:border-[#f47b4f]/60"
                />

                {passwordPanelError ? (
                  <p className="text-[0.78rem] text-red-400">{passwordPanelError}</p>
                ) : null}
                {passwordPanelSuccess ? (
                  <p className="text-[0.78rem] text-lime-300">{passwordPanelSuccess}</p>
                ) : null}

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={closePasswordPanel}
                    className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/14 px-4 py-2.5 text-[0.82rem] font-semibold uppercase tracking-[0.06em] text-[#d7d3cb] transition-colors hover:bg-white/8"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#f47b4f] px-4 py-2.5 text-[0.82rem] font-semibold uppercase tracking-[0.06em] text-[#1a1916] transition-colors hover:bg-[#f69069]"
                  >
                    Salvar senha
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </>
    );
  }

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
          <p className="mt-1 text-[0.72rem] text-[#8a867f]">
            A sessão expira em 1h de inatividade e ao fechar a aba.
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
            {!error && sessionMessage ? (
              <p className="text-[0.78rem] text-[#f7d7c9]">{sessionMessage}</p>
            ) : null}
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
            <p className="mt-1 text-[0.74rem] text-[#8a867f]">
              A sessão expira em 1h de inatividade e ao fechar a aba.
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
              {!error && sessionMessage ? (
                <p className="text-[0.78rem] text-[#f7d7c9]">{sessionMessage}</p>
              ) : null}
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
