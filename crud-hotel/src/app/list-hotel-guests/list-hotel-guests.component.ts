import { Component, OnInit } from '@angular/core';
import { Checkin } from '../models/checkin/checkin';
import { DataList } from '../models/dataList/data-list';
import { Hospede } from '../models/person/hospede';

@Component({
  selector: 'app-list-hotel-guests',
  templateUrl: './list-hotel-guests.component.html',
  styleUrls: ['./list-hotel-guests.component.sass']
})
export class ListHotelGuestsComponent implements OnInit {

  hospede: Hospede[];
  checkIn: Checkin[];
  dataList: DataList[];

  dayValue = 120;
  totalValue = 0;

  constructor() { }

  ngOnInit(): void {
    console.log(this.hospede);
    console.log(this.checkIn);
  }

}
