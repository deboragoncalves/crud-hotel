import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    if (localStorage.getItem('email') && localStorage.getItem('password')) {

      // Home

      this.router.navigate([''])
    } 
  }
  
  validateData() {

    if (this.email.includes("@") && this.email.includes(".com")) {

      if (this.password.length > 7 && this.password.length < 16) {

        // Local Storage

        localStorage.setItem('email', this.email)
        localStorage.setItem('password', this.password)

        // Home

        this.router.navigate([''])


      } else {
  
        this.toastr.warning("O campo Senha é obrigatório e deve conter, no mínimo, 6 caracteres e, no máximo, 15 caracteres.")
        return;
  
      }

    } else {

      this.toastr.warning("O campo Email é obrigatório e deve conter os seguintes elementos: '@' e '.com'.")
      return;

    }

  } 

  onSubmit() {

    // Validação conforme masks

    this.validateData();

  }

}
