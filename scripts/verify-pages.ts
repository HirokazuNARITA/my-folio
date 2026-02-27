/**
 * 各ページの描画確認スクリプト
 * 実行: npx tsx scripts/verify-pages.ts
 * 事前に npm run dev でサーバーを起動しておくこと
 */

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const PAGES: { path: string; expectedInBody: string[] }[] = [
  {
    path: "/",
    expectedInBody: ["Folio", "作品一覧"],
  },
  {
    path: "/admin",
    expectedInBody: ["ログイン"],
  },
  {
    path: "/admin/login",
    expectedInBody: ["ログイン", "管理画面"],
  },
  {
    path: "/admin/works/new",
    expectedInBody: ["ログイン"],
  },
  {
    path: "/admin/works/test-id/edit",
    expectedInBody: ["ログイン"],
  },
  {
    path: "/works/1",
    expectedInBody: ["一覧に戻る", "イラスト集：春の風景"],
  },
  {
    path: "/works/test-id/success",
    expectedInBody: ["購入ありがとうございました", "Phase 6"],
  },
];

async function verify() {
  let failed = 0;
  for (const { path, expectedInBody } of PAGES) {
    try {
      const res = await fetch(`${BASE}${path}`);
      const html = await res.text();

      const ok = res.ok && expectedInBody.every((s) => html.includes(s));
      const status = ok ? "✓" : "✗";
      console.log(`${status} ${path} (HTTP ${res.status})`);

      if (!ok) {
        failed++;
        for (const s of expectedInBody) {
          if (!html.includes(s)) {
            console.log(`  - 不足: "${s}"`);
          }
        }
      }
    } catch (e) {
      console.log(`✗ ${path} - ${(e as Error).message}`);
      failed++;
    }
  }
  process.exit(failed > 0 ? 1 : 0);
}

verify();
