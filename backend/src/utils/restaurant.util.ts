import { GetRestaurantByFiltersResponse, MenuItem, Restaurant } from "../types/restaurant.type";
import { get } from "lodash";

export const groupMenuItemDataByRestaurant = (menuItemData: GetRestaurantByFiltersResponse[]) => {
    return Object.values(menuItemData.reduce((groupedMenuItemData: any, restaurant: GetRestaurantByFiltersResponse) => {

        const menuItems: MenuItem[] = get(groupedMenuItemData, `${restaurant.restaurantName}.menuItems`, []);
        menuItems.push({ name: restaurant.menuItemName, price: parseInt(restaurant.menuItemPrice) });

        groupedMenuItemData[restaurant.restaurantName] = {
            name: restaurant.restaurantName,
            lat: parseInt(restaurant.latitude),
            long: parseInt(restaurant.longitude),
            menuItems
        };

        return groupedMenuItemData;

    }, {}));
};
