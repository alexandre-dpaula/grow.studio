"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Square } from "lucide-react";
import {
  COMMUNITY_CONVERSATIONS_UPDATED_EVENT,
  formatLastMessageTime,
  loadCommunityConversations,
  type StoredConversation,
} from "@/lib/community-conversations";

type ThemeMode = "dark" | "light";

type CommunityConversationsListProps = {
  theme?: ThemeMode;
};

function withThemeOnThreadHref(conversationId: string, theme: ThemeMode) {
  const params = new URLSearchParams({
    view: "thread",
    id: conversationId,
  });
  if (theme === "light") {
    params.set("theme", "light");
  }
  return `/comunidade?${params.toString()}`;
}

export default function CommunityConversationsList({
  theme = "dark",
}: CommunityConversationsListProps) {
  const isLightTheme = theme === "light";
  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState<StoredConversation[]>([]);

  useEffect(() => {
    const refresh = () => {
      setConversations(loadCommunityConversations());
    };

    refresh();
    window.addEventListener(COMMUNITY_CONVERSATIONS_UPDATED_EVENT, refresh);
    return () => {
      window.removeEventListener(COMMUNITY_CONVERSATIONS_UPDATED_EVENT, refresh);
    };
  }, []);

  const filteredConversations = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) {
      return conversations;
    }

    return conversations.filter((conversation) =>
      conversation.title.toLowerCase().includes(normalizedSearch),
    );
  }, [conversations, search]);

  return (
    <>
      <div
        className={`mt-6 rounded-[16px] border px-4 py-3 ${
          isLightTheme
            ? "border-[#E0DDD8] bg-[#FFFFFF] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
            : "border-[#2f89f0] bg-[rgba(56,56,54,0.68)] shadow-[0_0_0_1px_rgba(47,137,240,0.45)]"
        }`}
      >
        <label
          className={`flex items-center gap-3 ${
            isLightTheme ? "text-[#1A1A18]" : "text-[#bcb8b1]"
          }`}
        >
          <Search size={15} className={isLightTheme ? "text-[#1A1A18]" : "text-[#cdc9c2]"} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Procurar nas suas conversas..."
            className={`w-full bg-transparent text-[0.86rem] outline-none ${
              isLightTheme
                ? "text-[#1A1A18] placeholder:text-[#A0A09C]"
                : "text-[#d9d5ce] placeholder:text-[#a6a29b]"
            }`}
          />
        </label>
      </div>

      <p className={`mt-4 text-[0.86rem] ${isLightTheme ? "text-[#1A1A18]" : "text-[#aaa69f]"}`}>
        Suas conversas com o Agente Grow+
      </p>

      {filteredConversations.length ? (
        <ul
          className={`mt-4 divide-y border-y ${
            isLightTheme
              ? "divide-[#ECEAE6] border-[#ECEAE6]"
              : "divide-white/8 border-white/8"
          }`}
        >
          {filteredConversations.map((conversation) => (
            <li key={conversation.id}>
              <Link
                href={withThemeOnThreadHref(conversation.id, theme)}
                className={`block px-2 py-4 transition-colors ${
                  isLightTheme ? "hover:bg-[#ECEAE6]" : "hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Square size={18} className={isLightTheme ? "text-[#1A1A18]" : "text-[#6f6c66]"} />
                  <div>
                    <p
                      className={`text-[1rem] font-medium leading-tight ${
                        isLightTheme ? "text-[#1A1A18]" : "text-[#ddd9d2]"
                      }`}
                    >
                      {conversation.title}
                    </p>
                    <p className={`mt-1 text-[0.86rem] ${isLightTheme ? "text-[#1A1A18]" : "text-[#9f9b94]"}`}>
                      {formatLastMessageTime(conversation.updatedAt)}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div
          className={`mt-4 rounded-xl border px-4 py-5 text-[0.86rem] ${
            isLightTheme
              ? "border-[#ECEAE6] bg-[#F8F7F4] text-[#1A1A18]"
              : "border-white/8 bg-white/3 text-[#9f9b94]"
          }`}
        >
          Nenhuma conversa encontrada.
        </div>
      )}
    </>
  );
}
