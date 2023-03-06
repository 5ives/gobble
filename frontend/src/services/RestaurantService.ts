import { Filters } from "../types/filters.type";
import { getRequest } from "../utils/apiUtils";

export const getRestaurants = async (filters: Filters) => await getRequest('http://localhost:8080/api/v1/restaurants', filters);
