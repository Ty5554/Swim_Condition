FROM node:20-alpine

# コンテナ内の作業ディレクトリ
WORKDIR /app

# 依存関係を先にインストールしてレイヤキャッシュを効かせます。
COPY package.json package-lock.json* ./
RUN npm install

# アプリ本体をコピーします。
COPY . .

EXPOSE 5173

# Vite 開発サーバーで起動します（Docker からアクセスできるように host/port を指定）。
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
