import { of } from 'rxjs';

export class NotesServiceMock {
  getAllNotes() {
    return of();
  }
}
