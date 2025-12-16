# 認証系 API エンドポイント（ログイン/更新/ログアウト/本人情報）を提供します。
# - login/refresh は認証不要（AllowAny）
# - me は access_token が必須（IsAuthenticated）
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from config.auth_serializers import AuthLoginSerializer, AuthRefreshSerializer, UserMeSerializer


class AuthLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # リクエストボディ（email/password）を検証し、JWT を発行します。
        serializer = AuthLoginSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class AuthRefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # refresh_token から access_token を再発行します。
        serializer = AuthRefreshSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class AuthLogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, _request):
        # サーバー側での失効管理をしない方針のため、API は no-op（204 を返すだけ）です。
        return Response(status=status.HTTP_204_NO_CONTENT)


class AuthMeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # access_token から認証されたユーザー情報を返します。
        return Response(UserMeSerializer(request.user).data, status=status.HTTP_200_OK)
