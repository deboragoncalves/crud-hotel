import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Checkin } from '../models/checkin/checkin';
import { Hospede } from '../models/person/hospede';

@Component({
  selector: 'app-new-checkin',
  templateUrl: './new-checkin.component.html',
  styleUrls: ['./new-checkin.component.sass']
})
export class NewCheckinComponent implements OnInit {

  checkin: Checkin = new Checkin();

  checkinId: Array<{ id: number, hospede: Hospede, dataEntrada: string, data: string, plusCar: boolean }> = [];

  documento: string;
  dataSaida: string;
  dataEntrada: string;
  adicionalVeiculo: boolean;

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
  }

  updateCheckin(checkin: Checkin) {
    this.hotelService.getCheckinList().subscribe(data => {
      for (var i = 0; i < data.length; i++) {

       this.hotelService.getCheckinById(data[i].id).subscribe(data => {

         if (data.hospede.nome == checkin.hospede.nome && data.dataSaida != null) {
          this.hotelService.updateCheckin(data.id, checkin).subscribe(data => {    
            console.log(data);
    
            window.location.reload()
            }, error => console.log(error))
          }
      }, error => console.log(error))
      }
    }, error => console.log(error))
  }

  updateCheckinDateOut() {
    
    this.hotelService.updateCheckinDateOut(this.checkin.id, this.checkin).subscribe(data => {
      console.log(data);
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

      this.checkin.hospede = data
      this.checkin.dataEntrada = dataEntrada
      this.checkin.dataSaida = dataSaida
      this.checkin.adicionalVeiculo = adicionalVeiculo

      if (this.checkin.dataSaida == null) {

        // Post

        this.saveCheckin();


      } else if (this.checkin.dataSaida != null && this.checkin.dataEntrada == null) {

        // Path

        this.updateCheckinDateOut();

      } else if (this.checkin.dataSaida != null && this.checkin.dataEntrada != null) {

        // Put

        this.updateCheckin(this.checkin);

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
