import { omit } from 'lodash';
import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import { hashPassword } from '../utils/authentication';

export const createUser = async (displayName: string, email: string, password: string) => {
  const userRepository = getRepository(User);

  const hashedPassword = await hashPassword(password);

  const user = new User();
  user.displayName = displayName;
  user.email = email;
  user.password = hashedPassword;

  try {
    await userRepository.save(user);
    return omit(user, 'password');
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserById = async (userId: number) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(userId);
  return user;
};

export const getUserByEmail = async (email: string) => {
  const userRepository = getRepository(User);
  const user = await userRepository
    .createQueryBuilder('user')
    .where('user.email = :email', { email })
    .getOne();
  return user;
};
