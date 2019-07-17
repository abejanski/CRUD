import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  { path : 'home', component: HomeComponent},
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'show/:id', component: ShowComponent},
  { path: 'edit/:id', component: EditComponent},
  { path: 'new', component: NewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
