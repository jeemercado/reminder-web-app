import config from 'config';
import jwt from 'jsonwebtoken';

const privateKey = config.get<string>('JWT_PRIVATE_KEY');
const publicKey = config.get<string>('JWT_PUBLIC_KEY');

export const signJwt = (object: Object, options?: jwt.SignOptions | undefined) =>
  jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    };
  }
};
