import { boolean, number, object, string, TypeOf } from 'zod';

export const createTodoSchema = object({
  body: object({
    userId: number({
      required_error: 'User Id is required',
    }),
    data: string().optional(),
  }),
});

export const getTodosSchema = object({
  body: object({
    userId: number({
      required_error: 'User ID is required',
    }),
  }),
});

export const updateTodoSchema = object({
  body: object({
    userId: number({
      required_error: 'User ID is required',
    }),
    todoId: number({
      required_error: 'Todo ID is required',
    }),
    data: string().optional(),
  }),
});

export const checkUncheckTodoSchema = object({
  body: object({
    userId: number({
      required_error: 'User ID is required',
    }),
    todoId: number({
      required_error: 'Todo ID is required',
    }),
    isFinished: boolean({
      required_error: 'isFinished is required',
    }),
  }),
});

export const deleteTodoSchema = object({
  body: object({
    userId: number({
      required_error: 'User ID is required',
    }),
    todoId: number({
      required_error: 'Todo ID is required',
    }),
  }),
});

export type CreateTodoRequestInput = TypeOf<typeof createTodoSchema>;
export type GetTodosRequestInput = TypeOf<typeof getTodosSchema>;
export type CheckUncheckRequestInput = TypeOf<typeof checkUncheckTodoSchema>;
export type UpdateTodoRequestInput = TypeOf<typeof updateTodoSchema>;
export type DeleteTodoRequestInput = TypeOf<typeof deleteTodoSchema>;
