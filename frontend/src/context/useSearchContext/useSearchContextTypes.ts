
export type ISearchInput = {
    cuisine: string;
    minPrice: number;
    maxPrice: number;
    isSubmitted: boolean;
};

export type ISearchContext = {
    searchInput: ISearchInput;
    setSearchInput: Function;
};
