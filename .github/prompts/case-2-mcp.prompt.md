# 使用可能な情報

- Chakra UI MCP Server に接続して、取得した情報

# 制約

- MCP から取得した情報に存在しないコンポーネント・API の使用は禁止

# タスク

下記 UI 仕様を満たす React コンポーネントを実装してください。

# UI 仕様

## 画面

ユーザー管理画面

### 構成

- ページタイトル「ユーザー」
- ユーザー一覧を Table で表示
- 各行に編集ボタン
- 編集ボタンを押すと Drawer が開く

### Table カラム

- 名前
- メールアドレス
- ロール
- アカウント状態
- 操作（編集ボタン）

### Drawer（編集）

- 名前: Text Input
- メールアドレス: Email Input
- ロール: Select (Admin / Member / Viewer)
- アカウント状態: Switch (有効 / 停止)
- Footer に 保存 / キャンセル ボタン
