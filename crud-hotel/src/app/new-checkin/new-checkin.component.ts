import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Checkin } from '../models/checkin/checkin';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private hotelService: HotelService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  createCheckin(checkin: Checkin) {

    this.hotelService.createCheckin(checkin).subscribe(data => {

      console.log(data)

      window.location.reload()
      
    }, error => console.log(error))
  }

  getGuestById(dataGuest: string, dateIn: string) {
  
    this.hotelService.getGuestsList().subscribe(allGuests => {

      for (var i = 0; i < allGuests.length; i++) {

        // Pegar hospede pelo id

        this.hotelService.getGuestById(allGuests[i].id).subscribe(guest => {

          // Se um dos dados do hospede encontrado é o mesmo do indicado no input pelo usuário, criar novo objeto e fazer o post

          if (guest.document == dataGuest || guest.name == dataGuest || guest.phone == dataGuest) {

            // Novo objeto 

            this.checkin.plusCar = this.plusCar
            this.checkin.dateIn = dateIn
            this.checkin.dateOut = this.dateOut
            this.checkin.guest = guest

            this.createCheckin(this.checkin)

            return;

          } 

        }, error => console.log(error))
      }

    }, error => console.log(error))
  }

  validateData() {

    if (this.dataGuest != undefined && this.dataGuest != "") {

      if (this.dateIn != undefined && this.dateIn != "") {

        if (this.dateOut == undefined || this.dateOut == "") {

          // Data de saida vazia
          
          // TODO: Data de entrada - formato ISO String: yyyy-mm-ddThh:mm:ss

          this.getGuestById(this.dataGuest, this.dateIn)

        } else {

          var dateOut = new Date(this.dateOut)
          var dateIn = new Date(this.dateIn)

          // Data de saida maior/menor que entrada 

          if (dateOut.getDate() > dateIn.getDate()) {

            this.getGuestById(this.dataGuest, this.dateIn)

          } else if ((dateOut.getDate() == dateIn.getDate()) && (dateOut.getHours() > dateIn.getHours())) {

            this.getGuestById(this.dataGuest, this.dateIn)

          } else if ((dateOut.getDate() == dateIn.getDate()) && (dateOut.getHours() < dateIn.getHours())) {

            this.toastr.warning("A hora de saída deve ser maior que a hora de entrada")
            return;
            
          } else if (dateOut.getDate() < dateIn.getDate()) {

            this.toastr.warning("A data de saída deve ser maior que a data de entrada")
            return;

          }

        }

      } else {

        this.toastr.warning("O campo Data/hora de Entrada é obrigatório")
        return;

      }

    } else {

      this.toastr.warning("O campo Hóspede é obrigatório")
      return;
      
    }
    
  }

  onSubmit() {

    // Definir default - adicional veiculo

    if (this.plusCar == undefined) {

      this.plusCar = false
    }

    this.validateData();
    
  }
}
