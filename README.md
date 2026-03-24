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

`.env.example` をコピーして `.env.local` を作成し、値を設定してください。

```bash
cp .env.example .env.local
```

値は README には書きません。各変数の取得元は下表を参照してください。

| 変数名 | 用途 | 取得元 |
|--------|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase プロジェクト URL | Supabase ダッシュボード |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 公開キー（anon） | Supabase ダッシュボード |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 秘密キー（**サーバーサイドのみ**） | Supabase ダッシュボード |
| `DATABASE_URL` | Prisma 用 Postgres 接続文字列（**サーバーサイドのみ**） | Supabase → Connect |
| `UPLOADTHING_TOKEN` | UploadThing API トークン（**サーバーサイドのみ**） | uploadthing.com |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe 公開可能キー | Stripe ダッシュボード |
| `STRIPE_SECRET_KEY` | Stripe シークレットキー（**サーバーサイドのみ**） | Stripe ダッシュボード |
| `NEXT_PUBLIC_APP_URL` | アプリのベース URL | 手動（ローカルは `http://localhost:3000`、本番は Vercel の URL） |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook 署名シークレット（**サーバーサイドのみ**） | Stripe CLI / Stripe ダッシュボード |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog プロジェクト API キー | PostHog ダッシュボード |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog インジェスト URL | PostHog（例: `https://us.i.posthog.com`） |
| `SENTRY_AUTH_TOKEN` | Sentry ビルド用認証トークン（**サーバーサイドのみ**、主に CI / Vercel ビルド） | Sentry（ローカルは `.env.sentry-build-plugin` に保存されることもある） |

> ⚠️ `SUPABASE_SERVICE_ROLE_KEY`・`STRIPE_SECRET_KEY`・`DATABASE_URL`・`STRIPE_WEBHOOK_SECRET`・`SENTRY_AUTH_TOKEN` は絶対に GitHub に公開しないこと。

## Phase 実装状況

- [x] **Phase 1: デプロイ基盤** — Next.js・shadcn/ui・Prisma・Supabase 接続設定・フォルダ構造
- [ ] Phase 2: 認証
- [ ] Phase 3: UI構築
- [ ] Phase 4: フォーム・DB
- [x] **Phase 5: ファイルアップロード** — UploadThing による画像アップロード
- [ ] Phase 6: 決済
- [ ] Phase 7: 監視・分析
- [x] **Phase 8: 環境変数管理** — `.env.example`・README・シークレット取り扱いの整理

## 参考

- [vibe-coding-best-practice-guide](https://github.com/HirokazuNARITA/vibe-coding-best-practice-guide)
