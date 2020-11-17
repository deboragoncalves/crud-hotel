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

  createCheckin(checkin: Checkin) {

    this.hotelService.createCheckin(checkin).subscribe(data => {

      console.log(data)

      window.location.reload()
      
    }, error => console.log(error))
  }

  getGuestById(dataGuest: string) {
  
    this.hotelService.getGuestsList().subscribe(allGuests => {

      for (var i = 0; i < allGuests.length; i++) {

        // Pegar hospede pelo id

        this.hotelService.getGuestById(allGuests[i].id).subscribe(guest => {

          // Se um dos dados do hospede encontrado é o mesmo do indicado no input pelo usuário, criar novo objeto e fazer o post

          if (guest.document == dataGuest || guest.name == dataGuest || guest.phone == dataGuest) {

            // Novo objeto 

            this.checkin.plusCar = this.plusCar
            this.checkin.dateIn = this.dateIn
            this.checkin.dateOut = this.dateOut
            this.checkin.guest = guest

            this.createCheckin(this.checkin)

          } else {

            alert("Este hóspede não está incluído no sistema. Faça o cadastro do mesmo e, depois, o checkin.");
            return; 

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
