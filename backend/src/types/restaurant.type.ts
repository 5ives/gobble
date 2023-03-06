
export type Filters = {
    cuisine: string;
    minPrice: number;
    maxPrice: number;
};

export type GetRestaurantByFiltersResponse = {
    restaurantName: string;
    latitude: string;
    longitude: string;
    menuItemName: string;
    menuItemPrice: string;
};

export type MenuItem = {
    name: string;
    price: number;
}

export type Restaurant = {
    restaurantName: string;
    lat: number;
    long: number;
    menuItems: [MenuItem];
};
