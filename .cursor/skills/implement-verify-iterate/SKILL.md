---
name: implement-verify-iterate
description: Enforces iterative implementation with verification at each step. Prevents "implement everything then verify at the end". Uses TDD (Red-Green-Refactor) when implementation is complex. Use when implementing features, building apps, following phase guides or curriculum, or when the user asks for implementation with proper verification, TDD, or iterative development.
---

# 実装→確認の反復プロセス

## ガイド・手順書に [USER] / [AGENT] ラベルがある場合

手順書の各Stepに `[USER]` または `[AGENT]` ラベルが付いている場合、**必ず**以下を守る。

| ラベル | 実施者 | エージェントの行動 |
|--------|--------|-------------------|
| `[USER]` | ユーザー | 「ユーザーへの提示内容」をそのまま提示し、**完了確認を待ってから**次のStepに進む。絶対にスキップしない。 |
| `[AGENT]` | エージェント | コード実装・コマンド実行などを**自律的に**実行する。検証・テスト追加など必要なことは判断して実施し、都度ユーザーに確認を求めない。 |

- ❌ `[USER]` のStepを無視して `[AGENT]` のStepに進む
- ✅ `[USER]` のStep → 提示 → 完了確認 → 次へ

**複数ステップのタスク**: 各ステップ完了後にユーザー確認を依頼し、承認を得てから次へ進む。

## 禁止パターン（Anti-Pattern）

- ❌ 実装完了 → まとめて検証
- ❌ 「作りっぱなし」で検証を後回し
- ❌ 検証スクリプトやテストを「あとで書く」
- ❌ Server Action / API を実装したが、そのステップでテストを追加しない（最終検証に回す）

## 正しいプロセス

```
実装（小単位）→ 検証 → OK? → 次へ / NG? → 修正 → 検証 → ...
```

### タスクの粒度

大きな機能は**検証可能な最小単位**に分割する。

| 例 | 良い粒度 |
|----|----------|
| フォーム追加 | 1. フォームUI → 検証 → 2. バリデーション → 検証 → 3. 送信処理 → 検証 |
| API実装 | 1. ルート定義 → 検証 → 2. ハンドラ実装 → 検証 |
| ページ追加 | 1. ページ作成 → 描画確認 → 2. リンク追加 → 遷移確認 |

### 検証の層

| 複雑さ | 検証方法 |
|--------|----------|
| 軽い | 手動・ブラウザ確認、`npm run build`、`npm run lint` |
| 中 | スクリプト検証（例: `verify:pages`）、型チェック |
| 複雑 | **TDD**（レッド・グリーン・リファクタ） |

複雑な実装では [references/tdd.md](references/tdd.md) を参照。TDD の対象はバリデーションに限定されず、Server Actions・API・ビジネスロジックも含む。

### 検証の実行タイミング

各ステップで**必ず**検証を実行する。

- ファイル追加・変更のたびに `build` / `lint` が通るか確認
- **テスト追加・変更のたびに `npm run test` を実行して成功を確認**
- ページ追加のたびにブラウザまたは `verify:pages` で描画確認
- フォーム・認証等のUIは**ブラウザで実際に操作**して確認
- **画像アップロード等**はファイル選択→アップロード→プレビュー→送信まで**一連の流れを実際に実行**して確認する
- **Server Action / API 追加のたびに**：呼び出し・レスポンス確認に加え、**そのステップでテストを追加**する（後回し禁止）。[references/checklist.md](references/checklist.md) のテスト追加ルールに従う

### テスト追加のタイミング（重要）

テストは**最終検証時にまとめて**ではなく、**該当コードを追加・変更したステップの検証時**に必ず追加する。[references/checklist.md](references/checklist.md) のテスト追加ルールを参照し、該当するものは自律的に判断して追加する。

### 最終検証・リグレッション防止

全実装完了時点で [references/checklist.md](references/checklist.md) の**最終検証**を実施。各ステップでテストを追加済みであることを確認する。

## ワークフロー例

```
Task Progress:
- [ ] Step 1: 〇〇を実装
- [ ] Step 1 検証: build/lint/描画 確認
- [ ] Step 2: Server Action を実装
- [ ] Step 2 検証: テスト追加 → npm run test → build/lint
- [ ] 最終検証: [references/checklist.md](references/checklist.md) の全項目
```

※ Server Action / API / バリデーションを追加したステップでは、検証に**テスト追加**を含める。

## 関連

- TDD の詳細・テスト対象一覧: [references/tdd.md](references/tdd.md)
- 最終検証・チェックリスト: [references/checklist.md](references/checklist.md)
- ワークフロー例: [references/examples.md](references/examples.md)
- 検証スクリプト: `scripts/verify-pages.ts`、`npm run verify:pages`
