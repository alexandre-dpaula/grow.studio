export type ChatRole = "user" | "assistant";

export type StoredConversationMessage = {
  role: ChatRole;
  content: string;
  createdAt: string;
};

export type StoredConversation = {
  id: string;
  title: string;
  messages: StoredConversationMessage[];
  createdAt: string;
  updatedAt: string;
};

export const COMMUNITY_CONVERSATIONS_STORAGE_KEY =
  "grow-community-conversations-v1";
export const COMMUNITY_CONVERSATIONS_UPDATED_EVENT =
  "grow-community-conversations-updated";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isRole(value: unknown): value is ChatRole {
  return value === "user" || value === "assistant";
}

function toDateValue(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

function normalizeMessage(value: unknown): StoredConversationMessage | null {
  if (!isObject(value)) {
    return null;
  }

  const role = value.role;
  const content = value.content;
  const createdAt = toDateValue(value.createdAt);

  if (!isRole(role) || typeof content !== "string" || !content.trim() || !createdAt) {
    return null;
  }

  return {
    role,
    content: content.trim(),
    createdAt,
  };
}

function normalizeConversation(value: unknown): StoredConversation | null {
  if (!isObject(value)) {
    return null;
  }

  const id = value.id;
  const title = value.title;
  const messagesRaw = value.messages;
  const createdAt = toDateValue(value.createdAt);
  const updatedAt = toDateValue(value.updatedAt);

  if (
    typeof id !== "string" ||
    !id.trim() ||
    typeof title !== "string" ||
    !title.trim() ||
    !Array.isArray(messagesRaw) ||
    !createdAt ||
    !updatedAt
  ) {
    return null;
  }

  const messages = messagesRaw
    .map(normalizeMessage)
    .filter((message): message is StoredConversationMessage => message !== null);

  return {
    id,
    title: title.trim(),
    messages,
    createdAt,
    updatedAt,
  };
}

function sortByUpdatedAtDesc(a: StoredConversation, b: StoredConversation) {
  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
}

export function loadCommunityConversations(): StoredConversation[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(COMMUNITY_CONVERSATIONS_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map(normalizeConversation)
      .filter((conversation): conversation is StoredConversation => conversation !== null)
      .sort(sortByUpdatedAtDesc);
  } catch {
    return [];
  }
}

export function saveCommunityConversations(conversations: StoredConversation[]) {
  if (typeof window === "undefined") {
    return;
  }

  const normalized = [...conversations].sort(sortByUpdatedAtDesc);
  window.localStorage.setItem(
    COMMUNITY_CONVERSATIONS_STORAGE_KEY,
    JSON.stringify(normalized),
  );
  window.dispatchEvent(new Event(COMMUNITY_CONVERSATIONS_UPDATED_EVENT));
}

export function upsertConversation(
  nextConversation: StoredConversation,
  currentConversations?: StoredConversation[],
) {
  const base = currentConversations ?? loadCommunityConversations();
  const merged = [
    nextConversation,
    ...base.filter((conversation) => conversation.id !== nextConversation.id),
  ];
  saveCommunityConversations(merged);
  return merged.sort(sortByUpdatedAtDesc);
}

export function renameCommunityConversation(
  conversationId: string,
  nextTitle: string,
  currentConversations?: StoredConversation[],
) {
  const normalizedTitle = nextTitle.replace(/\s+/g, " ").trim();
  if (!normalizedTitle) {
    return loadCommunityConversations();
  }

  const base = currentConversations ?? loadCommunityConversations();
  const now = new Date().toISOString();
  const renamed = base.map((conversation) =>
    conversation.id === conversationId
      ? {
          ...conversation,
          title: normalizedTitle,
          updatedAt: now,
        }
      : conversation,
  );

  saveCommunityConversations(renamed);
  return renamed.sort(sortByUpdatedAtDesc);
}

export function deleteCommunityConversation(
  conversationId: string,
  currentConversations?: StoredConversation[],
) {
  const base = currentConversations ?? loadCommunityConversations();
  const filtered = base.filter((conversation) => conversation.id !== conversationId);
  saveCommunityConversations(filtered);
  return filtered.sort(sortByUpdatedAtDesc);
}

export function createConversationTitleFromPrompt(prompt: string) {
  const normalized = prompt.replace(/\s+/g, " ").trim();
  if (!normalized) {
    return "Nova conversa";
  }
  if (normalized.length <= 44) {
    return normalized;
  }
  return `${normalized.slice(0, 41)}...`;
}

function pluralize(value: number, singular: string, plural: string) {
  return value === 1 ? singular : plural;
}

export function formatLastMessageTime(updatedAt: string) {
  const now = Date.now();
  const target = new Date(updatedAt).getTime();
  const diffMs = Math.max(0, now - target);

  const minutes = Math.floor(diffMs / (1000 * 60));
  if (minutes < 60) {
    const value = Math.max(1, minutes);
    return `Última mensagem há ${value} ${pluralize(value, "minuto", "minutos")}`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `Última mensagem há ${hours} ${pluralize(hours, "hora", "horas")}`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `Última mensagem há ${days} ${pluralize(days, "dia", "dias")}`;
  }

  const months = Math.floor(days / 30);
  return `Última mensagem há ${months} ${pluralize(months, "mês", "meses")}`;
}
