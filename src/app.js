import express from 'express';
import cors from 'cors';
import router from './routers/routers.js';
import sequelize from './data/dbConnection.js';
import { fillIndicationTable } from './services/indicationService.js';
import errorHandler from './middlewares/errorHandler.js';

sequelize.sync().then(() => fillIndicationTable()).then(() => console.log('Database connected'));

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

export default app;
