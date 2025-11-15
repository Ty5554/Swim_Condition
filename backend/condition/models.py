from django.db import models


class Condition(models.Model):
    """水泳選手のコンディション記録"""

    athlete_name = models.CharField("選手名", max_length=100)
    date = models.DateField("日付", auto_now_add=True)

    physical_fatigue = models.PositiveSmallIntegerField("身体疲労度 (0-10)")
    mental_fatigue = models.PositiveSmallIntegerField("精神的疲労度 (0-10)")
    training_completion = models.PositiveSmallIntegerField("トレーニング達成率 (0-100)")
    heart_rate = models.PositiveSmallIntegerField("心拍数")
    diary = models.TextField("今日の練習日誌", blank=True)

    class Meta:
        ordering = ["-date", "athlete_name"]

    def __str__(self) -> str:
        return f"{self.date} - {self.athlete_name}"
