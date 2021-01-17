from django.db import models
from .utils import unique_slug_generator
from django.db.models.signals import pre_save


class Recipe(models.Model):
    """Class to create Recipe instances with the below arguments-
        1. name(str)-name of the recipe
        2. serving_count(int)-no. of people to be served
        3. veg_indicator(bool)-if the recipe is veg
        4. ingredients(dict)-ingredients to be used
    """
    name = models.CharField(max_length=200)
    serving_count = models.IntegerField(default=1)
    veg_indicator = models.BooleanField("veg indicator", default=True)
    ingredients = models.JSONField(null=True, blank=True)
    instructions = models.TextField(null=True, blank=True)
    slug = models.SlugField(max_length=50, unique=True, blank=True, null=True)
    created_at = models.DateTimeField("created at", auto_now_add=True)
    last_modified_at = models.DateTimeField("last modified at", auto_now=True)

    def __str__(self):
        return f"{self.name}_{self.slug}"


def slug_generator(sender, instance, *args, **kwargs):
    """This method sets slug for any instance using its name attribute"""
    if not instance.slug:
        instance.slug = unique_slug_generator(instance)


# this will link the slug generator method to the Model before saving any object
pre_save.connect(slug_generator, sender=Recipe)
