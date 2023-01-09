import { INote } from './note.interface';

export interface IOnDoneNoteEvent {
  note: INote;
  isDone: boolean;
}
