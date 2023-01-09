import { INote } from '../interfaces/note.interface';

export class UpdateNotes {
  static readonly type = '[NOTES] Update';
  constructor(public payload: Array<INote>) {
  }
}
