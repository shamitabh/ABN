from rest_framework.test import APITestCase, APIClient, APIRequestFactory
import requests
from django.shortcuts import reverse


class RecipeTest(APITestCase):
    recipe_url = reverse("view_recipes")
    login_url = "http://127.0.0.1:8000/accounts/login"

    # def getToken(self):
    #     payload = {
    #         "username": "mass",
    #         "password": "1994"
    #     }
    #     response = self.client.post(self.login_url, data=payload)
    #     # print("Token = ", response["token"])
    #     print(type(response))
    #     print(response.json())

    # def test_get_all_recipes_without_authorization(self):
    #     client = APIClient()
    #     client.credentials()
    #     """verify status is 401 when authorization is not provided."""
    #     response = client.get("/recipes/api/")
    #     self.assertEqual(response.status_code, 401)

    def test_get_all_recipes_with_authorization(self):
        client = APIClient()
        # client.credentials(HTTP_AUTHORIZATION='Token ' +
        #                    '6fb160508860ad45f298bcbf821ec3ff89968a8615b540b2b34c5cef109fff12')
        client.force_authenticate(token=None)
        response = client.get(
            "http://127.0.0.1:8000/recipes/api/chicken_tikka")
        self.assertEqual(response.status_code, 200)
