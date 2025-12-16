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

router = DefaultRouter()
router.register(r"conditions", ConditionViewSet, basename="condition")

urlpatterns = [
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
    path("api/auth/login", AuthLoginView.as_view(), name="auth-login"),
    path("api/auth/refresh", AuthRefreshView.as_view(), name="auth-refresh"),
    path("api/auth/logout", AuthLogoutView.as_view(), name="auth-logout"),
    path("api/auth/me", AuthMeView.as_view(), name="auth-me"),

    # 既存 API
    path("api/", include(router.urls)),
]
