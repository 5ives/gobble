import { createContext } from "react";
import { DEFAULT_FOOD, DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from "./useSearchContextConsts";
import { ISearchContext, ISearchInput } from "./useSearchContextTypes";

const defaultSetSearchInput : Function = () => {};

export const defaultSearchInput : ISearchInput = {
    food: DEFAULT_FOOD,
    minPrice: DEFAULT_MIN_PRICE,
    maxPrice: DEFAULT_MAX_PRICE,
};

const defaultSearchContext : ISearchContext = {
    searchInput: defaultSearchInput,
    setSearchInput: defaultSetSearchInput
};

export const SearchContext = createContext<ISearchContext>(defaultSearchContext);
