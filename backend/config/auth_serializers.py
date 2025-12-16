from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError


class AuthLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, write_only=True, style={"input_type": "password"})

    def validate(self, attrs):
        email = attrs["email"]
        password = attrs["password"]

        User = get_user_model()
        try:
            user = User.objects.get(email=email)
        except (User.DoesNotExist, User.MultipleObjectsReturned):
            raise AuthenticationFailed("Invalid credentials.")

        authenticated_user = authenticate(
            request=self.context.get("request"),
            username=user.get_username(),
            password=password,
        )
        if authenticated_user is None or not authenticated_user.is_active:
            raise AuthenticationFailed("Invalid credentials.")

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
        return user.last_login or user.date_joined

