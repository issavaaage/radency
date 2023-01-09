import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { INote } from '../interfaces/note.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { UpdateNotes } from '../actions/notes.actions';

@Injectable()
export class NotesService {

  api = environment.apiUrl + '/tasks';
  constructor(private http: HttpClient,
              private store$: Store) {}

  getAllNotes(): Observable<Array<INote>> {
    return this.http.get<Array<INote>>(`${this.api}`)
      .pipe(
        tap(res => this.store$.dispatch(new UpdateNotes(res)))
      );
  }
  getNote(id: number): Observable<INote> {
    return this.http.get<INote>(`${this.api}/${id}`);
  }
  createNote(note: INote): Observable<INote> {
    return this.http.post<INote>(`${this.api}`, note);
  }
  updateNote(updatedNote: INote): Observable<INote> {
    return this.http.patch<INote>(`${this.api}/${updatedNote.id}`, updatedNote);
  }
  deleteNote(id: number): Observable<HttpResponse<unknown>> {
    return this.http.delete(`${this.api}/${id}`, {observe: 'response'});
  }
}
