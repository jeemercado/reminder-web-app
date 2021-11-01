import { Request, Response } from 'express';
import { User } from '../entity/user.entity';
import {
  CheckUncheckRequestInput,
  CreateTodoRequestInput,
  DeleteTodoRequestInput,
  GetTodosRequestInput,
  UpdateTodoRequestInput,
} from '../schema/todo.schema';
import {
  checkUncheckTodo,
  createTodo,
  deleteTodo,
  getTodosByUserId,
  updateTodo,
} from '../service/todo.service';
import { getUserById } from '../service/user.service';
import { HTTP_CODE } from '../utils/http-codes';
import logger from '../utils/logger';

export const createUserTodoHandler = async (
  request: Request<{}, {}, CreateTodoRequestInput['body']>,
  response: Response,
) => {
  const authenticatedUser: User = response.locals.user;
  const user = await getUserById(authenticatedUser.id);

  if (!user) {
    return response.status(HTTP_CODE.BAD_REQUEST).send('User not found.');
  }

  try {
    const todo = await createTodo(user, request.body.data);
    return response.send(todo);
  } catch (error: any) {
    logger.error(error);
    return response.sendStatus(HTTP_CODE.BAD_REQUEST);
  }
};

export const getUserTodosHandler = async (
  request: Request<{}, {}, GetTodosRequestInput['body']>,
  response: Response,
) => {
  const authenticatedUser: User = response.locals.user;
  const userTodos = await getTodosByUserId(authenticatedUser.id);
  return response.send(userTodos);
};

export const checkUncheckUserTodoHandler = async (
  request: Request<{}, {}, CheckUncheckRequestInput['body']>,
  response: Response,
) => {
  try {
    const todo = await checkUncheckTodo(request.body.todoId, request.body.isFinished);

    if (!todo) return response.sendStatus(HTTP_CODE.METHOD_NOT_ALLOWED);

    return response.send(todo);
  } catch (error: any) {
    logger.error(error);
    return response.sendStatus(HTTP_CODE.BAD_REQUEST);
  }
};

export const updateUserTodoHandler = async (
  request: Request<{}, {}, UpdateTodoRequestInput['body']>,
  response: Response,
) => {
  try {
    const todo = await updateTodo(request.body.todoId, request.body.data);

    if (!todo) return response.sendStatus(HTTP_CODE.METHOD_NOT_ALLOWED);

    return response.send(todo);
  } catch (error: any) {
    logger.error(error);
    return response.sendStatus(HTTP_CODE.BAD_REQUEST);
  }
};

export const deleteUserTodoHandler = async (
  request: Request<{}, {}, DeleteTodoRequestInput['body']>,
  response: Response,
) => {
  try {
    const todo = await deleteTodo(request.body.todoId);

    if (!todo) return response.sendStatus(HTTP_CODE.METHOD_NOT_ALLOWED);

    return response.send(todo);
  } catch (error: any) {
    logger.error(error);
    return response.status(HTTP_CODE.BAD_REQUEST).send(error.message);
  }
};
