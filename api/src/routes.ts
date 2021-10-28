import { Express, Request, Response } from 'express';

export const initializeRoutes = (app: Express) => {
  app.get('/health-check', (request: Request, response: Response) => response.sendStatus(200));
};
