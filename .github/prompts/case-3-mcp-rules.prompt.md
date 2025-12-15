# 使用可能な情報

- Chakra UI MCP Server に接続して、取得した情報
- `docs/rules/` 配下に記載された以下のルール
  - `core-migration-rules.md`: コアルール
  - `component-rules.md`: コンポーネントルール
  - `prop-name-rules.md`: Prop 名ルール

# 制約

- MCP から取得した情報に存在しないコンポーネント・API の使用は禁止
- ルールに反するコンポーネント・API の使用は禁止

# タスク

下記 UI 仕様を満たす React コンポーネントを実装してください。

# UI 仕様

## 画面

ユーザー管理画面

### 構成

- ページタイトル「ユーザー」
- ユーザー一覧を Table で表示
- 検索入力（名前 or メール）
- 「新規登録」ボタン
- 各行に「編集」ボタン
- 「新規登録」「編集」ボタンを押すと Drawer が開く

### Table カラム

- 名前
- メールアドレス
- ロール
- アカウント状態
- 操作（編集ボタン）

### Drawer

- 名前: Text Input
- メールアドレス: Email Input
- ロール: Select (Admin / Member / Viewer)
- アカウント状態: Switch (有効 / 停止)
- Footer に 保存 / キャンセル ボタン

# 成果物の出力先

以下のファイルを作成/修正してください：

- **src/pages/UserManagement.tsx** - ユーザー管理画面の主要コンポーネント
- **src/components/UserTable.tsx** - ユーザー一覧テーブルコンポーネント（オプション）
- **src/components/UserFormDrawer.tsx** - ユーザー登録・編集 Drawer コンポーネント（オプション）
- **src/types/user.ts** - ユーザー関連の型定義（オプション）
- **src/App.tsx** - 作成したコンポーネントをマウント
