import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewPersonComponent } from './new-person/new-person.component';
import { UpdateCheckinComponent } from './update-checkin/update-checkin.component';

const routes: Routes = [
  { path: 'person', component: NewPersonComponent},
  { path: 'update-checkin', component: UpdateCheckinComponent},
  { path: '', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
