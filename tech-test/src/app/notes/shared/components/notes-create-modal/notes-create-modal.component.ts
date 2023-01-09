import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INote } from '../../interfaces/note.interface';

@Component({
  selector: 'app-notes-create-modal',
  templateUrl: './notes-create-modal.component.html'
})
export class NotesCreateModalComponent {

  form = new FormGroup({
    label: new FormControl(this.data?.note?.label ?? null, [Validators.required]),
    description: new FormControl(this.data?.note?.description ?? null, [Validators.required]),
    category: new FormControl(this.data?.note?.category ?? null, [Validators.required])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: {editMode: boolean, note?: INote}) { }
}
