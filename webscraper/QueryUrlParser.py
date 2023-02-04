import os
from Parser import Parser
from Logger import Logger

class QueryUrlParser(Parser):

    def __init__(self, soup):
        Parser.__init__(self, soup)
        self.allLinks = self.__getAllLinks()
        self.queryUrlRecords = {}
        self.queryUrls = []

    def getQueryUrls(self):
        return self.queryUrls

    def parseQueryUrls(self):
        if not self.soup: return NameError('soup is not defined')

        categoryUrls = self.__getCategoryUrls()
        dishUrls = self.__getDishUrls()
        urls = categoryUrls + dishUrls
        self.__populateQueryUrlRecords(urls)
        self.__setQueryUrls(list(self.queryUrlRecords.keys()))
        Logger.log('parsed query urls')

    def toCategory(self, queryUrl: str):
        return os.path.basename(queryUrl)

    def toFullQueryUrl(self, category: str):
        return f'https://www.ubereats.com/au/category/sydney-nsw/{category}?mod=seoEnterAddress&next=%2Fau%2Fsearch%3Fq%3D{category}&ps=1'

    def __setQueryUrls(self, queryUrls):
        self.queryUrls = queryUrls

    def __populateQueryUrlRecords(self, urls):
        for url in urls:
            if url not in self.queryUrlRecords:
                self.queryUrlRecords[url] = True
    
    def __getCategoryUrls(self):
        if not self.soup: return NameError('soup is not defined')
        return list(filter(lambda category: '/au/category' in category, self.allLinks))

    def __getDishUrls(self):
        if not self.soup: return NameError('soup is not defined')
        return list(filter(lambda dish: '/au/dish' in dish, self.allLinks))

    def __getAllLinks(self):
        if not self.soup: return NameError('soup is not defined')
        return [link.get('href') for link in self.soup.find_all('a')]
