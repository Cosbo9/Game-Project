import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  sendMessage(data: any) {
    return this.http.post('http://localhost:3000/api/v1/message', data);
  }
}
