import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../hotel.service';
import { Hospede } from '../models/person/hospede';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.sass']
})
export class NewPersonComponent implements OnInit {

  hospede: Hospede = new Hospede();

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
  }

  saveGuest() {
    this.hotelService.createGuest(this.hospede).subscribe(data => {
      console.log(data);

      window.location.reload()
    }, error => console.log(error))
  }

  onSubmit() {
    this.saveGuest();
  }

}
