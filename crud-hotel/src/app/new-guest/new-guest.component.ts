import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../hotel.service';
import { Guest } from '../models/guest/guest';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-guest',
  templateUrl: './new-guest.component.html',
  styleUrls: ['./new-guest.component.sass']
})

export class NewGuestComponent implements OnInit {

  documentInput = new FormControl('');
  phoneInput = new FormControl('');

  guest: Guest = new Guest();

  id: number;
  name: string;
  guestDocument: string;
  guestPhone: string;

  constructor(private hotelService: HotelService, private router: Router, private toastr: ToastrService) { }

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
  
  validateData() {

    
    if (this.name != "" && this.name != undefined) {

      if (this.documentInput.valid) {

        if (this.phoneInput.valid) {

          this.createGuest(this.name, this.guestDocument, this.guestPhone);

        } else {
  
          this.toastr.warning("O campo Telefone é obrigatório e deve ter o formato: (00) 00000-0000.")
          return;
  
        }

      } else {

        this.toastr.warning("O campo Documento é obrigatório e deve ter 7 dígitos.")
        return;

      }

    } else {

      this.toastr.warning("O campo Nome é obrigatório.")
      return;

    }
    
  }

  onSubmit() {

    // Validação conforme masks

    this.validateData();

  }

}
