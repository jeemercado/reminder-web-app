import config from 'config';
import express from 'express';
import deserializeUser from './middleware/deserialize-user';
import { initializeRoutes } from './routes';
import { connectDb } from './utils/connect';
import logger from './utils/logger';

const SERVER_PORT = Number(config.get('SERVER_PORT'));

const app = express();
app.use(express.json());
app.use(deserializeUser);

const handleOnListen = async () => {
  logger.info(`Server is now running. Listening in port ${SERVER_PORT}`);
  // Connect to the database
  await connectDb();

  // Initialize routes
  initializeRoutes(app);
};

app.listen(SERVER_PORT, handleOnListen);
