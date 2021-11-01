import { Express, Request, Response } from 'express';
import {
  createSessionHandler,
  getUserSessionsHandler,
  logoutUserSessionHandler,
} from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';
import requireUser from './middleware/require-user';
import validateResource from './middleware/validate-resource';
import { createSessionSchema, logoutUserSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

export const initializeRoutes = (app: Express) => {
  app.get('/health-check', (request: Request, response: Response) => response.sendStatus(200));

  app.post('/user', validateResource(createUserSchema), createUserHandler);

  app.post('/user/session', validateResource(createSessionSchema), createSessionHandler);

  app.get('/user/sessions', requireUser, getUserSessionsHandler);

  app.patch(
    '/user/session',
    requireUser,
    validateResource(logoutUserSessionSchema),
    logoutUserSessionHandler,
  );
};
