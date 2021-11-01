import { NextFunction, Request, Response } from 'express';

const requireUser = (request: Request, response: Response, next: NextFunction) => {
  const { user } = response.locals;

  if (!user) {
    return response.sendStatus(401);
  }

  return next();
};

export default requireUser;
