import { number, object, string, TypeOf } from 'zod';

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
  }),
});

export const deleteSessionSchema = object({
  body: object({
    userId: number({
      required_error: 'User ID is required',
    }),
    sessionId: number({
      required_error: 'Session ID is required',
    }),
  }),
});

export type CreateSessionRequestInput = TypeOf<typeof createSessionSchema>;
export type DeleteSessionRequestInput = TypeOf<typeof deleteSessionSchema>;
