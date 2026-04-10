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

export default function CommunityConversationsList() {
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
      <div className="mt-6 rounded-[16px] border border-[#2f89f0] bg-[rgba(56,56,54,0.68)] px-4 py-3 shadow-[0_0_0_1px_rgba(47,137,240,0.45)]">
        <label className="flex items-center gap-3 text-[#bcb8b1]">
          <Search size={15} className="text-[#cdc9c2]" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Procurar nas suas conversas..."
            className="w-full bg-transparent text-[0.86rem] text-[#d9d5ce] placeholder:text-[#a6a29b] outline-none"
          />
        </label>
      </div>

      <p className="mt-4 text-[0.86rem] text-[#aaa69f]">
        Suas conversas com o Agente Grow+
      </p>

      {filteredConversations.length ? (
        <ul className="mt-4 divide-y divide-white/8 border-y border-white/8">
          {filteredConversations.map((conversation) => (
            <li key={conversation.id}>
              <Link
                href={`/comunidade?view=thread&id=${conversation.id}`}
                className="block px-2 py-4 transition-colors hover:bg-white/5"
              >
                <div className="flex items-center gap-4">
                  <Square size={18} className="text-[#6f6c66]" />
                  <div>
                    <p className="text-[1rem] font-medium leading-tight text-[#ddd9d2]">
                      {conversation.title}
                    </p>
                    <p className="mt-1 text-[0.86rem] text-[#9f9b94]">
                      {formatLastMessageTime(conversation.updatedAt)}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-xl border border-white/8 bg-white/3 px-4 py-5 text-[0.86rem] text-[#9f9b94]">
          Nenhuma conversa encontrada.
        </div>
      )}
    </>
  );
}
