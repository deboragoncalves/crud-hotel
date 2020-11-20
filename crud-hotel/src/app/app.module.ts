import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListHotelGuestsComponent } from './list-hotel-guests/list-hotel-guests.component';
import { NewCheckinComponent } from './new-checkin/new-checkin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateCheckinComponent } from './update-checkin/update-checkin.component';
import { HomeComponent } from './home/home.component';
import { UpdateGuestComponent } from './update-guest/update-guest.component';
import { NewGuestComponent } from './new-guest/new-guest.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    ListHotelGuestsComponent,
    NewCheckinComponent,
    UpdateCheckinComponent,
    HomeComponent,
    UpdateGuestComponent,
    NewGuestComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
