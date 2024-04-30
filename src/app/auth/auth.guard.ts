import { CanActivate, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn:'root'
})
export  class AuthGuard implements CanActivate {
  constructor(private authService:AuthService){}

  canActivate(){
    return this.authService.isLoggedIn();
  }
}


