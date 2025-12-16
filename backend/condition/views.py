# Condition の CRUD（作成/一覧/取得/更新/削除）を提供する ViewSet です。
# ルーティングは Router 経由で /api/conditions/ に公開されます。
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Condition
from .serializers import ConditionSerializer


class ConditionViewSet(viewsets.ModelViewSet):
    """
    /api/conditions/ で CRUD できる API
    """
    # 一覧・詳細で取得するデータのベース QuerySet
    queryset = Condition.objects.all()
    # 入出力の変換（Model <-> JSON）
    serializer_class = ConditionSerializer
    # 練習用に認証なしで操作可能にしています（運用では IsAuthenticated 等に変更）。
    permission_classes = [AllowAny]  # 練習用
