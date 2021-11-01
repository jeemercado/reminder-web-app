import { NextFunction, Request, Response } from 'express';
import { HTTP_CODE } from '../utils/http-codes';

const requireSameUser = (request: Request, response: Response, next: NextFunction) => {
  const { user } = response.locals;

  if (user.id !== request.body.userId) {
    return response.status(HTTP_CODE.FORBIDDEN).send('User is not allowed to send this request');
  }

  return next();
};

export default requireSameUser;
