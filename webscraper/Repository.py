import psycopg2
import json
import os

from consts import INSERT_RESTAURANT_FILENAME, SEARCH_RESTAURANTS_FILENAME
from sqlite3 import OperationalError
from Logger import Logger
from re import sub
from collections import defaultdict


class Repository:

    def __init__(self):
        self.connection = self.__getConnection()
        self.cursor = self.__getCursor()

    def insertRestaurant(self, restaurantData):
        restaurantData = self.__cleanupPriceData(restaurantData)
        restaurantData = self.__cleanupRestaurantNames(restaurantData)
        insertRestaurantFilePath = self.__getInsertRestaurantFilePath()

        try:
            self.cursor.execute(open(insertRestaurantFilePath, "r").read().format(
                json_input=restaurantData))
        except Exception as error:
            self.connection.rollback()
            raise error

        self.connection.commit()

    def hasRestaurant(self, lat, long):
        try:
            self.cursor.execute(
                f"SELECT count(*) FROM locations WHERE lat = '{lat}' AND long = '{long}'")
            count = self.cursor.fetchone()[0]
        except Exception as error:
            self.connection.rollback()
            raise error

        return True if count > 0 else False

    def searchRestaurants(self, minPrice, maxPrice, category):

        if minPrice > maxPrice:
            return ValueError('min price is higher than max price')
        if len(category) == 0:
            return ValueError('category is empty')

        searchRestaurantsFilePath = self.__getSearchRestaurantsFilePath()

        try:
            self.cursor.execute(open(searchRestaurantsFilePath, "r").read().format(
                minPrice=minPrice, maxPrice=maxPrice, category=category
            ))
            searchResults = self.cursor.fetchmany(3)
        except Exception as error:
            self.connection.rollback()
            raise error

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
            'menuItems': list(map(lambda rdObj : {
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
        return ('\'' + json.dumps(restaurantData).replace("'", "''") + '\'')

    def __getSearchRestaurantFilePath(self):
        return os.path.join(os.path.dirname(__file__), f'../db/{SEARCH_RESTAURANTS_FILENAME}')

    def __getInsertRestaurantFilePath(self):
        return os.path.join(os.path.dirname(__file__), f'../db/{INSERT_RESTAURANT_FILENAME}')

    def __getCursor(self):
        return self.connection.cursor()

    def __getConnection(self):
        try:
            conn = psycopg2.connect("""
                host=gobble-db.c8xnamihzakf.ap-southeast-2.rds.amazonaws.com
                port=5432
                user=lorenzoparas
                password=NJvmaQ4GHXsDRB9tb5UD
                dbname=gobble_db
            """)
        except OperationalError as error:
            Logger.log(error)
            conn = None
        return conn
