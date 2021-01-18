from rest_framework.test import APITestCase, APIClient, APIRequestFactory
import requests


class RecipeTest(APITestCase):
    recipe_url = "http://127.0.0.1:8000/recipes/api/"
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
    #     self.getToken()
    #     """verify status is 401 when authorization is not provided."""
    #     response = self.client.get(self.recipe_url)
    #     self.assertEqual(response.status_code, 401)

    def test_get_all_recipes_with_authorization(self):
        payload = {
            "username": "mass",
            "password": "1994"
        }
        headers = {
            'content-type': 'application/json'}
        response = requests.post(
            self.login_url, payload, format='json')
        headers = {
            'Authorization': 'Token 037af16ae05ce150693a2459f2a2afb01c9fe06861d4bb26da6731b035d8c37a'}
        response = requests.get(self.recipe_url, headers=headers)
        self.assertEqual(response.status_code, 200)
