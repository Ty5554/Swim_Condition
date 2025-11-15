from django.contrib import admin
from .models import Condition


@admin.register(Condition)
class ConditionAdmin(admin.ModelAdmin):
    list_display = (
        "date",
        "athlete_name",
        "physical_fatigue",
        "mental_fatigue",
        "training_completion",
        "heart_rate",
    )
    list_filter = ("date", "athlete_name")
