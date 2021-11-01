import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { reIssueAccessToken } from '../service/session.service';
import { verifyJwt } from '../utils/jwt';

const deserializeUser = async (request: Request, response: Response, next: NextFunction) => {
  const accessToken = get(request, 'headers.authorization', '').replace(/^Bearer\s/, '');

  const refreshToken = get(request, 'headers.x-refresh-token');

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    response.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      response.setHeader('X-Access-Token', newAccessToken);
    }

    const result = verifyJwt(newAccessToken as string);

    response.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
