import { Component, Input } from '@angular/core';
import { INote } from '../src/app/notes/shared/interfaces/note.interface';

@Component({
  selector: 'app-notes-list',
  template: ''
})
export class NotesListComponentMock {
  @Input() notes: Array<INote>;
}
