import psycopg2
import json
import os

from consts import INSERT_RESTAURANT_FILENAME
from sqlite3 import OperationalError
from Logger import Logger

class Repository:

    def __init__(self):
        self.connection = self.__getConnection()
        self.cursor = self.__getCursor()

    def insertRestaurant(self, restaurantData):
        restaurantData = self.__cleanupData(restaurantData)
        insertRestaurantFilePath = self.__getInsertRestaurantFilePath()

        try:
            self.cursor.execute(open(insertRestaurantFilePath, "r").read().format(json_input=restaurantData))
        except Exception as error:
            self.connection.rollback()
            raise error
    
        self.connection.commit()

    def hasRestaurant(self, lat, long):
        try:
            self.cursor.execute(f"SELECT count(*) FROM locations WHERE lat = '{lat}' AND long = '{long}'")
            count = self.cursor.fetchone()[0]
        except Exception as error:
            self.connection.rollback()
            raise error

        return True if count > 0 else False

    def __cleanupData(self, data):
        return ('\'' + json.dumps(data).replace("'", "''") + '\'')

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
