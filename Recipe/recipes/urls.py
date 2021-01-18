from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RecipeAPIView, createRecipe, viewRecipes, viewRecipe, updateRecipe

router = DefaultRouter(trailing_slash=False)
router.register('', RecipeAPIView)

urlpatterns = [
    # api paths
    path('api/', include(router.urls), name="view_recipes"),

    # web-ui paths
    path('add-recipe', createRecipe, name='add_recipe'),
    path('update-recipe/<str:slug>', updateRecipe, name='update_recipe'),
    path('', viewRecipes, name='view_recipes'),
    path('<str:slug>', viewRecipe, name='view_recipe')
]
