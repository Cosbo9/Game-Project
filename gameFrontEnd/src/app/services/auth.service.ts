import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private httpHeaders: HttpHeaders) { }

  creatGame() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: localStorage.getItem('token')!
      })
    };

    this.http.post('game', {game: 'data'}, httpOptions)
  }

  signUp(info: any) {
    return this.http.post("http://localhost:3000/signup", info, {observe: 'response'})
  }

  signIn(info: any) {
    return this.http.post("http://localhost:3000/signin", info, {observe: "response"})
  }

  signOut() {

  }

  getUser() {

  }

  isLoggedIn() {

  }
}

