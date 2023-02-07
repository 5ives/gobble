import json
from time import sleep
from Scraper import Scraper
from consts import LOCATION
from Logger import Logger
from selenium.webdriver.common.by import By

class RestaurantDataScraper(Scraper):

    def __init__(self):
        Scraper.__init__(self)
        self.queryUrl = ''
        self.category = ''
        self.feedEvents = []
        self.location = LOCATION
        self.restaurantsData = []

    def getRestaurantsData(self):
        return self.restaurantsData

    def setQueryUrl(self, queryUrl):
        self.queryUrl = queryUrl

    def setCategory(self, category):
        self.category = category

    def run(self):
        self.__routeToRestaurantsFeed()
        self.__populateFeedEvents()
        self.__populateRestaurantsData()
        self.__addMenuDataToRestaurantsData()

    def __setFeedEvents(self, feedEvents):
        self.feedEvents = feedEvents

    def __setRestaurantsData(self, restaurantsData):
        self.restaurantsData = restaurantsData

    def __routeToRestaurantsFeed(self):
        if not self.queryUrl: return NameError('queryUrl is not defined')

        try:
            self.driver.get(self.queryUrl)
            searchTextbox = self.driver.find_element("id","location-typeahead-home-input")
            searchTextbox.send_keys(self.location)    
            sleep(2)

            findFoodButton = self.driver.find_element(By.XPATH, '//button[text()="Find Food"]')
            sleep(2)

            findFoodButton.click()
            sleep(5)
        except Exception as exception:
            Logger.log(f'Error: could not route to feed for category: {self.category}')
            Logger.log(f'Exception: {exception}')
            return False

    def __populateFeedEvents(self):
        performanceLogEvents = self.getPerformanceLogEvents()
        feedEvents = []

        for performanceLogEvent in performanceLogEvents:
            try:
                if self.__isFeedEvent(performanceLogEvent): feedEvents.append(performanceLogEvent)
            except KeyError:
                continue

        self.__setFeedEvents(feedEvents)

    def __isFeedEvent(self, event):
        return 'Network.response' in event['method'] and 'getFeedV1' in event['params']['response']['url']

    def __populateRestaurantsData(self):
        restaurantsData = []

        for feedEvent in self.feedEvents:
            feedEventBody = self.__getFeedEventBody(feedEvent)
            restaurantData = self.__getRestaurantData(feedEventBody)
            restaurantsData = [*restaurantsData, *restaurantData]
            
        self.__setRestaurantsData(restaurantsData)

    def __getFeedEventBody(self, feedEvent):
        return json.loads(
            self.driver.execute_cdp_cmd(
                'Network.getResponseBody',
                {'requestId': feedEvent["params"]["requestId"]}
            )['body']
        )

    def __getRestaurantData(self, feedEventBody):
        return [
            {
                'name': restaurant['store']['title']['text'],
                'category': self.category,
                'coordinates': {
                    'lat': restaurant['store']['mapMarker']['latitude'],
                    'long': restaurant['store']['mapMarker']['longitude']
                },
                'menu': []
            } for restaurant in feedEventBody['data']['feedItems']
        ]

    def __addMenuDataToRestaurantsData(self):

        for i in range(0, len(self.restaurantsData)):

            self.__clickRestaurant(self.restaurantsData[i]['name'])
            
            try:
                spanTexts = self.__getSpanTexts()
                menuData = self.__getMenuData(spanTexts)
                self.restaurantsData[i]['menu'] = menuData
                Logger.log(f'Got {len(menuData)} items of menu data for {self.restaurantsData[i]["name"]}')
            except Exception as exception:
                Logger.log(f'Could not get menu data for {self.restaurantsData[i]["name"]}')
                Logger.log(f'Exception: {exception}')
                continue

            self.resetDriver()
            self.__routeToRestaurantsFeed()
            sleep(2)

    def __clickRestaurant(self, restuarantName):
        try:
            restaurantLink = self.driver.find_element(By.XPATH, '//h3[text()="' + restuarantName + '"]')
        except Exception as exception:
            Logger.log(f'Could not find {restuarantName}')
            Logger.log(f'Exception: {exception}')
            return False
        restaurantLink.click()
        sleep(4)

    def __getMenuData(self, spanTexts):
        spanTexts = self.__getSpanTexts()
        menuData = []
        for j in range(0, len(spanTexts)):
            if spanTexts[j].startswith('$'):
                menuData.append({ 'name': spanTexts[j - 1], 'price': spanTexts[j], 'description': '' })
        if len(menuData) > 1: menuData.pop(0)
        return menuData

    def __getSpanTexts(self):
        return list(filter(lambda s: (len(s) > 0), [span.text for span in self.driver.find_elements(By.XPATH, '//span')]))
