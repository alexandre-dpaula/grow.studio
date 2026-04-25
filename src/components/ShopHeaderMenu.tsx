"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { KeyRound, Settings } from "lucide-react";
import {
  SHOP_OPEN_PASSWORD_PANEL_EVENT,
  SHOP_PASSWORD_ENABLED_STORAGE_KEY,
  SHOP_SETTINGS_ACCESS_SESSION_KEY,
  SHOP_TOGGLE_PASSWORD_EVENT,
} from "@/lib/shop-access";

const SETTINGS_PASSWORD = "210199";

export default function ShopHeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(true);
  const [isSettingsUnlocked, setIsSettingsUnlocked] = useState(false);
  const [settingsPasswordInput, setSettingsPasswordInput] = useState("");
  const [settingsError, setSettingsError] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!menuRef.current) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (!menuRef.current.contains(target)) {
        setIsOpen(false);
        setSettingsPasswordInput("");
        setSettingsError(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem(SHOP_PASSWORD_ENABLED_STORAGE_KEY);
    if (saved !== null) {
      setIsPasswordEnabled(saved === "true");
    }

    const hasAccess = window.sessionStorage.getItem(SHOP_SETTINGS_ACCESS_SESSION_KEY);
    if (hasAccess === "true") {
      setIsSettingsUnlocked(true);
    }
  }, []);

  function handleOpenChangePassword() {
    window.dispatchEvent(new Event(SHOP_OPEN_PASSWORD_PANEL_EVENT));
    setIsOpen(false);
  }

  function handleTogglePassword() {
    const nextEnabled = !isPasswordEnabled;
    setIsPasswordEnabled(nextEnabled);
    window.localStorage.setItem(SHOP_PASSWORD_ENABLED_STORAGE_KEY, String(nextEnabled));
    window.dispatchEvent(
      new CustomEvent(SHOP_TOGGLE_PASSWORD_EVENT, { detail: { enabled: nextEnabled } }),
    );
  }

  function handleAuthenticateSettings(event: FormEvent) {
    event.preventDefault();

    if (settingsPasswordInput === SETTINGS_PASSWORD) {
      setIsSettingsUnlocked(true);
      setSettingsPasswordInput("");
      setSettingsError(false);
      window.sessionStorage.setItem(SHOP_SETTINGS_ACCESS_SESSION_KEY, "true");
      return;
    }

    setSettingsError(true);
  }

  return (
    <div
      ref={menuRef}
      className="fixed left-0 right-0 top-0 z-40 flex justify-end px-4 pt-4 sm:px-6 sm:pt-6"
    >
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-black/45 text-[#e6e2d9] backdrop-blur-md transition-colors hover:border-white/22 hover:bg-black/60"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-label="Abrir menu de configuração"
        >
          <Settings size={16} className="text-[#f7d7c9]" />
        </button>

        {isOpen ? (
          <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/14 bg-[#1a1a18]/95 p-2.5 shadow-[0_24px_80px_-36px_rgba(0,0,0,0.95)] backdrop-blur-xl">
            {!isSettingsUnlocked ? (
              <form onSubmit={handleAuthenticateSettings} className="space-y-2 px-1 py-1">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#8f8a82]">
                  Configurações protegidas
                </p>
                <input
                  type="password"
                  value={settingsPasswordInput}
                  onChange={(event) => {
                    setSettingsPasswordInput(event.target.value);
                    setSettingsError(false);
                  }}
                  placeholder="Senha de acesso"
                  className={`w-full rounded-xl border bg-white/4 px-3 py-2.5 text-[0.84rem] text-[#ddd9d1] outline-none transition-colors focus:border-[#f47b4f]/60 ${
                    settingsError ? "border-red-500/60" : "border-white/12"
                  }`}
                />
                {settingsError ? (
                  <p className="text-[0.74rem] text-red-400">Senha incorreta.</p>
                ) : null}
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#f47b4f] px-3 py-2 text-[0.77rem] font-semibold uppercase tracking-[0.08em] text-[#1a1916] transition-colors hover:bg-[#f69069]"
                >
                  Entrar
                </button>
              </form>
            ) : (
              <>
                <p className="px-2 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-[#8f8a82]">
                  Área exclusiva
                </p>
                <div className="mt-1 flex items-center justify-between rounded-xl px-2 py-2">
                  <div>
                    <p className="text-[0.84rem] text-[#ddd9d1]">Senha</p>
                    <p className="text-[0.7rem] text-[#918d86]">
                      {isPasswordEnabled ? "Habilitada" : "Desabilitada"}
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isPasswordEnabled}
                    onClick={handleTogglePassword}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isPasswordEnabled ? "bg-[#f47b4f]" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                        isPasswordEnabled ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleOpenChangePassword}
                  className="mt-1 inline-flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left text-[0.86rem] text-[#ddd9d1] transition-colors hover:bg-white/8"
                >
                  <KeyRound size={15} className="text-[#f7d7c9]" />
                  Alterar a senha
                </button>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
