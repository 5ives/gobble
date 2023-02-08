from Logger import Logger
from consts import CATEGORY_URL
from RestaurantDataScraper import RestaurantDataScraper
from QueryUrlParser import QueryUrlParser
from Scraper import Scraper

if __name__ == "__main__":

    scraper = Scraper()
    categorySoup = scraper.getSoup(CATEGORY_URL)

    queryUrlParser = QueryUrlParser(categorySoup)
    queryUrlParser.parseQueryUrls()
    queryUrls = queryUrlParser.getQueryUrls()

    restaurantDataScraper = RestaurantDataScraper()

    for queryUrl in queryUrls[:2]:
        category = queryUrlParser.toCategory(queryUrl)
        Logger.log(f'Getting data for category: {category}')
        fullQueryUrl = queryUrlParser.toFullQueryUrl(category)

        restaurantDataScraper.setQueryUrl(fullQueryUrl)
        restaurantDataScraper.setCategory(category)
        restaurantDataScraper.run()
        Logger.log(f'Finished scraping category: {category}')
