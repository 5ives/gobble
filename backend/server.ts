
// Importing module
import * as express from 'express';
  
const app = express();
const PORT : Number = 8080;
  
// Handling GET / Request
app.get('/', (req: any, res: any) => {
    res.send('Welcome to typescript backend!');
})
  
// Server setup
app.listen(PORT,() => {
    console.log('The application is listening '
          + 'on port http://localhost:'+PORT);
})