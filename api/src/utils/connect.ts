import config from 'config';
import { createConnection } from 'typeorm';
import { Note } from '../entity/note.entity';
import { Session } from '../entity/session.entity';
import { User } from '../entity/user.entity';
import logger from './logger';

export const connectDb = () => {
  // Initialize DB Config
  createConnection({
    type: 'postgres',
    host: config.get<string>('DATABASE_HOST'),
    port: config.get<number>('DATABASE_PORT'),
    username: config.get<string>('DATABASE_USER'),
    password: config.get<string>('DATABASE_PASSWORD'),
    database: config.get<string>('DATABASE_NAME'),
    entities: [User, Session, Note],
  }).then(
    () => {
      logger.info('Connection has been established successfully');
    },
    (error) => {
      logger.error('Unable to connect to the database', error);
    },
  );
};
