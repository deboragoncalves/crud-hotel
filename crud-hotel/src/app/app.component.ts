import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  title = 'crud-hotel';

  showMainComponents = true;

  newPersonClick() {
    this.showMainComponents = !this.showMainComponents
  }
}
