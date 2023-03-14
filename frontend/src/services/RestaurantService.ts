import { Filters } from "../types/filters.type";
import { getRequest } from "../utils/apiUtils";

export const getRestaurants = async (filters: Filters) => {
    const restaurants = await getRequest('http://gobble-api.eba-y3hkh3fb.ap-southeast-2.elasticbeanstalk.com/api/v1/restaurants', filters);
    return restaurants;
};
