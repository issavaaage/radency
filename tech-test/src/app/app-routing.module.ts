import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'notes',
    loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule)
  },
  {
    path: '**',
    redirectTo: 'notes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
