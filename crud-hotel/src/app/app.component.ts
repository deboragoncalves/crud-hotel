import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  public showSidebar = false;

  constructor(private router: Router) { }

  title = 'crud-hotel';

  toggleMenu() {
    this.showSidebar = !this.showSidebar
  }

  goToLogin() {

    localStorage.clear()

    // Login

    this.router.navigate(['login'])

  }
}
