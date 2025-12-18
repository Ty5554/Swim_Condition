# Condition モデルを JSON と相互変換するためのシリアライザです。
from rest_framework import serializers
from .models import Condition


class ConditionSerializer(serializers.ModelSerializer):
    # ModelSerializer を使うことで、モデル定義からフィールドを自動生成します。
    class Meta:
        model = Condition
        fields = "__all__"
