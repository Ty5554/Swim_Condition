# Django プロジェクト全体の設定ファイルです。
# - DB: SQLite（開発用）
# - API: Django REST Framework（JSON のみ返す）
# - 認証: SimpleJWT（access/refresh）
# - CORS: 全許可（開発用。運用では制限してください）
from pathlib import Path
from datetime import timedelta

# プロジェクトのルートディレクトリ（backend/）を指します。
BASE_DIR = Path(__file__).resolve().parent.parent

# 開発用の固定キーです。運用では必ず環境変数等から安全に注入してください。
SECRET_KEY = "django-insecure-dev-key-change-me"

# 開発時は True、運用は必ず False にします。
DEBUG = True
ALLOWED_HOSTS = ["*"]

# ルーティング定義（urls.py）の場所を指定します。
ROOT_URLCONF = "config.urls" 

INSTALLED_APPS = [
    # Django 標準
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # サードパーティ
    "rest_framework",
    "corsheaders",

    # Swagger
    "drf_spectacular",
    "drf_spectacular_sidecar",

    # ユーザー管理
    'accounts',

    # 自作アプリ
    "condition",
]
STATIC_URL = "static/"

AUTH_USER_MODEL = "accounts.User"

# 開発を簡単にするため SQLite を利用しています。
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# すべての DRF にデフォルト適用
REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    # 認証方式のデフォルトを JWT に変更
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    # OpenAPI スキーマ生成を drf-spectacular に寄せます。
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

# JWT の設定
SIMPLE_JWT = {
    # access は短命、refresh は長命の想定です（方針に合わせて調整）。
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=15),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
}

SPECTACULAR_SETTINGS = {
    "TITLE": "API Schema",
    "DESCRIPTION": "Your API documentation",
    "VERSION": "1.0.0",

    # sidecar を使って Swagger / Redoc の静的ファイルを配信
    "SWAGGER_UI_DIST": "SIDECAR",
    "SWAGGER_UI_FAVICON_HREF": "SIDECAR",
    "REDOC_DIST": "SIDECAR",
}

MIDDLEWARE = [
    # CORS を許可するための middleware（先頭付近で動かすのが一般的）
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",

    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],  # プロジェクト直下の templates/ を使う場合はここにパスを足す
        "APP_DIRS": True,  # ← ここが超大事！
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# 開発用に全オリジンを許可しています（運用では絞ってください）。
CORS_ALLOW_ALL_ORIGINS = True
