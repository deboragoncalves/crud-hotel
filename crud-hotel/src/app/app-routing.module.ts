import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListHotelGuestsComponent } from './list-hotel-guests/list-hotel-guests.component';
import { NewCheckinComponent } from './new-checkin/new-checkin.component';
import { NewPersonComponent } from './new-person/new-person.component';
import { UpdateCheckinComponent } from './update-checkin/update-checkin.component';

const routes: Routes = [
  { path: 'person', component: NewPersonComponent},
  { path: 'update-checkin', component: UpdateCheckinComponent},
  { path: 'main', component: ListHotelGuestsComponent, outlet: 'main-view', pathMatch: 'full' },
  { path: 'main', component: NewCheckinComponent, outlet: 'main-view', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
