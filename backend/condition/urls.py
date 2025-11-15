from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ConditionViewSet

router = DefaultRouter()
router.register("conditions", ConditionViewSet, basename="condition")

urlpatterns = [
    path("", include(router.urls)),
]
