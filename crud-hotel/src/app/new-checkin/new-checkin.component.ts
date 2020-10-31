import { isNull } from '@angular/compiler/src/output/output_ast';
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

  documento: any;
  dataSaida: any;
  dataEntrada: any;
  adicionalVeiculo: boolean;

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
  }

  saveCheckin() {
    this.hotelService.createCheckin(this.checkin).subscribe(data => {
      console.log(data)

      window.location.reload()
    }, error => console.log(error)
  )}

  getGuestByDocument() {
    this.hotelService.getGuestByDocument(this.documento.text.toString()).subscribe(data => {
      console.log(data)

      // this.saveCheckin();

    }, error => console.log(error))
  }

  onSubmit() {

    if (this.adicionalVeiculo == undefined) {
      this.adicionalVeiculo = false
    }

    if ((this.documento != undefined && this.documento != "")) {
      if ((this.dataEntrada != undefined && this.dataEntrada != "")) {
        if ((this.dataSaida != undefined && this.dataSaida != "")) {
          // this.getGuestByDocument();

          console.log(this.documento)
          console.log(this.dataEntrada)
          console.log(this.dataSaida)
          console.log(this.adicionalVeiculo)
        } else {
          alert("O campo Data de Saida é obrigatório")
          return;
        }
      } else {
        alert("O campo Data de Entrada é obrigatório")
        return;
      }
    } else {
      alert("O campo Documento é obrigatório")
      return;
    }
    
  }
}
