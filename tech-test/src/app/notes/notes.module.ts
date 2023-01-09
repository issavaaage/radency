import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { HttpClientModule } from '@angular/common/http';
import { NotesService } from './shared/services/notes.service';
import { NgxsModule } from '@ngxs/store';
import { NotesState } from './shared/state/notes.state';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NotesListComponent } from './shared/components/notes-list/notes-list.component';
import { NotesCreateModalComponent } from './shared/components/notes-create-modal/notes-create-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotesConfirmDeleteModalComponent } from './shared/components/notes-confirm-delete-modal/notes-confirm-delete-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    NotesComponent,
    NotesListComponent,
    NotesCreateModalComponent,
    NotesConfirmDeleteModalComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    HttpClientModule,
    NgxsModule.forFeature([NotesState]),
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  providers: [
    NotesService
  ]
})
export class NotesModule { }
