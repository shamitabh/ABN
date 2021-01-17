from rest_framework import serializers
from .models import Recipe


class RecipeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = "__all__"
        read_only_fields = ('slug',)

    def validate_serving_count(self, attr):
        """validations for serve count to be > 0"""
        if attr and attr < 1:
            raise serializers.ValidationError(
                ["This field cannot be less than 1."])
        return attr
