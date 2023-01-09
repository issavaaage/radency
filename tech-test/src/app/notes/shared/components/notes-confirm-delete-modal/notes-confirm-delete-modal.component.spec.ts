import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesConfirmDeleteModalComponent } from './notes-confirm-delete-modal.component';

describe('NotesConfirmDeleteModalComponent', () => {
  let component: NotesConfirmDeleteModalComponent;
  let fixture: ComponentFixture<NotesConfirmDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesConfirmDeleteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesConfirmDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
