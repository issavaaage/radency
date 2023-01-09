import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NotesState } from './shared/state/notes.state';
import { Observable, of, Subject } from 'rxjs';
import { INote } from './shared/interfaces/note.interface';
import { NotesService } from './shared/services/notes.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NotesCreateModalComponent } from './shared/components/notes-create-modal/notes-create-modal.component';
import {
  NotesConfirmDeleteModalComponent
} from './shared/components/notes-confirm-delete-modal/notes-confirm-delete-modal.component';
import { IOnDoneNoteEvent } from './shared/interfaces/on-done-note-event.interface';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html'
})
export class NotesComponent implements OnInit, OnDestroy {

  @Select(NotesState.getNotes) notes$: Observable<Array<INote>>;
  notes: Array<INote>;
  destroy$ = new Subject();
  constructor(private store$: Store,
              private notesService: NotesService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.init();
  }
  private init() {
    this.notes$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res => this.notes = res);
    this.notesService.getAllNotes()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  onAddNote() {
    this.dialog.open(NotesCreateModalComponent, {
      data: {
        editMode: false
      }
    }).afterClosed()
      .pipe(
        switchMap(res => {
          if (!res) {
            return of(null);
          }
          return this.notesService.createNote({...res, done: false});
        }),
        switchMap(res => {
          if (!res) {
            return of(null);
          }
          return this.notesService.getAllNotes();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  onEditNote(note: INote) {
    this.dialog.open(NotesCreateModalComponent, {
      data: {
        editMode: true,
        note
      }
    }).afterClosed()
      .pipe(
        switchMap(res => {
          if (!res) {
            return of(null);
          }
          return this.notesService.updateNote({...note, ...res});
        }),
        switchMap(res => {
          if (!res) {
            return of(null);
          }
          return this.notesService.getAllNotes();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  onDoneNote(noteEvent: IOnDoneNoteEvent) {
    this.notesService.updateNote({...noteEvent.note, done: noteEvent.isDone})
      .pipe(
        switchMap(res => {
          if (!res) {
            return of(null);
          }
          return this.notesService.getAllNotes();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  onDeleteNote(id: number) {
    this.dialog.open(NotesConfirmDeleteModalComponent).afterClosed()
      .pipe(
        switchMap(res => {
          if (!res) {
            return of(null);
          }
          return this.notesService.deleteNote(id);
        }),
        switchMap(res => {
          if (!res) {
            return of(null);
          }
          return this.notesService.getAllNotes();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }
}
