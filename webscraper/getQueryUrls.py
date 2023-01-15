import requests
import json
from bs4 import BeautifulSoup

def getSoup():
    url = 'https://www.ubereats.com/au/category/sydney-nsw'
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')
    return soup

def getCategoryUrls(soup): 
    categories = [link.get('href') for link in soup.find_all('a')]
    return list(filter(lambda category: '/au/category' in category, categories))

def getDishUrls(soup): 
    dishes = [link.get('href') for link in soup.find_all('a')]
    return list(filter(lambda dish: '/au/dish' in dish, dishes))

def writeToResultFile(object):
    with open('queryUrls.json', 'w') as result:
        json.dump(object, result)

if __name__ == "__main__":
    urlRecords = {}
    soup = getSoup()
    categoryUrls = getCategoryUrls(soup)
    dishUrls = getDishUrls(soup)

    for c in categoryUrls:
        if c not in urlRecords:
            urlRecords[c] = 1

    for d in dishUrls:
        if d not in urlRecords:
            urlRecords[d] = 1

    writeToResultFile(list(urlRecords.keys()))
