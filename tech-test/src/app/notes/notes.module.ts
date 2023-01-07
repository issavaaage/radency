import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { HttpClientModule } from '@angular/common/http';
import { NotesService } from './shared/services/notes.service';


@NgModule({
  declarations: [
    NotesComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    HttpClientModule
  ],
  providers: [
    NotesService
  ]
})
export class NotesModule { }
