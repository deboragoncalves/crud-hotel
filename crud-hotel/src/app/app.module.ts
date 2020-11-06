import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListHotelGuestsComponent } from './list-hotel-guests/list-hotel-guests.component';
import { NewCheckinComponent } from './new-checkin/new-checkin.component';
import { NewPersonComponent } from './new-person/new-person.component';
import { FormsModule } from '@angular/forms';
import { UpdateCheckinComponent } from './update-checkin/update-checkin.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ListHotelGuestsComponent,
    NewCheckinComponent,
    NewPersonComponent,
    UpdateCheckinComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
