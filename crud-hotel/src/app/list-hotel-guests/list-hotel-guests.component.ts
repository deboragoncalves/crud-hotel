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

  
  name: Array<string> = [];
  document: Array<string> = [];
  value: Array<number> = [];

  weekDayValue: number = 120;
  weekendDayValue: number = 150;

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    this.getGuests();
    this.getCheckin();
  }

  private getCheckin() {
    this.hotelService.getCheckinList().subscribe(data => {
      this.checkIn = data;

      for (var i = 0; i < this.checkIn.length; i++) {
    
        // Calcular valor com base nos inputs
        this.value.push(0)
      }

      this.populateList();
    })
  }

  private getGuests() {
    this.hotelService.getGuestsList().subscribe(data => {
      this.hospede = data

      for (var i = 0; i < this.hospede.length; i++) {
        this.name.push(this.hospede[i].nome)
        this.document.push(this.hospede[i].documento)
      }
    })
  }

  private populateList() {
    for (var i = 0; i < this.name.length; i++) {
      this.dataList.push({ name: this.name[i], document: this.document[i], value: this.value[i] })
    }

    console.log(this.dataList)
  }

}
