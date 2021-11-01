import bcrypt from 'bcrypt';
import config from 'config';

export const validateCandidatePassword = (password: string, candidatePassword: string) =>
  bcrypt.compareSync(candidatePassword, password);

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(Number(config.get('SALT_WORK_FACTOR')));
  return bcrypt.hashSync(password, salt);
};
