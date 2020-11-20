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

  emailInput = new FormControl('');
  passwordInput = new FormControl('');

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

    if (this.emailInput.valid) {

      if (this.passwordInput.valid) {

        // Local Storage

        localStorage.setItem('email', this.email)
        localStorage.setItem('password', this.password)

        // Home

        this.router.navigate([''])


      } else {
  
        this.toastr.warning("O campo Senha é obrigatório e deve conter 5 letras, sendo 1 maiúscula, e 1 número.")
        return;
  
      }

    } else {

      this.toastr.warning("O campo Email é obrigatório e deve ter o formato: email@email.com.")
      return;

    }

  } 

  onSubmit() {

    // Validação conforme masks

    this.validateData();

  }

}
