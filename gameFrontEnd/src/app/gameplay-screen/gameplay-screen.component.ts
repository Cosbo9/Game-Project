import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameData } from '../models/game-data';
import { GameService } from '../services/game.service';
import { Message } from '../services/websocket.service';

@Component({
  selector: 'app-gameplay-screen',
  templateUrl: './gameplay-screen.component.html',
  styleUrls: ['./gameplay-screen.component.scss'],
})
export class GameplayScreenComponent implements OnInit {
  railsSub: any;
  gameData: GameData = new GameData({})
  gameId: number;
  token: any;
  winner: string;

  constructor(private gameService: GameService, private route: ActivatedRoute) {
    this.gameId = route.snapshot.params['id'];
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.gameService.gameSubject.subscribe((data) => {
      console.log(data)
      console.log(data.status)
      if (data) {
        this.gameData = data;
      }
      if (data.status === "host_win") {
        this.winner = "Red has won"
        this.gameData = data
        }
        if (data.status === "joining_win") {
          this.winner = "Black has won"
          this.gameData = data
        }

    });

    this.gameService.subToGameChannel(this.gameId);
  }

  playMove(column: number) {
    this.gameService.playMove(this.gameId, column, this.token).subscribe();
  }

  ngOnDestroy() {
    this.gameService.unsubFromGameChannel(this.gameId);
  }

  doesGameExist() {
    if (this.gameData != undefined) {
      return false;
    } else {
      return true;
    }
  }
}
