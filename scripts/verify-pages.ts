/**
 * 各ページの描画確認スクリプト
 * 実行: npx tsx scripts/verify-pages.ts
 * 事前に npm run dev でサーバーを起動しておくこと
 */

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const PAGES: { path: string; expectedInBody: string[] }[] = [
  {
    path: "/",
    expectedInBody: ["Folio", "Phase 1 完了", "Getting Started"],
  },
  {
    path: "/admin",
    expectedInBody: ["管理ダッシュボード", "Phase 2"],
  },
  {
    path: "/admin/login",
    expectedInBody: ["ログイン", "Phase 2"],
  },
  {
    path: "/admin/works/new",
    expectedInBody: ["作品を追加", "Phase 4"],
  },
  {
    path: "/admin/works/test-id/edit",
    expectedInBody: ["作品を編集", "Phase 4"],
  },
  {
    path: "/works/test-id",
    expectedInBody: ["作品詳細", "Phase 3"],
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
