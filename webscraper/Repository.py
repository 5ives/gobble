import psycopg2
import json
import os

from consts import INSERT_RESTAURANT_FILENAME

class Repository:

    def __init__(self):
        self.connection = self.__getConnection()
        self.cursor = self.__getCursor()

    def insertRestaurant(self, restaurantData):
        restaurantDataString = ('\'' + json.dumps(restaurantData).replace('\'', '') + '\'')
        self.cursor.execute(open(INSERT_RESTAURANT_FILENAME, "r").read().format(json_input=restaurantDataString))
        self.connection.commit()

    def __getConnection(self):
        conn = psycopg2.connect("""
            host=gobble-db.c8xnamihzakf.ap-southeast-2.rds.amazonaws.com
            port=5432
            user=lorenzoparas
            password=NJvmaQ4GHXsDRB9tb5UD
            dbname=gobble_db
        """)
        return conn

    def __getCursor(self):
        return self.connection.cursor()
