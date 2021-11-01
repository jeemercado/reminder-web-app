import { omit } from 'lodash';
import { getRepository } from 'typeorm';
import { Note } from '../entity/note.entity';
import { User } from '../entity/user.entity';

export const createNote = async (user: User, data?: string) => {
  const noteRepository = getRepository(Note);
  const note = new Note();
  note.user = user;
  note.data = data || '';

  try {
    await noteRepository.save(note);
    return omit(note, 'user');
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getNotesByUserId = async (userId: number) => {
  const noteRepository = getRepository(Note);
  const notes = await noteRepository
    .createQueryBuilder('note')
    .where('note.userId = :userId', { userId })
    .getMany();
  return notes;
};

export const updateNote = async (noteId: number, data?: string) => {
  const noteRepository = getRepository(Note);
  const note = await noteRepository.findOne(noteId);

  if (!note) return false;

  try {
    note.data = data;
    await noteRepository.save(note);
    return note;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteNote = async (noteId: number) => {
  const noteRepository = getRepository(Note);
  const note = await noteRepository.findOne(noteId);

  if (!note) return false;

  try {
    await noteRepository.softDelete(noteId);
    return note;
  } catch (error: any) {
    throw new Error(error);
  }
};
