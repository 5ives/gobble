
export type ISearchInput = {
    food: string;
    minPrice: number;
    maxPrice: number;
};

export type ISearchContext = {
    searchInput: ISearchInput;
    setSearchInput: Function;
};
