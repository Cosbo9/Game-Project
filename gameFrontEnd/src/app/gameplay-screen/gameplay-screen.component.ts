import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameData, WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-gameplay-screen',
  templateUrl: './gameplay-screen.component.html',
  styleUrls: ['./gameplay-screen.component.scss'],
})
export class GameplayScreenComponent implements OnInit {
  railsSub;
  gameData: GameData = {
    command: '',
    moves: '',
  };
  createGameData: { game: {} };

  constructor(private socket: WebsocketService, private http: HttpClient) {
    this.railsSub = socket.gameData.subscribe((data: any) => {
      if (!data.type) {
        this.gameData = data.message;
      }
      console.log(this.gameData);
    });
  }

  subToGame(id: number) {
    let sub = {
      command: 'subscribe',
      identifier: JSON.stringify({
        id: id,
        channel: 'GameChannel',
      }),
    };
    console.log('subbing with', sub);
    this.socket.gameData.next(sub);
  }
  createGame() {
    this.http
      .post('http://localhost:3000/api/v1/game/', this.createGameData)
      .subscribe((res: any) => {
        this.subToGame(res.game_id);
        this.http
          .get(`http://localhost:3000/api/v1/game/${res.game_id}`)
          .subscribe();
      });
  }
  ngOnInit(): void {
    console.log(this.gameData);
  }

  ngOnDestroy() {
    this.railsSub.unsubscribe();
  }

  doesGameExist() {
    if (this.gameData != undefined) {
      return false;
    } else {
      return true;
    }
  }
}
