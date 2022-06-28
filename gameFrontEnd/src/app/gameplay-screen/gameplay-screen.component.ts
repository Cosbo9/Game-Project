import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
  createGameData: {
    game: {
      color: string;
    };
  };
  gameId: number;
  token: any;

  constructor(private socket: WebsocketService, private http: HttpClient) {
    this.railsSub = socket.gameData.subscribe((data: any) => {
      if (data.message?.moves != undefined) {
        this.gameData = data.message;
      }
      console.log(data);
    });
  }

  subToGame(id: number) {
    this.gameId = id;
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
    console.log('create game used');
    this.http
      .post(environment.apiKey, this.createGameData)
      .subscribe((res: any) => {
        console.log(res);
        this.token = res.token;
        this.subToGame(res.game_id);
      });
  }

  playMove(column: number) {
    var gameData = {
      game: {
        token: this.token,
        game_id: this.gameId,
        new_move: column,
      },
    };
    this.http.post(environment.apiKey + 'play', gameData).subscribe();
  }
  ngOnInit(): void {
    let storedGame = localStorage.getItem('gameId');
    this.token = localStorage.getItem('token');
    console.log('THIS IS THE STORED GAME', storedGame);
    if (storedGame === null) {
      this.createGame();
    } else if (storedGame !== null) {
      this.subToGame(parseInt(storedGame));
    }
  }

  ngOnDestroy() {
    this.railsSub.unsubscribe();
    localStorage.clear;
  }

  doesGameExist() {
    if (this.gameData != undefined) {
      return false;
    } else {
      return true;
    }
  }
}
