import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  lobbySub = new Subject();

  constructor(private socket: WebsocketService) {}

  sendMessage(data: any) {
    this.lobbySub.next(data);
  }

  subToLobbyChat() {
    this.socket.connected.subscribe((connection: boolean) => {
      if (connection) {
        let sub = {
          command: 'subscribe',
          identifier: JSON.stringify({
            channel: 'LobbyChannel',
          }),
        };
        console.log(`Subbing to Lobby Chat`);
        this.socket.message.next(sub);
      }
    });
  }

  unsubFromLobbyChat() {
    let unsub = {
      command: 'unsubscribe',
      identifier: JSON.stringify({
        channel: 'LobbyChannel',
      }),
    };
    this.socket.message.next(unsub);
  }
}
