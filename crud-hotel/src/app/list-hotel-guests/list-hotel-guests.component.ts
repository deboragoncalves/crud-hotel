import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  dataList: Array<{ name: string, document: string, value: String }> = [];
  filteredDataList: Array<any> = [];

  totalDays: Array<number> = [];
  countDayWeekends: Array<number> = [];

  values: Array<String> = [];

  weekDayValue: number = 120.00;
  weekendDayValue: number = 150.00;

  plusCarweek: number = 15.00;
  plusCarWeekend: number = 20.00;

  constructor(private hotelService: HotelService, private route: Router) { }

  ngOnInit(): void {
    this.getCheckin();
  }

  getCheckin() {
    this.hotelService.getCheckinList().subscribe(data => {
      this.checkIn = data;

      console.log(data)

      this.calcDays(data)

      // Preencher tabela 

      for (var i = 0; i < data.length; i++) {
        this.dataList.push({name: data[i].hospede.nome, document: data[i].hospede.documento, value: this.values[i]})
      }
    }, error => console.log(error))
  }

  calcDays(data: Array<Checkin>) {
    for (var i = 0; i < data.length; i++) {

      // Diferenca de dias

      const dateInMs = new Date(data[i].dataEntrada).getTime()
      const dateOutMs = new Date(data[i].dataSaida).getTime()

      const msOneDay = 1000 * 60 * 60 * 24
      this.totalDays.push(Math.round((dateOutMs - dateInMs)/msOneDay))

      // Final de semana

      var count = 0
      var dayWeek = 0

      var dateInStart = new Date(data[i].dataEntrada);

      dayWeek = dateInStart.getDay()

      if (dayWeek == 0 || dayWeek == 6) {
        count++;
      }

      while (dateInStart < new Date(data[i].dataSaida)) {
        dateInStart.setDate(dateInStart.getDate() + 1)

        dayWeek = dateInStart.getDay()

        if (dayWeek == 0 || dayWeek == 6) {
          count++;
        }

      }

      this.countDayWeekends.push(count)
    } 

    this.calcValues(data);

  }

  calcValues(data: Array<Checkin>) {
    var valueDayWeek = 0.00
    var valueDayWeekend = 0.00
    var valueTotalDays = 0.00

    var valuePlusCarWeek = 0.00
    var valuePlusCarWeekend = 0.00
    var valuePlusCarTotal = 0.00

    var valuePlusHour = 0.00

    var valueTotal = 0.00

    for (var i = 0; i < data.length; i++) {
      if (data[i].dataSaida != null) {

        valueDayWeek = (this.totalDays[i] - this.countDayWeekends[i]) * this.weekDayValue
        valueDayWeekend = this.countDayWeekends[i] * this.weekendDayValue
        valueTotalDays = (valueDayWeek + valueDayWeekend)

        // Extras veículo e horário

        if (data[i].adicionalVeiculo) {
          valuePlusCarWeek = (this.totalDays[i] - this.countDayWeekends[i]) * this.plusCarweek
          valuePlusCarWeekend = this.countDayWeekends[i] * this.plusCarWeekend
          valuePlusCarTotal = (valuePlusCarWeek + valuePlusCarWeekend)

        }

        if (new Date(data[i].dataSaida).getHours() >= 16) {

          if ((new Date(data[i].dataSaida).getHours() == 16 && new Date(data[i].dataSaida).getMinutes() > 30)
          || new Date(data[i].dataSaida).getHours() > 16) {

          if (new Date(data[i].dataSaida).getDay() == 0 || new Date(data[i].dataSaida).getDay() == 6) {
            valuePlusHour = this.weekendDayValue
          } else {
            valuePlusHour = this.weekDayValue
          }

        } 

        }

        valueTotal = valueTotalDays + valuePlusCarTotal + valuePlusHour

        var stringTotalValue = valueTotal.toString().replace(".", ",")
      
        this.values.push(stringTotalValue)

      } else {
        this.values[i] = ""
      }
      
    }

  } 

  changeIsPresent(event) {

    if (event.target.value) {
      this.dataList = []

      this.filteredDataList = this.checkIn.filter(data => {

        for (var i = 0; i < this.checkIn.length; i++) {

          if (new Date(data.dataSaida).getFullYear() == new Date().getFullYear() || data.dataSaida == null) {
            
            if (new Date(data.dataSaida).getMonth() == new Date().getMonth() || data.dataSaida == null) {
              
              if (new Date(data.dataSaida).getDate() == new Date().getDate() || data.dataSaida == null) {
                
                if (new Date(data.dataSaida).getMinutes() < new Date().getMinutes() || data.dataSaida == null) {

                  this.dataList.push({name: data.hospede.nome, document: data.hospede.documento, value: this.values[i]})

                  console.log(this.dataList)
                  return this.dataList 
                }
              } 
            }
          
          }
        }
      })
    }
  }

  changeNotPresent(event) {

    if (event.target.value) { 
      this.dataList = []   

      this.filteredDataList = this.checkIn.filter(data => {
          for (var i = 0; i < this.checkIn.length; i++) {
            if (new Date(data.dataSaida).getFullYear() < new Date().getFullYear() && data.dataSaida != null) {

              this.dataList.push({name: data.hospede.nome, document: data.hospede.documento, value: this.values[i]})

              return this.dataList  

            } else if (new Date(data.dataSaida).getMonth() < new Date().getMonth() && data.dataSaida != null) {

              this.dataList.push({name: data.hospede.nome, document: data.hospede.documento, value: this.values[i]})

              return this.dataList 
            
          } else if ((new Date(data.dataSaida).getDate() < new Date().getDate()) && data.dataSaida != null) {

              this.dataList.push({name: data.hospede.nome, document: data.hospede.documento, value: this.values[i]})

              return this.dataList 
          } else if ((new Date(data.dataSaida).getDate() == new Date().getDate()) 
          && (new Date(data.dataSaida).getMinutes() < new Date().getMinutes()) && data.dataSaida != null) {

            this.dataList.push({name: data.hospede.nome, document: data.hospede.documento, value: this.values[i]})

            return this.dataList
          }
        }
      })
    }
  }

  updateCheckin(document: string) {
    this.route.navigate(['update-checkin', document]);
  }
}
