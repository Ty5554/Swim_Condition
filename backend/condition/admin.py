# Django 管理画面（admin）で Condition を見やすくするための設定です。
from django.contrib import admin
from .models import Condition


@admin.register(Condition)
class ConditionAdmin(admin.ModelAdmin):
    # 一覧画面に表示するカラム
    list_display = (
        "date",
        "athlete_name",
        "physical_fatigue",
        "mental_fatigue",
        "training_completion",
        "heart_rate",
    )
    # 右側のフィルタ（絞り込み）
    list_filter = ("date", "athlete_name")
