import { createContext } from "react";
import { DEFAULT_RESTAURANTS } from "./useRestaurantContextConsts";
import { IRestaurantContext } from "./useRestaurantContextTypes";

const defaultSetRestaurants = () => {};

const defaultSearchContext : IRestaurantContext = {
    restaurants: DEFAULT_RESTAURANTS,
    setRestaurants: defaultSetRestaurants
};

export const RestaurantContext = createContext<IRestaurantContext>(defaultSearchContext);
