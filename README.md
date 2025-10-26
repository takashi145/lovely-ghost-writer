# lovely-ghost-writer

<details>
  <summary>画面</summary>
  <img width="1321" height="1073" alt="image" src="https://github.com/user-attachments/assets/81e85e00-9580-425c-b09e-d8c21397b554" />
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
