import config from 'config';
import express from 'express';
import { connectDb } from './utils/connect';
import logger from './utils/logger';
import { initializeRoutes } from './routes';

const SERVER_PORT = config.get<number>('SERVER_PORT');

const app = express();
app.use(express.json());

const handleOnListen = async () => {
  logger.info(`Server is now running. Listening in port ${SERVER_PORT}`);
  // Connect to the database
  await connectDb();

  // Initialize routes
  initializeRoutes(app);
};

app.listen(SERVER_PORT, handleOnListen);
