import * as express from 'express';
import restaurantRouter from './src/routers/restaurant.route';
import { Request, Response, NextFunction } from 'express';
  
const app = express();
const port : Number = parseInt(process.env.PORT) || 8080;
  
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the gobble backend!');
})
  
app.listen(port,() => console.log('The application is listening on port http://localhost:' + port));

app.use('/api/v1', restaurantRouter);

// middleware for error handling
app.use((err: any, res: Response) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });
    return;
});
