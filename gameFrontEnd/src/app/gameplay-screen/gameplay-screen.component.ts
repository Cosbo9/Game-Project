import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GameData, WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-gameplay-screen',
  templateUrl: './gameplay-screen.component.html',
  styleUrls: ['./gameplay-screen.component.scss'],
})
export class GameplayScreenComponent implements OnInit {
  content = '';
  gameData: GameData;
  sent: GameData[] = [];
  createGameData: {
    color: String;
    order: Number;
  };

  constructor(private socket: WebsocketService, private http: HttpClient) {
    socket.gameData.subscribe((data) => {
      this.gameData = data;
      console.log('Response from websocket: ' + data);
    });
  }

  subToGame() {
    let sub = {
      command: 'subscribe',
      identifier: JSON.stringify({
        id: this.gameData.id,
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
        console.log(res);
        this.gameData = res.game;
        this.subToGame();
      });
  }
  ngOnInit(): void {}

  chooseRed() {
    this.createGameData = {
      color: 'red',
      order: 1,
    };
  }
  chooseBlack() {
    this.createGameData = {
      color: 'black',
      order: 1,
    };
  }
}
