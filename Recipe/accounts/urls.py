from .views import LoginView, RegisterView, LoginAPIView, RegisterAPIView
from django.urls import path
from knox import views as knox_views

urlpatterns = [
    # api paths
    path('api/login', LoginAPIView.as_view()),
    path('api/register', RegisterAPIView.as_view()),
    path('api/logout', knox_views.LogoutView.as_view()),

    # web-ui paths
    path('login', LoginView.as_view(), name='login'),
    path('register', RegisterView.as_view(), name='register'),
]
