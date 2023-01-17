import json
import ssl
import time
import os

from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service

'''
Returns the URL to search for certain categories in the Uber Eats website.
'''
def getQueryUrl(category):
    return f'https://www.ubereats.com/au/category/sydney-nsw/{category}?mod=seoEnterAddress&next=%2Fau%2Fsearch%3Fq%3D{category}&ps=1'

'''
This function takes a single argument, entry, which is a dictionary containing a browser log entry. It extracts the
message field from the entry dictionary, and then parses it as a JSON object. The message field of the JSON object is
then returned.
'''
def processBrowserLogEntry(entry):
    response = json.loads(entry['message'])['message']
    return response

'''
This function sets up and returns a web driver for the Chrome browser. It uses the ChromeDriverManager to
automatically download the appropriate version of the ChromeDriver executable. It also sets the logging preferences
for performance logs.
'''
def setupDriver():

    # add performance analysis capabilities
    caps = DesiredCapabilities.CHROME
    caps['goog:loggingPrefs'] = {'performance': 'ALL'}

    # add ChromeDriver for selenium usage
    chromeOptions = webdriver.ChromeOptions()
    chromeOptions.binary_location = os.environ.get('GOOGLE_CHROME_BIN')
    chromeOptions.add_argument('--headless')
    chromeOptions.add_argument('--disable-dev-shm-usage')
    chromeOptions.add_argument('--no-sandbox')

    driver = webdriver.Chrome(
        ChromeDriverManager().install(),
        desired_capabilities=caps,
        service=Service(executable_path=os.environ.get("CHROMEDRIVER_PATH")),
        options=chromeOptions
    )

    return driver

'''
This function takes in two arguments, a web driver driver, and a location string. It finds the search textbox element
by its 'id' and 'location-typeahead-home-input' and enters the location in it. It then finds the button with text
'Find Food' using xpath, clicks on it and waits for 5 seconds for the restaurants feed to load.
'''
def routeToRestaurantsFeed(driver, location):
    searchTextbox = driver.find_element("id","location-typeahead-home-input")
    searchTextbox.send_keys(location)
    
    time.sleep(2)
    b = driver.find_element(By.XPATH, '//button[text()="Find Food"]')

    time.sleep(2)
    b.click()

    time.sleep(5)

'''
Retrieves the feed events from the browser performance log of the provided web driver.

Inputs:
- driver (webdriver): A Selenium webdriver object representing a web browser.

Output:
- (list of dictionaries): A list of dictionaries containing information about the feed events in the browser performance
    log. Each dictionary contains the following keys:
    - method (string): The method of the event.
    - params (dictionary): A dictionary of parameters related to the event.
'''
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

'''
This function writes the given object to a file with the specified filename. It opens the file with write mode 'w'
using the open() function and writes the object to the file by calling json.dump(object, f). The json.dump() function
serializes the object to a JSON formatted string and writes it to the file. This function can be used to save the
result of some processing to a file for future use or analysis.
'''
def writeToResultFile(object, filename):
    with open(filename, 'w') as f:
        json.dump(object, f)

'''
gets the names and locations of restaurants from getFeedV1 request
- data.feedItems.[n].store.mapMarker.latitude
- data.feedItems.[n].store.mapMarker.longitude
- data.feedItems.[n].store.title.text
'''
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

'''
This function takes in a list of restaurant data and a web driver as arguments. It iterates through the restaurantData
list, clicks on the restaurant link, extracts menu data from the menu page, adds it to the restaurant data and goes
back to the previous page. It then returns the updated restaurant data list with menu information added.
'''
def addMenuData(restaurantData, driver):

    for i in range(0, len(restaurantData)):

        try:
            restaurantLink = driver.find_element(By.XPATH, '//h3[text()="' + restaurantData[i]['name'] + '"]')
        except:
            print('Could not find', restaurantData[i]['name'])
            continue
        
        restaurantLink.click()
        time.sleep(4)
        
        try:
            spanTexts = [span.text for span in driver.find_elements(By.XPATH, '//span')]
            spanTexts = list(filter(lambda s: (len(s) > 0), spanTexts))

            menu = []
            for j in range(0, len(spanTexts)):
                if spanTexts[j].startswith('$'):
                    menu.append({ 'name': spanTexts[j - 1], 'price': spanTexts[j] })
            if len(menu) > 1: menu.pop(0)
            restaurantData[i]['menu'] = menu
        except:
            print('Could not get menu data for', restaurantData[i]['name'])
            pass
        
        driver.execute_script("window.history.go(-1)")
        time.sleep(4)

    return restaurantData

'''
This function takes in a queryUrl and returns the last element of the url. It can be used to extract the category
from a url.
'''
def getCategory(queryUrl):
    return os.path.basename(queryUrl)

if __name__ == "__main__":

    driver = setupDriver()
    location = 'Pitt Street Mall'
    queryUrlsFile = open('queryUrls.json')
    queryUrls = json.load(queryUrlsFile)

    for queryUrl in queryUrls[:2]:
        category = getCategory(queryUrl)
        print('Getting data for category:', category)

        url = getQueryUrl(category)
        driver.get(url)

        try:
            routeToRestaurantsFeed(driver, location)
        except:
            print('Could not route to feed for category:', category)
            continue

        feedEvents = getFeedEvents(driver)

        try:
            restaurantData = addMenuData(getRestaurantData(feedEvents, category), driver)
        except:
            pass
        finally:
            print('Finished scraping category:', category)
            writeToResultFile(restaurantData, f'{category}.json')
    
    queryUrlsFile.close()

    # final restaurant structure should be:
    # { title: string, lat: number, long: number, menu: array<object> (menu) }

    # final menu structure should be:
    # [ { name: string, price: number, description: string } ]
