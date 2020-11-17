import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../hotel.service';
import { Checkin } from '../models/checkin/checkin';
import { Guest } from '../models/guest/guest';

@Component({
  selector: 'app-list-hotel-guests',
  templateUrl: './list-hotel-guests.component.html',
  styleUrls: ['./list-hotel-guests.component.sass']
})
export class ListHotelGuestsComponent implements OnInit {

  present: string;
  notPresent: string;

  guest: Guest[];
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

  constructor(private hotelService: HotelService, private route: Router) { }

  ngOnInit(): void {
    this.getCheckin();

    // Inicializar inputs vazio

    this.present = ""
    this.notPresent = ""
  }

  getCheckin() {
    this.hotelService.getCheckinList().subscribe(data => {
      this.checkIn = data;

      this.calcDays(data)

      // Popular lista

      var arrayGuests = [];

        for (var i = 0; i < data.length; i++) {

          arrayGuests.push(JSON.stringify(data[i].guest));
  
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

          this.dataList.push({name: guestJSON.name, document: guestJSON.document, value: this.newArrayValues[i] })

        }

        // Ordenar array, comparando o item atual com o próximo.
        // Reverse: ordem decrescente

        this.dataList.sort(function(itemA, itemB) {
            return itemA.value - itemB.value
        });

        this.dataList.reverse();

    }, error => console.log(error))
  }
      
  calcDays(data: Array<Checkin>) {

    console.log(data)

    for (var i = 0; i < data.length; i++) {

      if (data[i].dateOut == "" || data[i].dateOut == null) {

        const dateInMs = new Date(data[i].dateIn).getTime()
        const dateNowMs = new Date().getTime()

        const msOneDay = 1000 * 60 * 60 * 24
        this.totalDays.push(Math.round((dateNowMs - dateInMs)/msOneDay))

        // Final de semana

        var count = 0
        var dayWeek = 0

        var dateInStart = new Date(data[i].dateIn);

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

        const dateInMs = new Date(data[i].dateIn).getTime()
        const dateOutMs = new Date(data[i].dateOut).getTime()

        const msOneDay = 1000 * 60 * 60 * 24
        this.totalDays.push(Math.round((dateOutMs - dateInMs)/msOneDay))

        // Final de semana

        var count = 0
        var dayWeek = 0

        var dateInStart = new Date(data[i].dateIn);

        dayWeek = dateInStart.getDay()

        if (dayWeek == 0 || dayWeek == 6) {
          count++;
        }

        while (dateInStart < new Date(data[i].dateOut)) {
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

      if (data[i].plusCar) {

        valuePlusCarWeek = (this.totalDays[i] - this.countDayWeekends[i]) * this.plusCarWeek
        valuePlusCarWeekend = this.countDayWeekends[i] * this.plusCarWeekend
        valuePlusCarTotal = (valuePlusCarWeek + valuePlusCarWeekend)

      }

      if (new Date(data[i].dateOut).getHours() >= 16) {

        if ((new Date(data[i].dateOut).getHours() == 16 && new Date(data[i].dateOut).getMinutes() > 30)
        || new Date(data[i].dateOut).getHours() > 16) {

          if (new Date(data[i].dateOut).getDay() == 0 || new Date(data[i].dateOut).getDay() == 6) {
            valuePlusHour = this.weekendDayValue
          } else {
            valuePlusHour = this.weekDayValue
          }

        }
    }

    valueTotal = valueTotalDays + valuePlusCarTotal + valuePlusHour

    this.valuesTotal.push(valueTotal)

    this.arrayIds.push(data[i].guest.id)

  }

    this.calcTotalValues(this.arrayIds);

  }
  
  calcTotalValues(arrayIds: Array<number>) {

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

    // Setar valores input

    this.present = "1";
    this.notPresent = "0";

    if (event.target.value == 'on') {
      
          for (var i = 0; i < this.checkIn.length; i++) {

              for (var j = 0; j < this.newArrayGuests.length; j++) {

                var jsonParse = JSON.parse(this.newArrayGuests[j])

                if (jsonParse.documento == this.checkIn[i].guest.document && (this.checkIn[i].dateOut == "" || this.checkIn[i].dateOut == null)) {
                  this.dataList.push({ name: jsonParse.nome, document: jsonParse.documento, value: this.newArrayValues[j] })
                }                
              }
              
            }
          
            this.dataList = this.dataList.filter(function (dataList) {
              return !this[JSON.stringify(dataList)] && (this[JSON.stringify(dataList)] = true);
            }, Object.create(null))
            
            console.log(this.dataList)

            // Ordenar array, comparando o item atual com o próximo.
            // Reverse: ordem decrescente

            this.dataList.sort(function(itemA, itemB) {
              return itemA.value - itemB.value
            });

            this.dataList.reverse();
            
    }
  }

  changeNotPresent(event) {

    this.dataList = []

    // Setar valores input

    this.present = "0";
    this.notPresent = "1";

    if (event.target.value == 'on') { 
      
        for (var i = 0; i < this.checkIn.length; i++) {

            for (var j = 0; j < this.newArrayGuests.length; j++) {

              var jsonParse = JSON.parse(this.newArrayGuests[j])

              if (jsonParse.documento == this.checkIn[i].guest.document && (this.checkIn[i].dateOut !== "" && this.checkIn[i].dateOut !== null)) {
                this.dataList.push({ name: jsonParse.nome, document: jsonParse.documento, value: this.newArrayValues[j] })
              }

            }

          }

          this.dataList = this.dataList.filter(function (dataList) {
            return !this[JSON.stringify(dataList)] && (this[JSON.stringify(dataList)] = true);
          }, Object.create(null))
          
          console.log(this.dataList)

            this.dataList.sort(function(itemA, itemB) {
              return itemA.value - itemB.value
            });

            this.dataList.reverse();
          
    } 
  }

  updateCheckin() {
    this.route.navigate(['update-checkin']);
  }

  deleteGuest(name: string, document: string) {

    this.hotelService.getCheckinList().subscribe(allCheckin => {
      for (var i = 0; i < allCheckin.length; i++) {
        if (allCheckin[i].guest.name == name && allCheckin[i].guest.document == document) {
          this.hotelService.deleteCheckin(allCheckin[i].id).subscribe(deleteCheckin => {
            console.log(deleteCheckin);

            this.hotelService.getGuestsList().subscribe(allGuests => {

              for (var i = 0; i < allGuests.length; i++) {
                if (allGuests[i].name == name && allGuests[i].document == document) {
                  this.hotelService.deleteGuest(allGuests[i].id).subscribe(deleteGuest => {
                    
                    console.log(deleteGuest)

                    window.location.reload()

                  }, error => console.log (error))
                }
              }
              
            }, error => console.log(error))

          })
        }
      }
    })
          
  }

  page(event) {
    console.log(event.target.value)
  }
}
