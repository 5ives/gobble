import * as express from 'express';
import restaurantRouter from './src/routers/restaurant.route';
import { Request, Response, NextFunction } from 'express';
import * as cors from 'cors';
  
const app = express();
const port : Number = parseInt(process.env.PORT) || 8080;
  
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the gobble backend!');
})
  
app.listen(port,() => console.log('The application is listening on port http://localhost:' + port));

app.use(cors({ origin: ['http://localhost:3000, /.*gobble-beta.netlify.app/'] } as cors.CorsOptions));
app.use('/api/v1', restaurantRouter);

// middleware for error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });
    return;
});
