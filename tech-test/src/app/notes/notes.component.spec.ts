import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';
import { NgxsModule } from '@ngxs/store';
import { NotesService } from './shared/services/notes.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NotesServiceMock } from '../../../mocks/notes.service.mock';
import { NotesListComponentMock } from '../../../mocks/notes-list.component.mock';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesComponent, NotesListComponentMock ],
      imports: [ NgxsModule.forRoot(), MatDialogModule ],
      providers: [
        {provide: NotesService, useClass: NotesServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
