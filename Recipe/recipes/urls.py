from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RecipeAPIView, createRecipe, viewRecipes, viewRecipe, updateRecipe

router = DefaultRouter(trailing_slash=False)
router.register('', RecipeAPIView)

urlpatterns = [
    path('api/', include(router.urls), name="view_recipes"),
    # path('api', RecipeListViewAPI.as_view(), name='all_recipes'),
    # path('api/<str:slug>', RecipeRetrieveViewAPI.as_view(), name='each_recipe'),
    path('add-recipe', createRecipe, name='add_recipe'),
    path('update-recipe/<str:slug>', updateRecipe, name='update_recipe'),
    path('', viewRecipes, name='view_recipes'),
    path('<str:slug>', viewRecipe, name='view_recipe')
]
