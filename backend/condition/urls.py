# condition アプリ単体の URL 定義です。
# ただし本プロジェクトでは config/urls.py から直接 Router 登録しているため、
# この urls.py は将来 include したい場合のための構成です。
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ConditionViewSet

router = DefaultRouter()
router.register("conditions", ConditionViewSet, basename="condition")

urlpatterns = [
    # Router が自動生成したパス（/conditions/ など）をそのまま公開します。
    path("", include(router.urls)),
]
