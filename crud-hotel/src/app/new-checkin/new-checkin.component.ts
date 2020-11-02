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

  documento: string;
  dataSaida: string;
  dataEntrada: string;
  adicionalVeiculo: boolean;

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
  }

  updateCheckinDateOut() {
    this.hotelService.updateCheckinDateOut(this.checkin.id, this.checkin).subscribe(data => {
      console.log(data)
    }, error => console.log(error))
  }

  saveCheckin() {
    this.hotelService.createCheckin(this.checkin).subscribe(data => {
      console.log(data)

      window.location.reload()
      
    }, error => console.log(error))
  }

  getGuestByDocument(documento: string, dataEntrada: string, dataSaida: string, adicionalVeiculo: boolean) {
    this.hotelService.getGuestByDocument(documento).subscribe(data => {

      console.log(data)

      this.checkin.hospede = data
      this.checkin.dataEntrada = dataEntrada
      this.checkin.dataSaida = dataSaida
      this.checkin.adicionalVeiculo = adicionalVeiculo

      console.log(this.checkin)

      if (this.checkin.dataSaida == null) {

        // Patch

        // this.updateCheckinDateOut();

      } else {

        // Post

        this.saveCheckin();
      }


    }, error => console.log(error))
  }

  onSubmit() {

    if (this.adicionalVeiculo == undefined) {
      this.adicionalVeiculo = false
    }

    if ((this.documento != undefined && this.documento != "")) {
      this.getGuestByDocument(this.documento, this.dataEntrada, this.dataSaida, this.adicionalVeiculo);
    } else {
      alert("O campo Documento é obrigatório")
      return;
    }
    
  }
}
