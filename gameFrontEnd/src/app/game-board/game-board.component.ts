import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, OnChanges {
  @Input() moves: string | undefined;
  game: Game;
  constructor() {
    console.log(typeof this.moves);
    if (this.moves !== undefined) {
      this.game = new Game(this.moves);
    }
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.moves !== undefined) {
      this.game = new Game(this.moves);
    }
  }
}
