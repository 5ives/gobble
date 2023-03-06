import { getRestaurantByFilters } from "../services/restaurant.service";
import { Request, Response, NextFunction } from "express";
import { Filters } from "../types/restaurant.type";

export const get = async (req: Request<{}, {}, {}, Filters>, res: Response, next: NextFunction) => {
    try {
        res.json(await getRestaurantByFilters({
            cuisine: req.query.cuisine,
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice
        } as Filters));
    } catch (err) {
        console.error(`Error while getting restaurants`, err.message);
        next(err);
    }
};
