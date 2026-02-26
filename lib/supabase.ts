import { createBrowserClient } from "@supabase/ssr";

// Phase 2 で認証機能を実装する際に使用
// クライアントコンポーネント用
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
