import { Request, Response } from 'express';
import { HTTP_CODE } from '../utils/http-codes';
import { CreateUserRequestInput } from '../schema/user.schema';
import { createUser } from '../service/user.service';
import logger from '../utils/logger';

export const createUserHandler = async (
  request: Request<{}, {}, CreateUserRequestInput['body']>,
  response: Response,
) => {
  const { displayName, email, password } = request.body;
  try {
    const user = await createUser(displayName, email, password);
    return response.send(user);
  } catch (error: any) {
    logger.error(error);
    return response.status(HTTP_CODE.BAD_REQUEST).send(error.message);
  }
};
