import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GameData, WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-gameplay-screen',
  templateUrl: './gameplay-screen.component.html',
  styleUrls: ['./gameplay-screen.component.scss'],
})
export class GameplayScreenComponent implements OnInit, AfterViewInit {
  railsSub : any;
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

  constructor(private socket: WebsocketService, private http: HttpClient) {}

  ngAfterViewInit(): void {
    console.log("this is after view init")
    this.railsSub = this.socket.gameData.subscribe((data: any) => {
      console.log('websocket connected')
      if (data.type === "welcome"){
        let storedGame = localStorage.getItem('gameId');
        this.token = localStorage.getItem('token');
        console.log('THIS IS THE STORED GAME', storedGame);
        if (storedGame === null) {
          this.createGame();
        } else if (storedGame !== null) {
          this.subToGame(parseInt(storedGame));
        }
      }
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
    console.log("this is ngoninit")
  }



  ngOnDestroy() {
    let unsub = {
      command: 'unsubscribe',
      identifier: JSON.stringify({
        id: this.gameId,
        channel: 'GameChannel',
      }),
    };
    console.log('unsubbing with', unsub);
    this.socket.gameData.next(unsub);

  }

  doesGameExist() {
    if (this.gameData != undefined) {
      return false;
    } else {
      return true;
    }
  }
}
