export const COMMUNITY_ACCESS_COOKIE = "community_access";
export const COMMUNITY_UNLOCK_PATH = "/api/comunidade/unlock/7x9p2m4q8k1v";
export const COMMUNITY_UNLOCK_KEY = "k_49f2b1a8e7c6d5f4";

export function getCommunityUnlockHref(next: string = "/comunidade?view=chat") {
  const params = new URLSearchParams({
    k: COMMUNITY_UNLOCK_KEY,
    next,
  });

  return `${COMMUNITY_UNLOCK_PATH}?${params.toString()}`;
}
