import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewGuestComponent } from './new-guest/new-guest.component';
import { UpdateCheckinComponent } from './update-checkin/update-checkin.component';
import { UpdateGuestComponent } from './update-guest/update-guest.component';

const routes: Routes = [
  { path: 'guest', component: NewGuestComponent},
  { path: 'update-guest', component: UpdateGuestComponent},
  { path: 'update-checkin', component: UpdateCheckinComponent},
  { path: 'login', component: LoginComponent},
  { path: '', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
