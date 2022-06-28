import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameSubject = new BehaviorSubject<any>({});
  constructor(private socket: WebsocketService, private api: ApiService) {}

  sendData(data: any) {
    this.gameSubject.next(data);
  }

  getData() {
    return this.gameSubject.getValue();
  }

  subToGameChannel(gameId: number) {
    let sub = {
      command: 'subscribe',
      identifier: {
        id: gameId,
        channel: 'GameChannel',
      },
    };
    this.socket.message.next(sub);
  }

  unsubFromGameChannel(gameId: number) {
    let unsub = {
      command: 'unsubscribe',
      identifier: {
        id: gameId,
        channel: 'GameChannel',
      },
    };
    this.socket.message.next(unsub);
  }

  // This could really just be used from the Api service, but to keep things consistant, the game will only call things through the GameService
  playMove(id: number, move: number, token: string) {
    return this.api.playMove(id, move, token);
  }
}
