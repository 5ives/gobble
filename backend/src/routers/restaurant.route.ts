import * as express from 'express';
import { get } from '../controllers/restaurant.controller';

const restaurantRouter = express.Router();

restaurantRouter.get('/restaurants', get);

export default restaurantRouter;
