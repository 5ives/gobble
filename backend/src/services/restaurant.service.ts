import { QueryResult } from "pg";
import { Filters, GetRestaurantByFiltersResponse } from "../types/restaurant.type";
import { groupMenuItemDataByRestaurant } from "../utils/restaurant.util";
import { query } from "./db.service";

export const getRestaurantByFilters = async (filters : Filters) => {
    const res: QueryResult<GetRestaurantByFiltersResponse> = await query(`
        SELECT restaurants.name as "restaurantName",
            locations.lat as "latitude",
            locations.long as "longitude",
            menu_items.name as "menuItemName",
            menu_items.price as "menuItemPrice"
        FROM menu_items,
            restaurants, locations
        WHERE LOWER(menu_items.name) LIKE '%${filters.cuisine}%'
            AND menu_items.price < ${filters.maxPrice}
            AND menu_items.price > ${filters.minPrice}
            AND menu_items.restaurant_id = restaurants.id
            AND locations.restaurant_id = restaurants.id;
    `);
    return groupMenuItemDataByRestaurant(res.rows);
};
