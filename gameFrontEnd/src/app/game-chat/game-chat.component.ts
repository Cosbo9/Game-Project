import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { LobbyService } from '../services/lobby.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-game-chat',
  templateUrl: './game-chat.component.html',
  styleUrls: ['./game-chat.component.scss']
})
export class GameChatComponent implements OnInit {
  @ViewChild('input') input:ElementRef;
  @ViewChild('chatOutput') private myScrollContainer: ElementRef;
  messageList: any[]= [];
  messageForm = new FormGroup({
    message: new FormControl(null),
  });

  constructor(
    private chat: ChatService,
    private lobby: LobbyService,
    private socket: WebsocketService
  ) {}

  ngOnInit(): void {
    this.socket.connected.subscribe((bool) => {
      if (bool) {
        this.lobby.subToLobbyChat();
      }
    });

    this.lobby.lobbySub.subscribe((message) => {
      this.messageList.push(message);0
      setTimeout(()=>
      this.myScrollContainer.nativeElement.scroll({
        top: this.myScrollContainer.nativeElement.scrollHeight ,
        left: 0,
        behavior: 'smooth'
      }), 0);
    });
  }

  onSendMessage(data: any) {
    this.lobby.postMessage(data.value).subscribe();
    this.input.nativeElement.value = ""
  }
}
