import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})

//  This app is primarily for indiidual game chats
export class ChatService {
  gameChatSub: Subject<any> = new Subject();
  constructor(private http: HttpClient, private api: ApiService) {}

  sendMessage(message: any) {
    this.gameChatSub.next(message);
  }

  postGameChatMessage(message: string) {
    this.api.sendGameChatMessage(message);
  }
}
