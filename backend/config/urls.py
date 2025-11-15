from django.urls import path, include
from rest_framework.routers import DefaultRouter
from condition.views import ConditionViewSet

router = DefaultRouter()
router.register(r"conditions", ConditionViewSet, basename="condition")

urlpatterns = [
    path("api/", include(router.urls)),
]