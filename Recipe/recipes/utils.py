import random
import string
from django.utils.text import slugify


def random_string_generator(size=10, chars=string.ascii_lowercase+string.digits):
    """Generate a random charater combo"""
    return ''.join(random.choice(chars) for _ in range(size))


def unique_slug_generator(instance, new_slug=None):
    """Generate new slug for an instance"""
    if new_slug is not None:
        slug = new_slug
    else:
        slug = slugify(instance.name)

    Klass = instance.__class__
    qs_exists = Klass.objects.filter(slug=slug).exists()
    if qs_exists:
        new_slug = f"{slug}-{random_string_generator(size=4)}"
        # this makes the function recursive till a unique slug is generated.
        return unique_slug_generator(instance, new_slug=new_slug)
    return slug
