import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Checkin } from '../models/checkin/checkin';
import { Hospede } from '../models/person/hospede';

@Component({
  selector: 'app-list-hotel-guests',
  templateUrl: './list-hotel-guests.component.html',
  styleUrls: ['./list-hotel-guests.component.sass']
})
export class ListHotelGuestsComponent implements OnInit {

  hospede: Hospede[];
  checkIn: Checkin[];
  
  dataList: Array<{ name: string, document: string, value: number }> = [];

  weekDayValue: number = 120;
  weekendDayValue: number = 150;

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    this.getCheckin();
  }

  private getCheckin() {
    this.hotelService.getCheckinList().subscribe(data => {
      this.checkIn = data;
      console.log(data)

      for (var i = 0; i < data.length; i++) {

        // Calcular valor

        const milisecondsDateIn = new Date(data[i].dataEntrada).getMilliseconds()
        const milisecondsDateOut = new Date(data[i].dataSaida).getMilliseconds()

        console.log("Mili in " + milisecondsDateIn)
        console.log("Mili out " + milisecondsDateOut)

        const milisecondsOneDay = 1000 * 60 * 60 * 24;

        var days = (milisecondsDateIn - milisecondsDateOut) / milisecondsOneDay

        console.log("Dias " + days)
      }

      // Preencher tabela 

      for (var i = 0; i < data.length; i++) {
        this.dataList.push({name: data[i].hospede.nome, document: data[i].hospede.documento, value: 0})
      }
    })
  }

}
