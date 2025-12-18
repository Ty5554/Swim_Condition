FROM python:3.12-slim

# コンテナ内の作業ディレクトリ（以降の COPY/RUN の基準）
WORKDIR /app

# .pyc を作らない / 標準出力をバッファしない（ログを即時に出す）
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# OS 依存のビルドが必要な Python パッケージに備えて最低限の build tools を入れます。
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 依存を先に入れてレイヤキャッシュを効かせます。
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# アプリ本体をコピーします。
COPY . .

EXPOSE 8000

# 開発用の Django 開発サーバーで起動します。
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
