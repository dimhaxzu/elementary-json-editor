import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataInputComponent } from './data-input/data-input.component';
import { DataOutputComponent } from './data-output/data-output.component';
import { DataEditorComponent } from './data-editor/data-editor.component';

const routes: Routes = [
  { path: '', component: DataInputComponent },
  { path: 'result', component: DataOutputComponent },
  { path: 'editor', component: DataEditorComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
