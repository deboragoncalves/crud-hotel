import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-checkin',
  templateUrl: './new-checkin.component.html',
  styleUrls: ['./new-checkin.component.sass']
})
export class NewCheckinComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(event: any) {
    event.target.dateIn.value
    event.target.dateOut.value
    event.target.person.value

  }

}
