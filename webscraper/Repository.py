import json
import requests
import uuid

from consts import INSERT_RESTAURANT_FILENAME, SEARCH_RESTAURANTS_FILENAME
from sqlite3 import OperationalError
from Logger import Logger
from re import sub
from collections import defaultdict

class Repository:

    def __init__(self):
        self.endpoint = "https://w4zdoqv4lfcxhn2db3vmpi5p3q.appsync-api.ap-southeast-2.amazonaws.com/graphql"
        self.apiKey = "da2-bovlhswy3re6tbz722kqgqzxn4"

    """
        restaurantData: {
            name: 'foo',
            lat: 0.0,
            long: 0.0,
            menu: [ { name: 'bar', price: 10.00 } ]
        }
    """

    def insertRestaurant(self, restaurantData):
        restaurantData = self.__cleanupPriceData(restaurantData)
        createRestaurant = """
            mutation CreateRestaurant(
                $input: CreateRestaurantInput!
                $condition: ModelRestaurantConditionInput
            ) {
                createRestaurant(input: $input, condition: $condition) {
                    id
                    name
                    lat
                    long
                    createdAt
                    updatedAt
                    __typename
                }
            }
        """

        response = requests.post(
            url=self.endpoint,
            json={
                "query": createRestaurant,
                "variables": {
                    "input": {
                        "name": restaurantData['name'],
                        "lat": restaurantData['coordinates']['lat'],
                        "long": restaurantData['coordinates']['long']
                    }
                }
            },
            headers={"x-api-key": self.apiKey}
        )

        responseJson = response.json()
        restaurantId = responseJson['data']['createRestaurant']['id']
        menuItemsWithRestaurantId = [dict(**menuItem, restaurantId=restaurantId) for menuItem in restaurantData['menu']]

        createMenuItem = """
            mutation CreateMenuItem(
                $input: CreateMenuItemInput!
                $condition: ModelMenuItemConditionInput
            ) {
                createMenuItem(input: $input, condition: $condition) {
                    id
                    name
                    price
                    restaurantId
                    createdAt
                    updatedAt
                    __typename
                }
            }
        """
        for menuItem in menuItemsWithRestaurantId:
            response = requests.post(
                url=self.endpoint,
                json={
                    "query": createMenuItem,
                    "variables": {
                        "input": {
                            "id": str(uuid.uuid4()),
                            "name": menuItem['name'],
                            "price": menuItem['price'],
                            "restaurantId": menuItem['restaurantId']
                        }
                    }
                },
                headers={"x-api-key": self.apiKey}
            )

    def hasRestaurant(self, lat, long):

        # get restaurant which matches lat and long
        count = 0  # TODO: replace with endpoint which checks if restaurant exists

        return True if count > 0 else False

    def searchRestaurants(self, minPrice, maxPrice, category):

        if minPrice > maxPrice:
            return ValueError('min price is higher than max price')
        if len(category) == 0:
            return ValueError('category is empty')

        searchRestaurantsFilePath = self.__getSearchRestaurantsFilePath()
        searchResults = []

        return self.__cleanupSearchResults(searchResults)

    def __cleanupSearchResults(self, searchResults):
        res = defaultdict(list)

        for restaurantName, lat, long, menuItemName, menuItemPrice in searchResults:
            res[restaurantName].append({
                'lat': float(lat),
                'long': float(long),
                'menuItemName': menuItemName,
                'menuItemPrice': float(menuItemPrice)
            })

        res = [{
            'restaurantName': restaurantName,
            'lat': restaurantData[0]['lat'],
            'long': restaurantData[0]['long'],
            'menuItems': list(map(lambda rdObj: {
                'name': rdObj['menuItemName'],
                'price': rdObj['menuItemPrice']
            }, restaurantData))
        } for restaurantName, restaurantData in res.items()]

        return res

    # remove dollar signs
    def __cleanupPriceData(self, restaurantData):
        for menu_item in restaurantData['menu']:
            menu_item['price'] = sub(r'[^\d.]', '', menu_item['price'])
        return restaurantData

    # remove invalid apostrophes from restaurant names
    def __cleanupRestaurantNames(self, restaurantData):
        return ('\'' + json.dumps(restaurantData).replace("'", "\'") + '\'')
