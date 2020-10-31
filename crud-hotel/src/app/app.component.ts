import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  title = 'crud-hotel';

  showMainComponents = true;
  clickNewPerson = false;

  newPersonClick() {

    if (this.clickNewPerson) {
      this.showMainComponents = !this.showMainComponents
    }

    console.log(this.clickNewPerson)
  }
}
