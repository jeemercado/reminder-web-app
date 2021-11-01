import { NextFunction, Request, Response } from 'express';
import { HTTP_CODE } from '../utils/http-codes';

const requireUser = (request: Request, response: Response, next: NextFunction) => {
  const { user } = response.locals;

  if (!user) {
    return response.sendStatus(HTTP_CODE.UNAUTHORIZED);
  }

  return next();
};

export default requireUser;
