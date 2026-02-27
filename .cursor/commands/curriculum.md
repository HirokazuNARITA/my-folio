# Folio カリキュラム実装・検証

## 引数の解釈

`$ARGUMENTS` を次のように解釈する：

- **形式1**: 数字のみ（例: `5`）  
  → Phase 5、前提「Phase 4 まで実施済み」
- **形式2**: `数字 前提`（例: `5 Phase 4まで実施済み`）  
  → 先頭の数字が Phase 番号、残りが前提

**呼び出し例:**
- `/curriculum 5` → Phase 5
- `/curriculum 5 Phase 4まで実施済み` → Phase 5、前提「Phase 4 まで実施済み」
- `/curriculum 6 Phase 5まで実施済み` → Phase 6、前提「Phase 5 まで実施済み」

---

## タスク

`$ARGUMENTS` で指定された Phase の実装・検証を進めてください。

### 実装内容

- vibe-coding-best-practice-guide の `03_curriculum/phase{N}-guide.md` を読み、指示に従って実装する  
  （N は $ARGUMENTS から取り出した Phase 番号）
- 前提: $ARGUMENTS に前提が含まれる場合はその内容、含まれない場合は「Phase N-1 まで実施済み」

### 常に守ること

- **Skill の活用**: implement-verify-iterate, skill-task-process 等を積極的に使う
- **ログイン**: narita@sansou.co.jp / Sansou123
- **役割分担**:
  - AI: アプリのブラウザ確認（ログイン、CRUD、フォーム操作など）を **Playwright**（user-playwright MCP）で実施
  - ユーザー: Supabase 等の PaaS にログインして確認・操作を実施
- **ブラウザ検証**: cursor-ide-browser は不具合があるため **Playwright** を使用すること
- **UI の微調整**: フォーム等で内容とボタンの間にマージンがない場合は `pt-6` 等で余白を入れる（区切り線は不要）
