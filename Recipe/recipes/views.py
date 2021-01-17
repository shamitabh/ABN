from rest_framework import viewsets, permissions
from .models import Recipe
from .serializers import RecipeSerializer
from .forms import RecipeForm
from django.shortcuts import render, get_object_or_404


class RecipeAPIView(viewsets.ModelViewSet):
    queryset = Recipe.objects.all().order_by("-last_modified_at")
    serializer_class = RecipeSerializer
    lookup_field = "slug"


def createRecipe(request):
    form = RecipeForm()
    return render(request, "recipes/recipesForm.html", {"form": form})


def updateRecipe(request, slug):
    ob = get_object_or_404(Recipe, slug=slug)
    form = RecipeForm(instance=ob)
    return render(request, "recipes/updateRecipesForm.html", {"form": form})


def viewRecipes(request):
    return render(request, "recipes/recipes.html")


def viewRecipe(request, slug):
    return render(request, "recipes/recipe.html")
