import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/routers.js';
import sequelize from './data/dbConnection.js';
import { fillIndicationTable } from './services/indicationService.js';

dotenv.config();
sequelize.sync().then(() => fillIndicationTable()).then(() => console.log('Database connected'));

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.use('/api', router);;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
