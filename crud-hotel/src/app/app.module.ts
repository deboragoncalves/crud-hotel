import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListHotelGuestsComponent } from './list-hotel-guests/list-hotel-guests.component';
import { NewCheckinComponent } from './new-checkin/new-checkin.component';

@NgModule({
  declarations: [
    AppComponent,
    ListHotelGuestsComponent,
    NewCheckinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
