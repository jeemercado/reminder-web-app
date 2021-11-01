import { Request, Response } from 'express';
import { User } from '../entity/user.entity';
import {
  CreateNoteRequestInput,
  DeleteNoteRequestInput,
  GetNotesRequestInput,
  UpdateNoteRequestInput,
} from '../schema/note.schema';
import { createNote, deleteNote, getNotesByUserId, updateNote } from '../service/note.service';
import { getUserById } from '../service/user.service';
import { HTTP_CODE } from '../utils/http-codes';
import logger from '../utils/logger';

export const createUserNoteHandler = async (
  request: Request<{}, {}, CreateNoteRequestInput['body']>,
  response: Response,
) => {
  const authenticatedUser: User = response.locals.user;
  const user = await getUserById(authenticatedUser.id);

  if (!user) {
    return response.status(HTTP_CODE.BAD_REQUEST).send('User not found.');
  }

  try {
    const note = await createNote(user, request.body.data);
    return response.send(note);
  } catch (error: any) {
    logger.error(error);
    return response.sendStatus(HTTP_CODE.BAD_REQUEST);
  }
};

export const getUserNotesHandler = async (
  request: Request<{}, {}, GetNotesRequestInput['body']>,
  response: Response,
) => {
  const authenticatedUser: User = response.locals.user;
  const userNotes = await getNotesByUserId(authenticatedUser.id);
  return response.send(userNotes);
};

export const updateUserNoteHandler = async (
  request: Request<{}, {}, UpdateNoteRequestInput['body']>,
  response: Response,
) => {
  try {
    const note = await updateNote(request.body.noteId, request.body.data);

    if (!note) return response.sendStatus(HTTP_CODE.METHOD_NOT_ALLOWED);

    return response.send(note);
  } catch (error: any) {
    logger.error(error);
    return response.sendStatus(HTTP_CODE.BAD_REQUEST);
  }
};

export const deleteUserNoteHandler = async (
  request: Request<{}, {}, DeleteNoteRequestInput['body']>,
  response: Response,
) => {
  try {
    const note = await deleteNote(request.body.noteId);

    if (!note) return response.sendStatus(HTTP_CODE.METHOD_NOT_ALLOWED);

    return response.send(note);
  } catch (error: any) {
    logger.error(error);
    return response.status(HTTP_CODE.BAD_REQUEST).send(error.message);
  }
};
