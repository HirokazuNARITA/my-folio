---
name: implement-verify-iterate
description: Enforces iterative implementation with verification at each step. Prevents "implement everything then verify at the end". Uses TDD (Red-Green-Refactor) when implementation is complex. Use when implementing features, building apps, or when the user asks for implementation with proper verification, TDD, or iterative development.
---

# 実装→確認の反復プロセス

## 禁止パターン（Anti-Pattern）

実装を一気に全部終えてから最後に確認する方式は禁止とする。

- ❌ 実装完了 → まとめて検証
- ❌ 「作りっぱなし」で検証を後回し
- ❌ 検証スクリプトやテストを「あとで書く」

## 正しいプロセス

実装と検証を**再帰的に**繰り返す。

```
実装（小単位）→ 検証 → OK? → 次へ / NG? → 修正 → 検証 → ...
```

### 1. タスクの粒度

大きな機能は**検証可能な最小単位**に分割する。

| 例 | 良い粒度 |
|----|----------|
| フォーム追加 | 1. フォームUI → 検証 → 2. バリデーション → 検証 → 3. 送信処理 → 検証 |
| API実装 | 1. ルート定義 → 検証 → 2. ハンドラ実装 → 検証 |
| ページ追加 | 1. ページ作成 → 描画確認 → 2. リンク追加 → 遷移確認 |

### 2. 検証の層

実装の複雑さに応じて検証方法を選ぶ。

| 複雑さ | 検証方法 |
|--------|----------|
| 軽い | 手動・ブラウザ確認、`npm run build`、`npm run lint` |
| 中 | スクリプト検証（例: `verify:pages`）、型チェック |
| 複雑 | **TDD**（レッド・グリーン・リファクタ） |

### 3. TDD（実装が複雑なとき）

和田卓人（t-wada）式の TDD サイクルを採用する。

1. **RED**: 失敗するテストを書く
2. **GREEN**: テストが通る最小の実装を行う
3. **REFACTOR**: 重複を消し、設計を整える
4. 次のテストへ（1に戻る）

複雑なロジック・ビジネスルール・API はテストを先に書く。

### 4. 検証の実行タイミング

各ステップで**必ず**検証を実行する。

- ファイル追加・変更のたびに `build` / `lint` が通るか確認
- ページ追加のたびにブラウザまたは `verify:pages` で描画確認
- Server Action / API 追加のたびに呼び出し・レスポンス確認

### 5. 最終検証

全実装完了時点で以下を実施し、すべて通ることを確認する。

- [ ] `npm run build` 成功
- [ ] `npm run lint` 成功（エラー0）
- [ ] 全ページの描画確認（ブラウザ or `verify:pages`）
- [ ] ユニットテスト / E2E が存在する場合、全テスト成功
- [ ] 仕様・チェックリストとの照合

## ワークフロー例

```
Task Progress:
- [ ] Step 1: 〇〇を実装
- [ ] Step 1 検証: build/lint/描画 確認
- [ ] Step 2: △△を実装
- [ ] Step 2 検証: 〜
- [ ] 最終検証: 全項目チェック
```

## チェックリスト（毎回の実装後）

- [ ] ビルドは通るか
- [ ] Lint エラーはないか
- [ ] 追加・変更した画面は正しく描画されるか（ブラウザツール推奨）
- [ ] 複雑なロジックはテストを書いたか（TDD）

## 関連

- TDD の詳細: [reference.md](reference.md)
- ワークフロー例: [examples.md](examples.md)
- 検証スクリプト: `scripts/verify-pages.ts`、`npm run verify:pages`
