import { templateJitUrl } from '@angular/compiler';
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

  dataList: Array<any> = [];

  newArrayGuests: Array<any> = []
  newArrayValues: Array<any> = []

  valuesTotal: Array<any> = [];
  arrayIds: Array<number> = [];
  valuesFinal: Array<any> = [];

  totalDays: Array<number> = [];
  countDayWeekends: Array<number> = [];

  weekDayValue: number = 120.00;
  weekendDayValue: number = 150.00;

  plusCarWeek: number = 15.00;
  plusCarWeekend: number = 20.00;

  present: string;
  notPresent: string;

  constructor(private hotelService: HotelService, private route: Router) { }

  ngOnInit(): void {
    this.getCheckin();
  }

  getCheckin() {
    this.hotelService.getCheckinList().subscribe(data => {
      this.checkIn = data;

      this.calcDays(data)

      // Popular lista

      var arrayGuests = [];

        for (var i = 0; i < data.length; i++) {

          arrayGuests.push(JSON.stringify(data[i].hospede));
  
        }

        var uniqueGuests = new Set(arrayGuests);

        var uniqueValues = new Set(this.valuesTotal)
        uniqueValues.delete(0)

        uniqueGuests.forEach(guest => {
          this.newArrayGuests.push(guest)
        })

        uniqueValues.forEach(value => {
          this.newArrayValues.push(value)
        })

        for (var i = 0; i < this.newArrayGuests.length; i++) {
          var guestJSON = JSON.parse(this.newArrayGuests[i])

          this.dataList.push({name: guestJSON.nome, document: guestJSON.documento, value: this.newArrayValues[i] })

        }

    }, error => console.log(error))
  }
      
  calcDays(data: Array<Checkin>) {

    console.log(data)

    for (var i = 0; i < data.length; i++) {

      if (data[i].dataSaida == "") {

        const dateInMs = new Date(data[i].dataEntrada).getTime()
        const dateNowMs = new Date().getTime()

        const msOneDay = 1000 * 60 * 60 * 24
        this.totalDays.push(Math.round((dateNowMs - dateInMs)/msOneDay))

        // Final de semana

        var count = 0
        var dayWeek = 0

        var dateInStart = new Date(data[i].dataEntrada);

        dayWeek = dateInStart.getDay()

        if (dayWeek == 0 || dayWeek == 6) {
          count++;
        }

        while (dateInStart < new Date()) {
          dateInStart.setDate(dateInStart.getDate() + 1)

          dayWeek = dateInStart.getDay()

          if (dayWeek == 0 || dayWeek == 6) {
            count++;
          }

        }

        this.countDayWeekends.push(count)
      } else {

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

        valueDayWeek = (this.totalDays[i] - this.countDayWeekends[i]) * this.weekDayValue
        valueDayWeekend = this.countDayWeekends[i] * this.weekendDayValue
        valueTotalDays = (valueDayWeek + valueDayWeekend)

        // Extras veículo e horário

        if (data[i].adicionalVeiculo) {

          valuePlusCarWeek = (this.totalDays[i] - this.countDayWeekends[i]) * this.plusCarWeek
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

        this.valuesTotal.push(valueTotal)

        this.arrayIds.push(data[i].hospede.id)

    }

    this.calcTotalValues(this.arrayIds);

  }
  
  calcTotalValues(arrayIds: Array<number>) {
    console.log(this.valuesTotal)

    for (var i = 0; i < arrayIds.length; i++) {

      // Retorna o índice do primeiro item

      var indexId = arrayIds.indexOf(arrayIds[i])

      // Indice id x atual

      if (i !== indexId) {

        this.valuesTotal[indexId] = this.valuesTotal[i] + this.valuesTotal[indexId]
        this.valuesTotal[i] = 0

      } 
      
    }

  }

  changeIsPresent(event) {

    this.dataList = []

    this.present = event.target.value
    this.notPresent = null

    if (this.present == "on") {
      
          for (var i = 0; i < this.checkIn.length; i++) {

              for (var j = 0; j < this.newArrayGuests.length; j++) {

                var jsonParse = JSON.parse(this.newArrayGuests[j])

                if (jsonParse.documento == this.checkIn[i].hospede.documento && this.checkIn[i].dataSaida == "") {
                  this.dataList.push({ name: jsonParse.nome, document: jsonParse.documento, value: this.newArrayValues[j] })
                }                
              }
              
            }
          
            this.dataList = this.dataList.filter(function (dataList) {
              console.log("Aqui true " + this[JSON.stringify(dataList)])
              console.log("Aqui false " + !this[JSON.stringify(dataList)])
              return !this[JSON.stringify(dataList)] && (this[JSON.stringify(dataList)] = true);
            }, Object.create(null))
            
            console.log(this.dataList)
            
    }
  }

  changeNotPresent(event) {

    this.dataList = []

    this.present = null
    this.notPresent = event.target.value

    if (this.notPresent == "on") { 
      
        for (var i = 0; i < this.checkIn.length; i++) {

            for (var j = 0; j < this.newArrayGuests.length; j++) {

              var jsonParse = JSON.parse(this.newArrayGuests[j])

              if (jsonParse.documento == this.checkIn[i].hospede.documento && this.checkIn[i].dataSaida !== "") {
                this.dataList.push({ name: jsonParse.nome, document: jsonParse.documento, value: this.newArrayValues[j] })
              }

            }

          }

          // Remover objetos duplicados.
          // Quando está duplicado, retorna false; o contrário, true

          this.dataList = this.dataList.filter(function (dataList) {
            console.log("Aqui true " + this[JSON.stringify(dataList)])
            console.log("Aqui false " + !this[JSON.stringify(dataList)])
            return !this[JSON.stringify(dataList)] && (this[JSON.stringify(dataList)] = true);
          }, Object.create(null))
          
          console.log(this.dataList)
          
    } 
  }

  updateCheckin() {
    this.route.navigate(['update-checkin']);
  }

  deleteGuest(name: string, document: string) {

    this.hotelService.getCheckinList().subscribe(allCheckin => {
      for (var i = 0; i < allCheckin.length; i++) {
        if (allCheckin[i].hospede.nome == name && allCheckin[i].hospede.documento == document) {
          this.hotelService.deleteCheckin(allCheckin[i].id).subscribe(deleteCheckin => {
            console.log(deleteCheckin);

            this.hotelService.getGuestsList().subscribe(allGuests => {

              for (var i = 0; i < allGuests.length; i++) {
                if (allGuests[i].nome == name && allGuests[i].documento == document) {
                  this.hotelService.deleteGuest(allGuests[i].id).subscribe(deleteGuest => {
                    console.log(deleteGuest)

                    window.location.reload()

                  }, error => console.log (error))
                }
              }
              
            },error => console.log(error))

          })
        }
      }
    })
          
  }
}
