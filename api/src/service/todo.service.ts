import dayjs from 'dayjs';
import { omit } from 'lodash';
import { getRepository } from 'typeorm';
import { Todo } from '../entity/todo.entity';
import { User } from '../entity/user.entity';

export const createTodo = async (user: User, data?: string) => {
  const todoRepository = getRepository(Todo);
  const todo = new Todo();
  todo.user = user;
  todo.data = data || '';
  todo.finishedAt = null;

  try {
    await todoRepository.save(todo);
    return omit(todo, 'user');
  } catch (error: any) {
    throw new Error(error);
  }
};

export const checkUncheckTodo = async (todoId: number, checked: boolean) => {
  const todoRepository = getRepository(Todo);
  const todo = await todoRepository.findOne(todoId);

  if (!todo) return false;

  try {
    if (checked) {
      todo.finishedAt = dayjs().toDate();
    } else {
      todo.finishedAt = null;
    }
    await todoRepository.save(todo);
    return todo;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getTodosByUserId = async (userId: number) => {
  const todoRepository = getRepository(Todo);
  const todos = await todoRepository
    .createQueryBuilder('todo')
    .where('todo.userId = :userId', { userId })
    .getMany();
  return todos;
};

export const updateTodo = async (todoId: number, data?: string) => {
  const todoRepository = getRepository(Todo);
  const todo = await todoRepository.findOne(todoId);

  if (!todo) return false;

  try {
    todo.data = data;
    await todoRepository.save(todo);
    return todo;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteTodo = async (todoId: number) => {
  const todoRepository = getRepository(Todo);
  const todo = await todoRepository.findOne(todoId);

  if (!todo) return false;

  try {
    await todoRepository.softDelete(todoId);
    return todo;
  } catch (error: any) {
    throw new Error(error);
  }
};
