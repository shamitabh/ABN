from django import forms
from django.forms import widgets
from .models import Recipe


class RecipeForm(forms.ModelForm):
    ingredients = forms.CharField(
        widget=forms.Textarea(attrs={"placeholder": "Enter ingredients in the following format: \n<item>-<amount>\ne.g. \nEggs-2 pieces, salt-as per taste"}))
    instructions = forms.CharField(
        widget=forms.Textarea(attrs={"placeholder": "e.g. \nTake a bowl. Add 2 teaspoons of corn flour. Add water. Maintain dough consistency."}))
    serving_count = forms.IntegerField(
        label="Number of people the dish serves", initial=1)

    class Meta:
        model = Recipe
        fields = ('name', 'serving_count', 'veg_indicator',
                  'ingredients', 'instructions')
