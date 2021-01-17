from django import forms
from django.contrib.auth.models import User


class UserLoginForm(forms.Form):
    username = forms.CharField(max_length=100)
    password = forms.CharField(max_length=100, widget=forms.PasswordInput)


class UserRegisterForm(forms.Form):
    username = forms.CharField(max_length=100)
    password = forms.CharField(max_length=100, widget=forms.PasswordInput)
    password2 = forms.CharField(
        label="confirm password", max_length=100, widget=forms.PasswordInput)
