import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Checkin } from './models/checkin/checkin';
import { Guest } from './models/guest/guest';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private baseUrl = "http://localhost:8080/api/v1/";

  constructor(private httpClient: HttpClient) { }

  getCheckinList(): Observable<Checkin[]> {
    return this.httpClient.get<Checkin[]>(this.baseUrl + "checkin");
  }

  getGuestsList(): Observable<Guest[]> {
    return this.httpClient.get<Guest[]>(this.baseUrl + "guests");
  }

  getGuestById(id: number): Observable<Guest> {
    return this.httpClient.get<Guest>(this.baseUrl + "guests/" + id)
  }

  getCheckinById(id: number): Observable<Checkin> {
    return this.httpClient.get<Checkin>(this.baseUrl + "checkin/" + id)
  }

  createCheckin(checkin: Checkin): Observable<Checkin> {
    return this.httpClient.post<Checkin>(this.baseUrl + "checkin/post", checkin);
  }

  createGuest(guest: Guest): Observable<Guest> {
    return this.httpClient.post<Guest>(this.baseUrl + "guest", guest);
  }

  updateGuest(id: number, guest: Guest): Observable<Guest> {
    return this.httpClient.put<Guest>(this.baseUrl + "guest/" + id, guest);
  }

  updateCheckin(id: number, checkin: Checkin): Observable<Checkin> {
    return this.httpClient.put<Checkin>(this.baseUrl + "checkin/" + id, checkin);
  }

  deleteCheckin(id: number) {
    return this.httpClient.delete(this.baseUrl + "delete/checkin/" + id)
  }

  deleteGuest(id: number) {
    return this.httpClient.delete(this.baseUrl + "delete/guest/" + id)
  }

}
