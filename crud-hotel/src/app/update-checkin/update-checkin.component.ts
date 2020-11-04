import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../hotel.service';
import { Checkin } from '../models/checkin/checkin';
import { Hospede } from '../models/person/hospede';

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

  constructor(private hotelService: HotelService, private router: Router) { }

  ngOnInit(): void {
  
  }

  updateCheckin(id: number, checkin: Checkin) {

    this.hotelService.updateCheckin(id, checkin).subscribe(data => {

      console.log(data)

      this.router.navigate([''])
      
    }, error => console.log(error))
  }

  getCheckinById(guest: Hospede) {
    this.hotelService.getCheckinList().subscribe(allCheckin => {

      for (var i = 0; i < allCheckin.length; i++) {
        if (allCheckin[i].hospede.documento == guest.documento) {

          this.checkin.id = allCheckin[i].id
          this.checkin.hospede = guest
          this.checkin.dataEntrada = this.dateIn
          this.checkin.dataSaida = this.dateOut

          this.updateCheckin(allCheckin[i].id, this.checkin);
 
        }
      }
    })
  }

  getGuestById(dataGuest: string) {
  
    this.hotelService.getGuestsList().subscribe(allGuests => {

      for (var i = 0; i < allGuests.length; i++) {
        this.hotelService.getGuestById(allGuests[i].id).subscribe(guest => {

          if (guest.documento == dataGuest || guest.nome == dataGuest || guest.telefone == dataGuest) {
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
      alert("O campo Documento é obrigatório")
      return;
    }
    
  }
}