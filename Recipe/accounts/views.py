from django.shortcuts import render
from django.views.generic import View
from .forms import UserLoginForm, UserRegisterForm
from rest_framework import generics, permissions
from .serializers import LoginSerializer, UserSerializer, RegisterSerializer
from rest_framework.response import Response
from knox.models import AuthToken


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny, ]

    def post(self, request, *args, **kwargs):
        serial = self.get_serializer(data=request.data)
        serial.is_valid(raise_exception=True)
        user = serial.validated_data

        # AuthToken.objects.filter(user=user).delete()
        return Response({
            "user": UserSerializer(user).data,
            "token": AuthToken.objects.create(user)[1]
        })


class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny, ]

    def post(self, request, *args, **kwargs):
        serial = self.get_serializer(data=request.data)
        serial.is_valid(raise_exception=True)
        user = serial.save()

        return Response({
            "user": UserSerializer(user).data,
        })


class LoginView(View):
    def get(self, request):
        form = UserLoginForm()
        return render(request, "accounts/loginForm.html", {"form": form})


class RegisterView(View):
    def get(self, request):
        form = UserRegisterForm()
        return render(request, "accounts/registerForm.html", {"form": form})
