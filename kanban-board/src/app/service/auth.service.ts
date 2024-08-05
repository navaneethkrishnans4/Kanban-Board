import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:9000/api/auth/login';
  bearerToken ="";
  loggedInEmail = "";
  isLoggedIn:Boolean = false;
  constructor(private http: HttpClient) { }

  login(emailId: string, password: string) {
    return this.http.post<any>(this.loginUrl, { emailId, password });
  }
}
