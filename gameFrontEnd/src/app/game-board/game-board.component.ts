import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit{

  game: Game;
  constructor() {
    this.game = new Game('lavender1,red3,#36d1bc6,black5,red1,blue1,red1,blue1,blue1,red0,blue5')
  }


  ngOnInit(): void {





  }

}
