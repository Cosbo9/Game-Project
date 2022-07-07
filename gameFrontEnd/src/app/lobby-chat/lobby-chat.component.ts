import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { stringify } from 'querystring';
import { ChatService } from '../services/chat.service';
import { LobbyService } from '../services/lobby.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-lobby-chat',
  templateUrl: './lobby-chat.component.html',
  styleUrls: ['./lobby-chat.component.scss'],
})
export class LobbyChatComponent implements OnInit {
  messageList: any[];
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
      this.messageList.push(message);
    });
  }

  onSendMessage(data: any) {
    this.lobby.postMessage(data.value).subscribe();
  }
}
