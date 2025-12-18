# URL ルーティングの集約ファイルです。
# - OpenAPI スキーマ / Swagger UI / ReDoc の提供
# - 認証（ログイン/更新/ログアウト/自分の情報）
# - Condition の CRUD API（DRF Router）
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)
from condition.views import ConditionViewSet
from config.views import openapi_yaml_view
from config.auth_views import AuthLoginView, AuthLogoutView, AuthMeView, AuthRefreshView
from accounts.views import UserRegistrationView

router = DefaultRouter()
# /api/conditions/ 配下を ConditionViewSet にルーティングします。
router.register(r"conditions", ConditionViewSet, basename="condition")

urlpatterns = [
    # Django 管理サイト
    path("admin/", admin.site.urls),

    # OpenAPI JSON (DRF自動生成)
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # OpenAPI YAML（設計書ベース）
    path("api/schema.yaml", openapi_yaml_view, name="schema-yaml"),

    # Swagger UI (YAMLを利用)
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema-yaml"),
        name="swagger-ui",
    ),

    # ReDoc (YAMLを利用)
    path(
        "api/redoc/",
        SpectacularRedocView.as_view(url_name="schema-yaml"),
        name="redoc",
    ),

    # Auth
    # ここでは SimpleJWT を用いたトークン発行・更新を独自エンドポイントで提供しています。
    path("api/auth/register", UserRegistrationView.as_view(), name="auth-register"),
    path("api/auth/login", AuthLoginView.as_view(), name="auth-login"),
    path("api/auth/refresh", AuthRefreshView.as_view(), name="auth-refresh"),
    path("api/auth/logout", AuthLogoutView.as_view(), name="auth-logout"),
    path("api/auth/me", AuthMeView.as_view(), name="auth-me"),

    # 既存 API
    # router で登録された API を /api/ 配下にまとめて公開します。
    path("api/", include(router.urls)),
]
