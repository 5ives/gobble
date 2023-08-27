import { API } from "aws-amplify";
import { listRestaurants } from "../graphql/queries";

export const getRestaurants = async () => {
    const restaurants: any = await API.graphql({ query: listRestaurants });
    return restaurants.data.listRestaurants.items;
};
