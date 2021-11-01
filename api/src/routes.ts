import { Express, Request, Response } from 'express';
import {
  createUserNoteHandler,
  deleteUserNoteHandler,
  getUserNotesHandler,
  updateUserNoteHandler,
} from './controller/note.controller';
import { createUserSessionHandler, getUserSessionsHandler } from './controller/session.controller';
import {
  checkUncheckUserTodoHandler,
  createUserTodoHandler,
  deleteUserTodoHandler,
  getUserTodosHandler,
  updateUserTodoHandler,
} from './controller/todo.controller';
import { createUserHandler } from './controller/user.controller';
import requireSameUser from './middleware/require-same-user';
import requireUser from './middleware/require-user';
import validateResource from './middleware/validate-resource';
import {
  createNoteSchema,
  deleteNoteSchema,
  getNotesSchema,
  updateNoteSchema,
} from './schema/note.schema';
import { createSessionSchema, deleteSessionSchema } from './schema/session.schema';
import {
  createTodoSchema,
  deleteTodoSchema,
  getTodosSchema,
  updateTodoSchema,
  checkUncheckTodoSchema,
} from './schema/todo.schema';
import { createUserSchema } from './schema/user.schema';

export const initializeRoutes = (app: Express) => {
  app.get('/health-check', (request: Request, response: Response) => response.sendStatus(200));

  /** USER */
  app.post('/user', validateResource(createUserSchema), createUserHandler);

  /** USER SESSIONS */
  app.post('/user/session', validateResource(createSessionSchema), createUserSessionHandler);
  app.get('/user/sessions', [requireUser], getUserSessionsHandler);
  app.delete(
    '/user/session',
    [requireUser, validateResource(deleteSessionSchema), requireSameUser],
    deleteUserNoteHandler,
  );

  /** USER NOTES */
  app.post(
    '/user/note',
    [requireUser, validateResource(createNoteSchema), requireSameUser],
    createUserNoteHandler,
  );
  app.get(
    '/user/notes',
    [requireUser, validateResource(getNotesSchema), requireSameUser],
    getUserNotesHandler,
  );
  app.patch(
    '/user/note',
    [requireUser, validateResource(updateNoteSchema), requireSameUser],
    updateUserNoteHandler,
  );
  app.delete(
    '/user/note',
    [requireUser, validateResource(deleteNoteSchema), requireSameUser],
    deleteUserNoteHandler,
  );

  /** USER TODO */
  app.post(
    '/user/todo',
    [requireUser, validateResource(createTodoSchema), requireSameUser],
    createUserTodoHandler,
  );
  app.get(
    '/user/todos',
    [requireUser, validateResource(getTodosSchema), requireSameUser],
    getUserTodosHandler,
  );
  app.patch(
    '/user/todo/check',
    [requireUser, validateResource(checkUncheckTodoSchema), requireSameUser],
    checkUncheckUserTodoHandler,
  );
  app.patch(
    '/user/todo',
    [requireUser, validateResource(updateTodoSchema), requireSameUser],
    updateUserTodoHandler,
  );
  app.delete(
    '/user/todo',
    [requireUser, validateResource(deleteTodoSchema), requireSameUser],
    deleteUserTodoHandler,
  );
};
