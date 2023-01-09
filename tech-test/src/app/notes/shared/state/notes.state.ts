import { INote } from '../interfaces/note.interface';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UpdateNotes } from '../actions/notes.actions';

export class NotesStateModel {
  notes: Array<INote>;
}

@State<NotesStateModel>({
  name: 'Notes',
  defaults: {
    notes: []
  }
})

export class NotesState {
  @Selector()
  static getNotes(state: NotesStateModel) {
    return state.notes.reverse();
  }

  @Action(UpdateNotes)
  update({patchState}: StateContext<NotesStateModel>, { payload }: UpdateNotes) {
    patchState({
      notes: payload
    });
  }
}
