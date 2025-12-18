from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = get_user_model()
        fields = [
            "id",
            "account_id",
            "email",
            "password",
            "first_name",
            "last_name",
            "birth_date",
        ]
        read_only_fields = ["id"]
        extra_kwargs = {
            "first_name": {"required": False, "allow_blank": False},
            "last_name": {"required": False, "allow_blank": False},
            "birth_date": {"required": False},
        }

    def validate_password(self, value: str) -> str:
        # Django 標準のバリデータで強度をチェックします。
        validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = get_user_model().objects.create_user(password=password, **validated_data)
        return user
