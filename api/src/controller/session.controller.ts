import config from 'config';
import { Request, Response } from 'express';
import { omit } from 'lodash';
import { CreateSessionRequestInput, LogoutUserSessionRequestInput } from '../schema/session.schema';
import {
  createSession,
  getSessionById,
  getSessionsByUserId,
  logoutUserSession,
} from '../service/session.service';
import { getUserByEmail } from '../service/user.service';
import { validateCandidatePassword } from '../utils/authentication';
import { HTTP_CODE } from '../utils/http-codes';
import { signJwt } from '../utils/jwt';
import logger from '../utils/logger';

export const createSessionHandler = async (
  request: Request<{}, {}, CreateSessionRequestInput['body']>,
  response: Response,
) => {
  const user = await getUserByEmail(request.body.email);

  if (!user) {
    return response.status(HTTP_CODE.BAD_REQUEST).send('Invalid email or password');
  }

  const isValid = validateCandidatePassword(user.password, request.body.password);

  if (isValid) {
    // create session
    const userAgent = request.get('user-agent') || 'No user-agent';
    try {
      const session = await createSession(user, userAgent);
      const userWithNoPassword = omit(user, 'password');
      const accessToken = signJwt(
        { ...userWithNoPassword, sessionId: session.id },
        {
          expiresIn: config.get<string>('ACCESS_TOKEN_TTL'),
        },
      );

      const refreshToken = signJwt(
        { ...userWithNoPassword, sessionId: session.id },
        {
          expiresIn: config.get<string>('REFRESH_TOKEN_TTL'),
        },
      );

      return response.send({ accessToken, refreshToken });
    } catch (error: any) {
      logger.error(error);
      return response.status(HTTP_CODE.BAD_REQUEST).send(error.message);
    }
  }

  return response.status(HTTP_CODE.BAD_REQUEST).send('Invalid email or password');
};

export const getUserSessionsHandler = async (request: Request, response: Response) => {
  const { user } = response.locals;
  const userSessions = await getSessionsByUserId(user.id);
  return response.send(userSessions);
};

export const logoutUserSessionHandler = async (
  request: Request<{}, {}, LogoutUserSessionRequestInput['body']>,
  response: Response,
) => {
  const authenticatedUser = response.locals.user;
  const session = await getSessionById(request.body.sessionId);

  if (!session || session.user.id !== authenticatedUser.id) {
    return response.sendStatus(HTTP_CODE.FORBIDDEN);
  }

  try {
    const hasLogout = await logoutUserSession(request.body.sessionId);

    if (!hasLogout) {
      return response.sendStatus(HTTP_CODE.METHOD_NOT_ALLOWED);
    }
  } catch (error: any) {
    logger.error(error);
    return response.status(HTTP_CODE.BAD_REQUEST).send(error.message);
  }

  return response.sendStatus(HTTP_CODE.OK);
};
