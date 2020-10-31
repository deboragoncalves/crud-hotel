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

  getGuestByDocument(document: String): Observable<Hospede> {
    return this.httpClient.get<Hospede>(this.baseUrl + "hospedes/" + document)
  }

  createCheckin(checkin: Checkin): Observable<Checkin> {
    return this.httpClient.post<Checkin>(this.baseUrl + "createCheckin", checkin);
  }

  createGuest(guest: Hospede): Observable<Hospede> {
    return this.httpClient.post<Hospede>(this.baseUrl + "guests", guest);
  }
}
