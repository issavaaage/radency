import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesCreateModalComponent } from './notes-create-modal.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { INote } from '../../interfaces/note.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('NotesModalComponent', () => {
  let component: NotesCreateModalComponent;
  let fixture: ComponentFixture<NotesCreateModalComponent>;
  const mockedNote: INote = {
    id: 1,
    label: 'Test note',
    description: 'test description',
    category: 'test category',
    done: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesCreateModalComponent ],
      imports: [ReactiveFormsModule, MatDialogModule],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {editMode: true, note: mockedNote}},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('edit button should be disabled if form invalid', () => {
    component.form.get('label').patchValue(null);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('#action-button')).nativeNode;
    expect(button.disabled).toBeTrue();
  });
});
