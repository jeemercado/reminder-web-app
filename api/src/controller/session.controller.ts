import config from 'config';
import { Request, Response } from 'express';
import { omit } from 'lodash';
import { CreateSessionRequestInput, LogoutUserSessionRequestInput } from '../schema/session.schema';
import { createSession, getSessionsByUserId, logoutUserSession } from '../service/session.service';
import { getUserByEmail } from '../service/user.service';
import { validateCandidatePassword } from '../utils/authentication';
import { signJwt } from '../utils/jwt';

export const createSessionHandler = async (
  request: Request<{}, {}, CreateSessionRequestInput['body']>,
  response: Response,
) => {
  const user = await getUserByEmail(request.body.email);

  if (!user) {
    return response.status(400).send('Invalid email or password');
  }

  const isValid = validateCandidatePassword(user.password, request.body.password);

  if (isValid) {
    // create session
    const userAgent = request.get('user-agent') || 'No user-agent';
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
  }

  return response.status(400).send('Invalid email or password');
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
  const hasLogout = await logoutUserSession(request.body.sessionId);
  if (hasLogout) {
    return response.sendStatus(405);
  }
  return response.sendStatus(200);
};
