import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameSubject = new Subject<any>();
  constructor(private socket: WebsocketService, private api: ApiService) {}

  sendData(data: any) {
    this.gameSubject.next(data);
  }

  getData() {
    // return this.gameSubject.getValue();
  }

  subToGameChannel(gameId: number) {
    this.socket.connected.subscribe((connection: boolean) => {
      if (connection) {
        let sub = {
          command: 'subscribe',
          identifier: JSON.stringify({
            id: gameId,
            channel: 'GameChannel',
          }),
        };
        console.log(`Subbing to GameChannel with ID: ${gameId}`);
        this.socket.message.next(sub);
      }
    });
  }

  unsubFromGameChannel(gameId: number) {
    let unsub = {
      command: 'unsubscribe',
      identifier: JSON.stringify({
        id: gameId,
        channel: 'GameChannel',
      }),
    };
    this.socket.message.next(unsub);
  }

  // This could really just be used from the Api service, but to keep things consistant, the game will only call things through the GameService
  playMove(id: number, move: number, token: string) {
    return this.api.playMove(id, move, token);
  }
}
