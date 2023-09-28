import { API } from "aws-amplify";
import { listRestaurants, listMenuItems, getRestaurant } from "../graphql/queries";

export const getRestaurants = async () => {
    const restaurants: any = await API.graphql({ query: listRestaurants });
    return restaurants.data.listRestaurants.items;
};

export const getRestaurantById = async (id: any) => {
    const restaurant: any = await API.graphql({ query: getRestaurant, variables: { id: id } });
    return restaurant.data.getRestaurant
};

export const getMenuItems = async () => {
    const menuItems: any = await API.graphql({ query: listMenuItems });
    return menuItems.data.listMenuItems.items;
};

export const searchRestaurants = async (cuisine: string, minPrice: number, maxPrice: number) => {

    const menuItems = await getMenuItems();

    const targetMenuItems = menuItems
        .filter((menuItem: any) => menuItem.price <= maxPrice && menuItem.price >= minPrice)
        .filter((menuItem: any) => menuItem.name.toLowerCase().includes(cuisine.toLowerCase()))
        .filter((menuItem: any, index: number, menuItems: any[]) => (
            menuItems.findIndex(mI => mI.restaurantId === menuItem.restaurantId) === index)
        );

    const targetRestaurants = await Promise.all(targetMenuItems.map(async (menuItem: any) => {
        const targetRestaurant = await getRestaurantById(menuItem.restaurantId)
        return ({
            name: targetRestaurant.name,
            lat: targetRestaurant.lat,
            long: targetRestaurant.long,
            menuItems: [{ name: menuItem.name, price: menuItem.price }]
        });
    }));
    
    return targetRestaurants;
}
