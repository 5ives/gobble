import { GetRestaurantByFiltersResponse, MenuItem } from "../types/restaurant.type";
import { get } from "lodash";

export const groupMenuItemDataByRestaurant = (menuItemData: GetRestaurantByFiltersResponse[]) => {
    return Object.values(menuItemData.reduce((groupedMenuItemData: any, restaurant: GetRestaurantByFiltersResponse) => {

        const menuItems: MenuItem[] = get(groupedMenuItemData, `${restaurant.restaurantName}.menuItems`, []);
        menuItems.push({ name: restaurant.menuItemName, price: parseFloat(restaurant.menuItemPrice) });

        groupedMenuItemData[restaurant.restaurantName] = {
            name: restaurant.restaurantName,
            lat: parseFloat(restaurant.latitude),
            long: parseFloat(restaurant.longitude),
            menuItems
        };

        return groupedMenuItemData;

    }, {}));
};
