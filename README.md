# Folio — クリエイター向け作品公開・販売サイト

デザイナー・イラストレーターが自分の作品を公開・販売する個人サイトのサンプルアプリ。  
Vibe Coding ベストプラクティス研修用。

## 技術スタック

- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS + shadcn/ui
- Supabase (Postgres + Auth)
- Prisma (ORM)
- Vercel (デプロイ)

## ローカルでの起動方法

```bash
# 依存関係のインストール
npm install

# 環境変数を設定（.env.example をコピーして .env.local を作成し、値を記入）
cp .env.example .env.local

# 開発サーバー起動
npm run dev
```

`http://localhost:3000` でアクセスできます。

## 必要な環境変数

`.env.local` に以下を設定してください。値は記載しません。

| 変数名 | 用途 |
|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase プロジェクト URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 公開キー（anon） |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 秘密キー（サーバーサイドのみ） |
| `DATABASE_URL` | Prisma 用 Postgres 接続文字列 |

> ⚠️ `SUPABASE_SERVICE_ROLE_KEY` と `DATABASE_URL` は絶対に GitHub に公開しないこと。

## Phase 実装状況

- [x] **Phase 1: デプロイ基盤** — Next.js・shadcn/ui・Prisma・Supabase 接続設定・フォルダ構造
- [ ] Phase 2: 認証
- [ ] Phase 3: UI構築
- [ ] Phase 4: フォーム・DB
- [ ] Phase 5: ファイルアップロード
- [ ] Phase 6: 決済
- [ ] Phase 7: 監視・分析
- [ ] Phase 8: 環境変数管理

## 参考

- [vibe-coding-best-practice-guide](https://github.com/HirokazuNARITA/vibe-coding-best-practice-guide)
