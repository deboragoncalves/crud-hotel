import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../hotel.service';
import { Checkin } from '../models/checkin/checkin';
import { Guest } from '../models/guest/guest';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-checkin',
  templateUrl: './update-checkin.component.html',
  styleUrls: ['./update-checkin.component.sass']
})
export class UpdateCheckinComponent implements OnInit {

  checkin: Checkin = new Checkin();

  document: string;

  id: number;
  dataGuest: string;
  dateIn: string;
  dateOut: string;
  plusCar: boolean;

  constructor(private hotelService: HotelService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  
  }

  updateCheckin(id: number, checkin: Checkin) {

    this.hotelService.updateCheckin(id, checkin).subscribe(data => {

      console.log(data)

      this.router.navigate([''])
      
    }, error => console.log(error))
  }

  getCheckinById(guest: Guest) {
    this.hotelService.getCheckinList().subscribe(allCheckin => {

      for (var i = 0; i < allCheckin.length; i++) {
        if (allCheckin[i].guest.document == guest.document) {

          this.checkin.id = allCheckin[i].id
          this.checkin.guest = guest
          this.checkin.dateIn = this.dateIn
          this.checkin.dateOut = this.dateOut

          this.updateCheckin(allCheckin[i].id, this.checkin);
 
        }
      }
    })
  }

  getGuestById(dataGuest: string) {
  
    this.hotelService.getGuestsList().subscribe(allGuests => {

      for (var i = 0; i < allGuests.length; i++) {
        this.hotelService.getGuestById(allGuests[i].id).subscribe(guest => {

          if (guest.document == dataGuest || guest.name == dataGuest || guest.phone == dataGuest) {
            this.getCheckinById(guest);
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

      this.toastr.warning("O campo Hóspede é obrigatório")
      return;

    }
    
  }
}