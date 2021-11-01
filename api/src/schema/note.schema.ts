import { number, object, string, TypeOf } from 'zod';

export const createNoteSchema = object({
  body: object({
    userId: number({
      required_error: 'User Id is required',
    }),
    data: string().optional(),
  }),
});

export const getNotesSchema = object({
  body: object({
    userId: number({
      required_error: 'User ID is required',
    }),
  }),
});

export const updateNoteSchema = object({
  body: object({
    userId: number({
      required_error: 'User ID is required',
    }),
    noteId: number({
      required_error: 'Note ID is required',
    }),
    data: string().optional(),
  }),
});

export const deleteNoteSchema = object({
  body: object({
    userId: number({
      required_error: 'User ID is required',
    }),
    noteId: number({
      required_error: 'Note ID is required',
    }),
  }),
});

export type CreateNoteRequestInput = TypeOf<typeof createNoteSchema>;
export type GetNotesRequestInput = TypeOf<typeof getNotesSchema>;
export type UpdateNoteRequestInput = TypeOf<typeof updateNoteSchema>;
export type DeleteNoteRequestInput = TypeOf<typeof deleteNoteSchema>;
