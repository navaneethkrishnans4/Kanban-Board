import { CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService,private router:Router) {}

  canActivate: CanActivateFn = (route, state) => {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(["login"]);
      return false;
    } else {
      return true;
    }
  };
}