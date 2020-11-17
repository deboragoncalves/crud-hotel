import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../hotel.service';
import { Guest } from '../models/guest/guest';

@Component({
  selector: 'app-new-guest',
  templateUrl: './new-guest.component.html',
  styleUrls: ['./new-guest.component.sass']
})

export class NewGuestComponent implements OnInit {

  guest: Guest = new Guest();

  id: number;
  name: string;
  document: string;
  phone: string;

  constructor(private hotelService: HotelService, private router: Router) { }

  ngOnInit(): void {
  }

  createGuest(name: string, document: string, phone: string) {

    // Novo objeto

    this.guest.name = name;
    this.guest.document = document;
    this.guest.phone = phone;

    this.hotelService.createGuest(this.guest).subscribe(guest => {

      console.log(guest)

      // Home

      this.router.navigate(['']);

    }, error => console.log(error))

  }

  onSubmit() {

    // Validação

    if (this.name != "" || this.name != undefined) {

      if (this.document != "" || this.document != undefined) {

        if (this.phone != "" || this.phone != undefined) {

          this.createGuest(this.name, this.document, this.phone);

        } else {
  
          alert("O campo Telefone é obrigatório.")
          return;
  
        }

      } else {

        alert("O campo Documento é obrigatório.")
        return;

      }

    } else {

      alert("O campo Nome é obrigatório.")
      return;

    }

  }

}
