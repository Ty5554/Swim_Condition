# Condition（コンディション）モデルの定義です。
# 選手の体調/疲労/練習達成度などを日次で記録します。
from django.db import models


class Condition(models.Model):
    """水泳選手のコンディション記録"""

    athlete_name = models.CharField("選手名", max_length=100)
    # レコード作成時点の日付を自動で保存します（手入力の記録日を持たせたい場合は auto_now_add を外します）。
    date = models.DateField("日付", auto_now_add=True)

    # 0〜10 のスケールで主観的疲労を記録します。
    physical_fatigue = models.PositiveSmallIntegerField("身体疲労度 (0-10)")
    mental_fatigue = models.PositiveSmallIntegerField("精神的疲労度 (0-10)")
    # 練習の達成率（%）を記録します。
    training_completion = models.PositiveSmallIntegerField("トレーニング達成率 (0-100)")
    # 計測した心拍数（bpm）を記録します。
    heart_rate = models.PositiveSmallIntegerField("心拍数")
    # 任意入力の日誌（空でもOK）。
    diary = models.TextField("今日の練習日誌", blank=True)

    class Meta:
        # 新しい日付を先頭にし、同日の場合は選手名で並べます。
        ordering = ["-date", "athlete_name"]

    def __str__(self) -> str:
        # 管理画面などで表示する文字列。
        return f"{self.date} - {self.athlete_name}"
