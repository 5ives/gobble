from Parser import Parser

class QueryUrlParser(Parser):

    def __init__(self, soup):
        Parser.__init__(self, soup)
        self.queryUrlRecords = {}
        self.queryUrls = []

    def getQueryUrls(self):
        return self.queryUrls

    def parseQueryUrls(self):
        if not self.soup: return NameError('soup is not defined')

        categoryUrls = self.__getCategoryUrls()
        dishUrls = self.__getDishUrls()
        urls = categoryUrls + dishUrls

        for url in urls:
            if url not in self.queryUrlRecords:
                self.queryUrlRecords[url] = True

        self.queryUrls = list(self.queryUrlRecords.keys())
    
    def __getCategoryUrls(self):
        if not self.soup: return NameError('soup is not defined')

        categories = [link.get('href') for link in self.soup.find_all('a')]
        return list(filter(lambda category: '/au/category' in category, categories))

    def __getDishUrls(self):
        if not self.soup: return NameError('soup is not defined')

        dishes = [link.get('href') for link in self.soup.find_all('a')]
        return list(filter(lambda dish: '/au/dish' in dish, dishes))
