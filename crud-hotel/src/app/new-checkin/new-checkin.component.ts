import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { HotelService } from '../hotel.service';
import { Checkin } from '../models/checkin/checkin';

@Component({
  selector: 'app-new-checkin',
  templateUrl: './new-checkin.component.html',
  styleUrls: ['./new-checkin.component.sass']
})
export class NewCheckinComponent implements OnInit {

  checkin: Checkin = new Checkin();

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
  }

  saveCheckin() {
    this.hotelService.createCheckin(this.checkin).subscribe(data => {
      console.log(data)

      window.location.reload()
    }, error => console.log(error)
  )}

  onSubmit() {
    // this.saveCheckin();
  }
}
