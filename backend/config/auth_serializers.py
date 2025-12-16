# 認証系のシリアライザです。
# - ログイン: email/password を検証して JWT を発行
# - リフレッシュ: refresh_token から access_token を再発行
# - me: ユーザー情報の返却用
from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError


class AuthLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, write_only=True, style={"input_type": "password"})

    def validate(self, attrs):
        # ここで「存在するユーザーか」「パスワードが合っているか」をチェックします。
        email = attrs["email"]
        password = attrs["password"]

        User = get_user_model()
        try:
            user = User.objects.get(email=email)
        except (User.DoesNotExist, User.MultipleObjectsReturned):
            raise AuthenticationFailed("Invalid credentials.")

        # Django 標準の認証バックエンドに委譲してパスワード検証を行います。
        authenticated_user = authenticate(
            request=self.context.get("request"),
            username=user.get_username(),
            password=password,
        )
        if authenticated_user is None or not authenticated_user.is_active:
            raise AuthenticationFailed("Invalid credentials.")

        # SimpleJWT の RefreshToken を発行し、そこから access_token を取り出します。
        refresh = RefreshToken.for_user(authenticated_user)
        access = refresh.access_token
        expires_in = int(access.lifetime.total_seconds())

        return {
            "access_token": str(access),
            "refresh_token": str(refresh),
            "token_type": "Bearer",
            "expires_in": expires_in,
        }


class AuthRefreshSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    def validate(self, attrs):
        # refresh_token が有効かを検証し、access_token を作り直します。
        refresh_token = attrs["refresh_token"]
        try:
            refresh = RefreshToken(refresh_token)
        except TokenError:
            raise AuthenticationFailed("Invalid token.")

        access = refresh.access_token
        expires_in = int(access.lifetime.total_seconds())

        return {
            "access_token": str(access),
            "token_type": "Bearer",
            "expires_in": expires_in,
        }


class UserMeSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(source="date_joined", read_only=True)
    updated_at = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ["id", "email", "first_name", "last_name", "created_at", "updated_at"]

    def get_updated_at(self, user):
        # last_login があればそれを、なければ作成日時を返します。
        return user.last_login or user.date_joined
