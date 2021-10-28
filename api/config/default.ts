import dotenv from 'dotenv';
dotenv.config();

export default {
  SERVER_PORT: process.env.SERVER_PORT,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_PORT: process.env.DATABASE_PORT,
};
