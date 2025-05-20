# メルカリ商品説明文生成ツール

メルカリでの出品時に、商品情報から魅力的な説明文を自動生成する Web アプリケーションです。

## 主な機能

- 商品名、カテゴリ、状態など、様々な商品情報を入力
- OpenAI API を使用して、魅力的な商品説明文を自動生成
- 生成した説明文をコピーしてメルカリの出品ページに貼り付け可能

## 環境構築

### 必要条件

- Node.js 16.0 以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/your-username/mercari-description-generator.git
cd mercari-description-generator

# 依存関係のインストール
npm install
# または
yarn
```

### 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
```

ブラウザで `http://localhost:5173` にアクセスするとアプリケーションが表示されます。

### ビルド

```bash
npm run build
# または
yarn build
```

ビルドされたファイルは `dist` ディレクトリに出力されます。

## 使い方

1. 商品名とカテゴリ（必須項目）を入力
2. その他の詳細情報（状態、購入時期、サイズなど）を入力
3. 「説明文を生成」ボタンをクリック
4. 生成された説明文をコピーしてメルカリの出品ページに貼り付け

## ライセンス

MIT
