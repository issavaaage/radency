import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { INote } from '../../interfaces/note.interface';
import { Subject } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { IOnDoneNoteEvent } from '../../interfaces/on-done-note-event.interface';
import { FormControl } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() notes: Array<INote>;
  @Output() addNote = new EventEmitter();
  @Output() editNote = new EventEmitter<INote>();
  @Output() deleteNote = new EventEmitter<number>();
  @Output() doneNote = new EventEmitter<IOnDoneNoteEvent>();
  filteredNotes: Array<INote>;
  filterByName = new FormControl();
  destroy$ = new Subject();
  ngOnInit() {
    this.subscribeToFilterByNameChange();
  }
  ngOnChanges() {
    this.filterByName.patchValue(null);
  }
  private subscribeToFilterByNameChange() {
    this.filterByName.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.filteredNotes = res ? this.notes.filter(note => note.label.includes(res)) : this.notes;
      });
    this.filterByName.patchValue(null);
  }
  onEditNote(note: INote) {
    this.editNote.emit(note);
  }
  onAddNote() {
    this.addNote.emit();
  }
  onDeleteNote(id: number) {
    this.deleteNote.emit(id);
  }
  onDoneNote(event: MatCheckboxChange, note: INote) {
    this.doneNote.emit({note, isDone: event.checked});
  }
  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }
}
