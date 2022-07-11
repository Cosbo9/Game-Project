import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  signUp(info: any) {
    console.log(info);
    return this.http.post('http://localhost:3000/signup', info, {
      observe: 'response',
    });
  }

  signIn(info: any) {
    return this.http.post('http://localhost:3000/login', info, {
      observe: 'response',
    });
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getUser() {}

  isLoggedIn() {
    let token = this.getToken();
    if (token.length === 20 || token === '') {
      return false;
    } else {
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}
