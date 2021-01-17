from rest_framework import serializers
from django.contrib.auth import authenticate
import re
import string
from django.contrib.auth.models import User


def check_password(password):
    """Check if password is valid"""
    if len(password) >= 6:
        if re.search("\d+", password):
            if re.search("[a-z]", password):
                for i in password:
                    if i in string.punctuation:
                        return True
    return False


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)


class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        label="Confirm password", max_length=100, style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def validate(self, attrs):
        """validations for password"""
        if not check_password(attrs.get("password")):
            raise serializers.ValidationError(
                {"password": ["Password must be alpha-numeric, with minimum length of 6 characters and must contain atleast one special character."]})
        if attrs.get("password") != attrs.get("password2"):
            raise serializers.ValidationError(
                {"password": ["Both passwords should match."]})
        return attrs

    def create(self, validated_data):
        """overriding the create method to get rid of password2"""
        validated_data.pop("password2")
        password = validated_data.pop("password")
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(
        style={"input_type": "password"}, write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError(
            ["No account found with the provided credentials"])
