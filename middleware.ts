import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase-middleware";

export async function middleware(request: NextRequest) {
  // /admin/login は認証不要（除外しないと無限リダイレクト）
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const { supabase, response } = createClient(request);

  // セッション検証・トークン更新（getClaims が推奨）
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
