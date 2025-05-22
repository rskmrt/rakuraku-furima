#!/bin/bash

# ビルド実行
npm run build

# 必要なファイルをdistディレクトリにコピー
cp -r public/* dist/

# _headersファイルの作成 (MIMEタイプ設定)
echo "/*" > dist/_headers
echo "  Content-Type: application/javascript" >> dist/_headers
echo "/manifest.json" >> dist/_headers
echo "  Content-Type: application/json" >> dist/_headers
echo "/assets/*.js" >> dist/_headers
echo "  Content-Type: application/javascript" >> dist/_headers
echo "/src/*.tsx" >> dist/_headers
echo "  Content-Type: application/javascript" >> dist/_headers

# .nojekyllファイルを作成してJekyllの処理を無効化
touch dist/.nojekyll

# 一時ディレクトリの作成
TEMP_DIR=$(mktemp -d)
echo "一時ディレクトリを作成しました: $TEMP_DIR"

# distの内容を一時ディレクトリにコピー
cp -r dist/* $TEMP_DIR/
cp -r dist/.* $TEMP_DIR/ 2>/dev/null || :
echo "distの内容を一時ディレクトリにコピーしました"

# 一時ディレクトリでGitを初期化
cd $TEMP_DIR
git init
git add .
git commit -m "GitHub Pagesへデプロイ"

# リモートリポジトリの追加
git remote add origin git@github.com:rskmrt/rakuraku-furima.git

# gh-pagesブランチに強制プッシュ
git push -f origin master:gh-pages

# クリーンアップ
cd ..
rm -rf $TEMP_DIR
echo "デプロイ完了" 