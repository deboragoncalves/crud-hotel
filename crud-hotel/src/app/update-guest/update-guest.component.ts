import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../hotel.service';
import { Guest } from '../models/guest/guest';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-guest',
  templateUrl: './update-guest.component.html',
  styleUrls: ['./update-guest.component.sass']
})
export class UpdateGuestComponent implements OnInit {

  documentInput = new FormControl('');
  phoneInput = new FormControl('');

  guest: Guest = new Guest();

  guestName: string;
  guestDocument: string;
  guestPhone: string;

  constructor(private hotelService: HotelService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  updateGuest(id: number, guest: Guest) {

    this.hotelService.updateGuest(id, guest).subscribe(data => {

      console.log(data)

      // Home

      this.router.navigate([''])

    }, error => console.log(error))
  }

  dataNewGuest(guestName: string, guestDocument: string, guestPhone: string) {

    // Listar hospedes

    this.hotelService.getGuestsList().subscribe(guestsList => {

      // Objeto com novos dados

      this.guest.name = guestName
      this.guest.document = guestDocument
      this.guest.phone = guestPhone

      for (var i = 0; i < guestsList.length; i++) {

        // Verificar se algum dado do hóspede (nome, documento ou telefone) é igual a um dos hóspedes existentes na lista

        if (guestsList[i].name == this.guest.name || guestsList[i].document == this.guest.document || guestsList[i].phone == this.guest.phone) {

          // Atualizar hospede, passando id e Objeto

          this.guest.id = guestsList[i].id

          this.updateGuest(this.guest.id, this.guest);

        }

      }

    }, error => console.log(error))
  }

  validateData() {

    if ((this.guestName != undefined && this.guestName != "")) {

      if (this.documentInput.valid) {

        if (this.phoneInput.valid) {

          this.dataNewGuest(this.guestName, this.guestDocument, this.guestPhone);

        } else {

          this.toastr.warning("O campo Telefone é obrigatório e deve ter o formato: (00) 00000-0000.")
          return;

        }
  
      } else {

        this.toastr.warning("O campo Documento é obrigatório e deve ter 7 dígitos.");
        return;

      }

    } else {

      this.toastr.warning("O campo Nome é obrigatório");
      return;
      
    }

  }

  onSubmit() {

    // Validação conforme masks

    this.validateData();

  }

}
