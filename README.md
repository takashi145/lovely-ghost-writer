# lovely-ghost-writer

<details>
  <summary>画面</summary>
  <img width="1374" height="1093" alt="image" src="https://github.com/user-attachments/assets/fc228c17-79e0-43c8-947c-bfc361b036e0" />

</details>


## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone git@github.com:takashi145/lovely-ghost-writer.git
cd lovely-ghost-writer
```

### 2. 依存パッケージのインストール

```bash
npm install
```

### 3. 環境変数の設定

```bash
cp .env.example .env
```

OpenAI APIキーを取得・設定 (https://platform.openai.com/api-keys)

```
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. 開発サーバーの起動

```bash
npm run dev
```
