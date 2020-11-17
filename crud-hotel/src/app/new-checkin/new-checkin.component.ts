import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Checkin } from '../models/checkin/checkin';

@Component({
  selector: 'app-new-checkin',
  templateUrl: './new-checkin.component.html',
  styleUrls: ['./new-checkin.component.sass']
})

export class NewCheckinComponent implements OnInit {

  checkin: Checkin = new Checkin();

  id: number;
  dataGuest: string;
  dateIn: string;
  dateOut: string;
  plusCar: boolean;

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
  }

  saveCheckin(checkin: Checkin) {

    this.hotelService.createCheckin(checkin).subscribe(data => {

      console.log(data)

      window.location.reload()
      
    }, error => console.log(error))
  }

  getGuestById(dataGuest: string) {
  
    this.hotelService.getGuestsList().subscribe(allGuests => {

      for (var i = 0; i < allGuests.length; i++) {

        this.hotelService.getGuestById(allGuests[i].id).subscribe(guest => {

          if (guest.document == dataGuest || guest.name == dataGuest || guest.phone == dataGuest) {

            this.checkin.plusCar = this.plusCar
            this.checkin.dateIn = this.dateIn
            this.checkin.dateOut = this.dateOut
            this.checkin.guest = guest

            this.saveCheckin(this.checkin)

          }

        }, error => console.log(error))
      }
  
    }, error => console.log(error))
  }

  onSubmit() {

    if (this.plusCar == undefined) {

      this.plusCar = false
    }

    if ((this.dataGuest != undefined && this.dataGuest != "")) {

      this.getGuestById(this.dataGuest)

    } else {

      alert("O campo Documento é obrigatório")
      return;
      
    }
    
  }
}
