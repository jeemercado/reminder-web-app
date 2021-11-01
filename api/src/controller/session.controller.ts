import config from 'config';
import { Request, Response } from 'express';
import { omit } from 'lodash';
import { User } from '../entity/user.entity';
import { CreateSessionRequestInput, DeleteSessionRequestInput } from '../schema/session.schema';
import { createSession, getSessionsByUserId, deleteSession } from '../service/session.service';
import { getUserByEmail } from '../service/user.service';
import { validateCandidatePassword } from '../utils/authentication';
import { HTTP_CODE } from '../utils/http-codes';
import { signJwt } from '../utils/jwt';
import logger from '../utils/logger';

export const createUserSessionHandler = async (
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
  const authenticatedUser: User = response.locals.user;
  const userSessions = await getSessionsByUserId(authenticatedUser.id);
  return response.send(userSessions);
};

export const deleteUserSessionHandler = async (
  request: Request<{}, {}, DeleteSessionRequestInput['body']>,
  response: Response,
) => {
  try {
    const session = await deleteSession(request.body.sessionId);

    if (!session) {
      return response.sendStatus(HTTP_CODE.METHOD_NOT_ALLOWED);
    }
  } catch (error: any) {
    logger.error(error);
    return response.status(HTTP_CODE.BAD_REQUEST).send(error.message);
  }

  return response.sendStatus(HTTP_CODE.OK);
};
