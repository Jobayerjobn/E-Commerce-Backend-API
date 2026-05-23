import express from 'express';
import { logger } from './middleware.js';
import router from './router.js';
import { globalErrorHandler } from './controller.js';
const app = express();
app.use(express.json());


app.use(logger); 
app.use('/api/v1', router); 
app.use(globalErrorHandler);






export default app;
