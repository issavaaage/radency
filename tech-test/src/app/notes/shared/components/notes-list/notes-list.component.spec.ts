import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NotesListComponent } from './notes-list.component';
import { INote } from '../../interfaces/note.interface';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

describe('NotesListComponent', () => {
  let component: NotesListComponent;
  let fixture: ComponentFixture<NotesListComponent>;

  const mockedNotes: Array<INote> = [
    {
      id: 1,
      label: 'Test',
      description: 'test description',
      category: 'test category',
      done: false
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesListComponent ],
      imports: [ReactiveFormsModule, MatCheckboxModule, MatIconModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesListComponent);
    component = fixture.componentInstance;
    component.notes = mockedNotes;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onDoneNote should emit value of checked note with note data', (done) => {
    const testNote = mockedNotes[0];
    const testDoneState = true;
    component.doneNote.subscribe(res => {
      expect(res.note).toEqual(testNote);
      expect(res.isDone).toEqual(testDoneState);
      done();
    });
    component.onDoneNote({source: {} as MatCheckbox, checked: testDoneState}, testNote);
  });

  it('onDeleteNote should emit id of selected note', (done) => {
    const testNote = mockedNotes[0];
    component.deleteNote.subscribe(res => {
      expect(res).toEqual(testNote.id);
      done();
    });
    component.onDeleteNote(testNote.id);
  });

  it('onAddNote should emit empty', (done) => {
    component.addNote.subscribe(res => {
      expect(res).toBeFalsy();
      done();
    });
    component.onAddNote();
  });

  it('onEditNote should emit selected note', (done) => {
    const testNote = mockedNotes[0];
    component.editNote.subscribe(res => {
      expect(res).toEqual(testNote);
      done();
    });
    component.onEditNote(testNote);
  });

  it('filteredNotes should includes notes filtered by filterByName control value', fakeAsync(() => {
    const filterByNameTestValue = 'f';
    component.filterByName.patchValue(filterByNameTestValue);
    tick(500);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const nonFilteredNotesLength = component.filteredNotes.filter(note => !note.label.includes(filterByNameTestValue)).length;
      expect(nonFilteredNotesLength).toEqual(0);
    });
  }));
});
