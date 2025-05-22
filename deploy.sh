#!/bin/bash
set -e

echo "🚀 デプロイプロセスを開始します"

# ビルドを実行
echo "📦 プロジェクトをビルドしています..."
NODE_ENV=production npm run build

# 必要なファイルをdistディレクトリにコピー
echo "📂 静的ファイルをコピーしています..."
cp -r public/* dist/

# _headersファイルの作成
echo "📝 ヘッダー設定ファイルを作成しています..."
cat > dist/_headers << EOF
/*
  Access-Control-Allow-Origin: *
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/*.html
  Content-Type: text/html; charset=utf-8
  Cache-Control: public, max-age=0, must-revalidate

/*.js
  Content-Type: application/javascript; charset=utf-8
  Cache-Control: public, max-age=31536000, immutable

/assets/*.js
  Content-Type: application/javascript; charset=utf-8
  Cache-Control: public, max-age=31536000, immutable

/*.json
  Content-Type: application/json; charset=utf-8
  Cache-Control: public, max-age=0, must-revalidate

/manifest.json
  Content-Type: application/json; charset=utf-8
  Cache-Control: public, max-age=0, must-revalidate

/*.css
  Content-Type: text/css; charset=utf-8
  Cache-Control: public, max-age=31536000, immutable

/*.svg
  Content-Type: image/svg+xml
  Cache-Control: public, max-age=31536000, immutable

/*.png
  Content-Type: image/png
  Cache-Control: public, max-age=31536000, immutable
EOF

# .nojekyllファイルを作成
echo "📄 .nojekyllファイルを作成しています..."
touch dist/.nojekyll

# 一時ディレクトリの作成
echo "📁 デプロイ用の一時ディレクトリを作成しています..."
TEMP_DIR=$(mktemp -d)
echo "一時ディレクトリを作成しました: $TEMP_DIR"

# distの内容を一時ディレクトリにコピー
echo "🔄 ビルド済みファイルをコピーしています..."
cp -r dist/* $TEMP_DIR/
cp -r dist/.* $TEMP_DIR/ 2>/dev/null || :
echo "ファイルのコピーが完了しました"

# 一時ディレクトリでGitを初期化
echo "🔧 Gitリポジトリを初期化しています..."
cd $TEMP_DIR
git init -b main
git add .
git commit -m "GitHub Pagesへデプロイ $(date +"%Y-%m-%d %H:%M:%S")"

# リモートリポジトリの追加
echo "🔗 リモートリポジトリを設定しています..."
git remote add origin git@github.com:rskmrt/rakuraku-furima.git

# gh-pagesブランチに強制プッシュ
echo "🚀 gh-pagesブランチにデプロイしています..."
git push -f origin main:gh-pages

# クリーンアップ
echo "🧹 一時ファイルを削除しています..."
cd ..
rm -rf $TEMP_DIR
echo "✅ デプロイが完了しました！" 