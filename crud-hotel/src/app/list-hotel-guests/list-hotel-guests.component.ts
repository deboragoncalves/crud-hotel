import { Component, OnInit } from '@angular/core';
import { Checkin } from '../models/checkin/checkin';
import { DataList } from '../models/dataList/data-list';
import { Person } from '../models/person/person';

@Component({
  selector: 'app-list-hotel-guests',
  templateUrl: './list-hotel-guests.component.html',
  styleUrls: ['./list-hotel-guests.component.sass']
})
export class ListHotelGuestsComponent implements OnInit {

  person: Person[];
  checkIn: Checkin[];
  dataList: DataList[];

  dayValue = 120;
  totalValue = 0;

  constructor() { }

  ngOnInit(): void {
    this.person = [
      {
      id: 1,
      name: "Bárbara",
      document: "12345",
      phone: "(47) 99999-1212"
    },
    {
      id: 2,
      name: "Débora",
      document: "54321",
      phone: "(47) 99195-3733"
    }
    ];

    this.checkIn = [{
      id: 1,
      person: this.person[0],
      beginDate: new Date(),
      finalDate: new Date(),
      carPlus: false
    },
    {
      id: 2,
      person: this.person[1],
      beginDate: new Date(),
      finalDate: new Date(),
      carPlus: false
    }];

    this.dataList = [
      {
      name: this.person[0].name,
      document: this.person[0].document,
      value: this.dayValue * (2)
      },
      {
      name: this.person[1].name,
      document: this.person[1].document,
      value: this.dayValue * (3)
      }
    ];

    console.log(this.person);
    console.log(this.checkIn);
  }

}
