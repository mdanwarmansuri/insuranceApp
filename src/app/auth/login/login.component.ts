import { Component } from '@angular/core';
import { LoginForm } from '../../types/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService:AuthService){

  }
  form: LoginForm = {
    email: '',
    password: ''
  }

  login(){
    this.authService.login(this.form);
  }

  isLoading():boolean{
    return this.authService.isLoading;
  }
}
