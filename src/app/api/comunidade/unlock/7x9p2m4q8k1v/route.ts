import { NextResponse } from "next/server";
import {
  COMMUNITY_ACCESS_COOKIE,
  COMMUNITY_UNLOCK_KEY,
} from "@/lib/community-access";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("k");
  const next = url.searchParams.get("next");

  if (key !== COMMUNITY_UNLOCK_KEY) {
    return new NextResponse("Acesso negado", { status: 403 });
  }

  const safeNext =
    typeof next === "string" && next.startsWith("/comunidade")
      ? next
      : "/comunidade?view=chat";

  const [pathname, query = ""] = safeNext.split("?");
  url.pathname = pathname;
  url.search = query;

  const response = NextResponse.redirect(url);
  response.cookies.set(COMMUNITY_ACCESS_COOKIE, "granted", {
    httpOnly: true,
    sameSite: "lax",
    secure: url.protocol === "https:",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
