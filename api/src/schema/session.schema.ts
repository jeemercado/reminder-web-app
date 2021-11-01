import { object, string, TypeOf } from 'zod';

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

export const logoutUserSessionSchema = object({
  body: object({
    sessionId: string({
      required_error: 'Session ID is required',
    }),
  }),
});

export type CreateSessionRequestInput = TypeOf<typeof createSessionSchema>;
export type LogoutUserSessionRequestInput = TypeOf<typeof logoutUserSessionSchema>;
