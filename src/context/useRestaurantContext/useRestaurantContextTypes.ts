import { Restaurant } from "../../types/restaurant.type";

export type IRestaurantContext = {
    restaurants: Restaurant[];
    setRestaurants: Function;
};
