// Phase 2 で /admin 以下を認証保護

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  void request; // Phase 2 で認証チェックに使用
  // Phase 2 で Supabase Auth セッションをチェック
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
