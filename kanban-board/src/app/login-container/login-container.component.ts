import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.css'
})
export class LoginContainerComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showRegister = false;
  showSpacer = false;
  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: response => {
        // Handle successful authentication
        console.log(response);
        this.authService.bearerToken=response.token;
        
        this.router.navigate(['/board']);
        this.authService.loggedInEmail = this.username;
        this.authService.isLoggedIn = true;
      },
      error: error => {
        // Handle authentication error
        console.error(error);
        this.errorMessage = 'Authentication failed. Please check your credentials.';
    
      }
    });
    
  }
  toggleRegister() {
    this.showRegister = !this.showRegister;
    this.showSpacer = true; // Show spacer when toggling to register form
  }

}
