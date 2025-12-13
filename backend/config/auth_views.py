from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from config.auth_serializers import AuthLoginSerializer, AuthRefreshSerializer, UserMeSerializer


class AuthLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AuthLoginSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class AuthRefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AuthRefreshSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class AuthLogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, _request):
        return Response(status=status.HTTP_204_NO_CONTENT)


class AuthMeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserMeSerializer(request.user).data, status=status.HTTP_200_OK)

