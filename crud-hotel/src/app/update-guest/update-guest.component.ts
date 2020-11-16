import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../hotel.service';
import { Hospede } from '../models/person/hospede';

@Component({
  selector: 'app-update-guest',
  templateUrl: './update-guest.component.html',
  styleUrls: ['./update-guest.component.sass']
})
export class UpdateGuestComponent implements OnInit {

  hospede: Hospede = new Hospede();

  guestName: string;
  guestDocument: string;
  guestPhone: string;

  constructor(private hotelService: HotelService, private router: Router) { }

  ngOnInit(): void {
  }

  updateGuest(id: number, guest: Hospede) {

    this.hotelService.updateGuest(id, guest).subscribe(data => {

      console.log(data)

      // Home

      this.router.navigate([''])

    }, error => console.log(error))
  }

  getNewGuest(guestName: string, guestDocument: string, guestPhone: string) {

    // Listar hospedes

    this.hotelService.getGuestsList().subscribe(guestsList => {

      // Objeto com novos dados

      this.hospede.nome = guestName
      this.hospede.documento = guestDocument
      this.hospede.telefone = guestPhone

      for (var i = 0; i < guestsList.length; i++) {

        // Verificar se algum dado do hóspede (nome, documento ou telefone) é igual a um dos hóspedes que existentes na lista

        if (guestsList[i].nome == this.hospede.nome || guestsList[i].documento == this.hospede.documento || guestsList[i].telefone == this.hospede.telefone) {

          // Atualizar hospede, passando id e Objeto

          this.hospede.id = guestsList[i].id

          this.updateGuest(this.hospede.id, this.hospede);

        }

      }

    }, error => console.log(error))
  }

  onSubmit() {

    // Validação

    if ((this.guestName != undefined && this.guestName != "")) {

      if ((this.guestDocument != undefined && this.guestDocument != "")) {

        if ((this.guestPhone != undefined && this.guestPhone != "")) {

          this.getNewGuest(this.guestName, this.guestDocument, this.guestPhone);

        } else {

          alert("O campo Telefone é obrigatório")
          return;

        }
  
      } else {

        alert("O campo Documento é obrigatório")
        return;

      }

    } else {

      alert("O campo Nome é obrigatório")
      return;
      
    }
  }

}
