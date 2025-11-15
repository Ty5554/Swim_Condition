from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Condition
from .serializers import ConditionSerializer


class ConditionViewSet(viewsets.ModelViewSet):
    """
    /api/conditions/ で CRUD できる API
    """
    queryset = Condition.objects.all()
    serializer_class = ConditionSerializer
    permission_classes = [AllowAny]  # 練習用
