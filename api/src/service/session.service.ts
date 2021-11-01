import config from 'config';
import { get, omit } from 'lodash';
import { getRepository } from 'typeorm';
import { Session } from '../entity/session.entity';
import { User } from '../entity/user.entity';
import { signJwt, verifyJwt } from '../utils/jwt';

export const createSession = async (user: User, userAgent: string) => {
  const sessionRepository = getRepository(Session);
  const session = new Session();
  session.user = user;
  session.userAgent = userAgent;

  try {
    await sessionRepository.save(session);
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSessionById = async (sessionId: number, relations?: string[]) => {
  const sessionRepository = getRepository(Session);
  const session = await sessionRepository.findOne(sessionId, { relations });
  return session;
};

export const deleteSession = async (sessionId: number) => {
  const sessionRepository = getRepository(Session);
  const session = await sessionRepository.findOne(sessionId);

  if (!session) return false;

  try {
    await sessionRepository.softDelete(sessionId);
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const reIssueAccessToken = async (refreshToken: string) => {
  const { decoded, expired } = verifyJwt(refreshToken);

  if (!decoded || expired) return false;

  const sessionId = get(decoded, 'sessionId');

  const sessionRepository = getRepository(Session);
  const session = await sessionRepository.findOne(sessionId, { relations: ['user'] });

  if (!session || session.deletedAt) return false;

  const user = omit(session.user, 'password');
  const accessToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: config.get('ACCESS_TOKEN_TTL') },
  );

  return accessToken;
};

export const getSessionsByUserId = async (userId: number) => {
  const sessionRepository = getRepository(Session);
  const sessions = await sessionRepository
    .createQueryBuilder('session')
    .where('session.userId = :userId', { userId })
    .getMany();
  return sessions;
};
