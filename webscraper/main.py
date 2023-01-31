import json
import ssl
import time
import os

from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service

location = 'Pitt Street Mall'

def getFullQueryUrl(category):
    return f'https://www.ubereats.com/au/category/sydney-nsw/{category}?mod=seoEnterAddress&next=%2Fau%2Fsearch%3Fq%3D{category}&ps=1'

def processBrowserLogEntry(entry):
    response = json.loads(entry['message'])['message']
    return response

def setupDriver():

    # add performance analysis capabilities
    caps = DesiredCapabilities.CHROME
    caps['goog:loggingPrefs'] = {'performance': 'ALL'}

    # add ChromeDriver for selenium usage
    chromeOptions = webdriver.ChromeOptions()
    chromeOptions.add_argument('--headless')
    chromeOptions.add_argument('--disable-dev-shm-usage')
    chromeOptions.add_argument('--no-sandbox')
    chromeOptions.add_argument("start-maximized")
    chromeOptions.add_argument("disable-infobars")
    chromeOptions.add_argument("--disable-extensions")
    chromeOptions.add_argument('--no-sandbox')
    chromeOptions.add_argument('--disable-application-cache')
    chromeOptions.add_argument('--disable-gpu')
    chromeOptions.add_argument("--disable-dev-shm-usage")
    chromeOptions.add_argument('--disable-blink-features=AutomationControlled')

    service = Service(executable_path=ChromeDriverManager().install())

    driver = webdriver.Chrome(
        ChromeDriverManager().install(),
        desired_capabilities=caps,
        options=chromeOptions,
        service=service
    )

    return driver

def routeToRestaurantsFeed(fullQueryUrl):
    driver = setupDriver()
    driver.get(fullQueryUrl)

    searchTextbox = driver.find_element("id","location-typeahead-home-input")
    searchTextbox.send_keys(location)    
    time.sleep(2)

    b = driver.find_element(By.XPATH, '//button[text()="Find Food"]')
    time.sleep(2)

    b.click()
    time.sleep(5)

    return driver

def getFeedEvents(driver):
    perf = driver.get_log('performance')
    events = [processBrowserLogEntry(entry) for entry in perf]

    feedEvents = []
    for event in events:
        try:
            if 'Network.response' in event['method'] and 'getFeedV1' in event['params']['response']['url']:
                feedEvents.append(event)
        except KeyError:
            continue

    return feedEvents

def writeToResultFile(object, filename):
    with open(filename, 'w') as f:
        json.dump(object, f)

def getRestaurantData(feedEvents, category):
    restaurantData = []
    for feedEvent in feedEvents:

        feedEventBody = json.loads(driver.execute_cdp_cmd(
            'Network.getResponseBody',
            {'requestId': feedEvent["params"]["requestId"]}
        )['body'])

        newRestaurantRecords = [
            {
                'name': restaurant['store']['title']['text'],
                'category': category,
                'coordinates': {
                    'lat': restaurant['store']['mapMarker']['latitude'],
                    'long': restaurant['store']['mapMarker']['longitude']
                },
                'menu': []
            } for restaurant in feedEventBody['data']['feedItems']
        ]

        restaurantData = [*restaurantData, *newRestaurantRecords]
        
    return restaurantData

def addMenuData(restaurantData, driver, currQueryUrl):

    for i in range(0, len(restaurantData)):

        try:
            restaurantLink = driver.find_element(By.XPATH, '//h3[text()="' + restaurantData[i]['name'] + '"]')
        except:
            print('Could not find', restaurantData[i]['name'])
            continue
        
        restaurantLink.click()
        time.sleep(2)
        
        try:
            spanTexts = [span.text for span in driver.find_elements(By.XPATH, '//span')]
            spanTexts = list(filter(lambda s: (len(s) > 0), spanTexts))

            menu = []
            for j in range(0, len(spanTexts)):
                if spanTexts[j].startswith('$'):
                    menu.append({ 'name': spanTexts[j - 1], 'price': spanTexts[j] })
            if len(menu) > 1: menu.pop(0)
            restaurantData[i]['menu'] = menu
            print('Got', len(menu), 'items of menu data for', restaurantData[i]['name'])
        except:
            print('Could not get menu data for', restaurantData[i]['name'])
            pass
        
        driver = resetDriver(driver, currQueryUrl)
        driver = routeToRestaurantsFeed(currQueryUrl)
        time.sleep(2)

    return restaurantData

def getCategory(queryUrl):
    return os.path.basename(queryUrl)

def resetDriver(driver, currQueryUrl):
    driver.close()
    driver.quit()
    time.sleep(2)

def getSubQueryUrls(queryUrlsFile):
    queryUrls = json.load(queryUrlsFile)
    return queryUrls

if __name__ == "__main__":

    queryUrlsFile = open('queryUrls.json')
    subQueryUrls = getSubQueryUrls(queryUrlsFile);    

    for subQueryUrl in subQueryUrls[:2]:
        
        category = getCategory(subQueryUrl)
        print('Getting data for category:', category)
        fullQueryUrl = getFullQueryUrl(category)

        try:
            driver = routeToRestaurantsFeed(fullQueryUrl)
            feedEvents = getFeedEvents(driver)
        except Exception as e:
            print(e)
            print('Could not route to feed for category:', category)
            continue

        restaurantData = addMenuData(getRestaurantData(feedEvents, category), driver, fullQueryUrl)
        print('Finished scraping category:', category)
        writeToResultFile(restaurantData, f'{category}.json')
    
    queryUrlsFile.close()

    # final restaurant structure should be:
    # { title: string, lat: number, long: number, menu: array<object> (menu) }

    # final menu structure should be:
    # [ { name: string, price: number, description: string } ]
