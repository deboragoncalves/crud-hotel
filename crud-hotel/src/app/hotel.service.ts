import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Checkin } from './models/checkin/checkin';
import { Hospede } from './models/person/hospede';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private baseUrl = "http://localhost:8080/api/v1/";

  constructor(private httpClient: HttpClient) { }

  getCheckinList(): Observable<Checkin[]> {
    return this.httpClient.get<Checkin[]>(this.baseUrl + "checkin");
  }

  getGuestsList(): Observable<Hospede[]> {
    return this.httpClient.get<Hospede[]>(this.baseUrl + "hospedes");
  }

  createCheckin(checkin: Checkin): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "createCheckin", checkin);
  }

  createGuest(guest: Hospede): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "createGuest", guest);
  }
}
