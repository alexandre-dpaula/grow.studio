"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import {
  COMMUNITY_CONVERSATIONS_UPDATED_EVENT,
  deleteCommunityConversation,
  loadCommunityConversations,
  renameCommunityConversation,
  type StoredConversation,
} from "@/lib/community-conversations";

type CommunityRecentsListProps = {
  activeConversationId?: string | null;
};

export default function CommunityRecentsList({
  activeConversationId,
}: CommunityRecentsListProps) {
  const router = useRouter();
  const [conversations, setConversations] = useState<StoredConversation[]>([]);
  const [openedMenuConversationId, setOpenedMenuConversationId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const refresh = () => {
      setConversations(loadCommunityConversations().slice(0, 12));
    };

    refresh();
    window.addEventListener(COMMUNITY_CONVERSATIONS_UPDATED_EVENT, refresh);
    return () => {
      window.removeEventListener(COMMUNITY_CONVERSATIONS_UPDATED_EVENT, refresh);
    };
  }, []);

  useEffect(() => {
    if (!openedMenuConversationId) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (target.closest("[data-recent-menu-root='true']")) {
        return;
      }

      setOpenedMenuConversationId(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenedMenuConversationId(null);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openedMenuConversationId]);

  function handleRename(conversation: StoredConversation) {
    const nextTitle = window.prompt("Renomear conversa:", conversation.title);
    if (nextTitle === null) {
      setOpenedMenuConversationId(null);
      return;
    }

    const normalizedTitle = nextTitle.replace(/\s+/g, " ").trim();
    if (!normalizedTitle || normalizedTitle === conversation.title) {
      setOpenedMenuConversationId(null);
      return;
    }

    const updated = renameCommunityConversation(
      conversation.id,
      normalizedTitle,
      conversations,
    );
    setConversations(updated.slice(0, 12));
    setOpenedMenuConversationId(null);
  }

  function handleDelete(conversation: StoredConversation) {
    const confirmed = window.confirm(`Apagar conversa "${conversation.title}"?`);
    if (!confirmed) {
      setOpenedMenuConversationId(null);
      return;
    }

    const updated = deleteCommunityConversation(conversation.id, conversations);
    setConversations(updated.slice(0, 12));
    setOpenedMenuConversationId(null);

    if (activeConversationId === conversation.id) {
      router.push("/comunidade?view=chat");
    }
  }

  if (!conversations.length) {
    return (
      <p className="px-3 py-2 text-[0.82rem] text-[#8f8c86]">
        Nenhuma conversa ainda.
      </p>
    );
  }

  return (
    <ul className="space-y-1">
      {conversations.map((conversation) => {
        const isActive = activeConversationId === conversation.id;
        const isMenuOpen = openedMenuConversationId === conversation.id;

        return (
          <li
            key={conversation.id}
            className="group relative"
            data-recent-menu-root="true"
          >
            <Link
              href={`/comunidade?view=thread&id=${conversation.id}`}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 pr-10 text-left text-[0.9rem] transition-colors ${
                isActive
                  ? "bg-black/55 text-[#e2dfd7]"
                  : "text-[#afaca6] hover:bg-white/6 hover:text-[#d6d3cb]"
              }`}
            >
              <span className="truncate">{conversation.title}</span>
            </Link>

            <button
              type="button"
              aria-label={`Ações da conversa ${conversation.title}`}
              onClick={() =>
                setOpenedMenuConversationId((current) =>
                  current === conversation.id ? null : conversation.id,
                )
              }
              className={`absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-white/65 transition-colors hover:bg-white/8 hover:text-white ${
                isActive || isMenuOpen
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <MoreHorizontal size={14} />
            </button>

            {isMenuOpen ? (
              <div className="absolute right-2 top-[calc(100%+4px)] z-20 w-36 rounded-xl border border-white/12 bg-[#2a2a28] p-1.5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)]">
                <button
                  type="button"
                  onClick={() => handleRename(conversation)}
                  className="w-full rounded-lg px-2.5 py-2 text-left text-[0.82rem] text-[#d7d3cb] transition-colors hover:bg-white/8"
                >
                  Renomear
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(conversation)}
                  className="w-full rounded-lg border border-[#f47b4f]/55 bg-[#f47b4f] px-2.5 py-2 text-left text-[0.82rem] font-medium text-[#1f1f1d] transition-colors hover:bg-[#f69069] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f47b4f]/60"
                >
                  Apagar
                </button>
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
