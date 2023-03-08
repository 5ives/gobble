import * as express from 'express';
import restaurantRouter from './src/routers/restaurant.route';
import { Request, Response, NextFunction } from 'express';
import * as cors from 'cors';
  
const app = express();
const port : Number = 80;
  
app.get('/', (res: Response) => {
    res.send('Welcome to the gobble backend!');
})
  
app.listen(port,() => console.log('The application is listening on port' + port));

app.use(cors({ origin: ['http://localhost:3000'] } as cors.CorsOptions));
app.use('/api/v1', restaurantRouter);

// middleware for error handling
app.use((err: any, res: Response) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });
    return;
});
