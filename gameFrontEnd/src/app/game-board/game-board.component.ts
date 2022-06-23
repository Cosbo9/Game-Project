import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, OnChanges {
  @Input() moves: string | undefined;
  hoveredColumn: number | null = null;
  faArrowDown = faArrowDown
  game: Game;
  constructor() {
    console.log(typeof this.moves);
    if (this.moves !== undefined) {
      this.game = new Game(this.moves);
    }
  }


  ngOnChanges(): void {
    if (this.moves !== undefined) {
      this.game = new Game(this.moves);
    }
  }
  ngOnInit(): void {
  }

  playMove(column: number) {
    if (this.game.board[0][column] == '') {
      console.log('playing move')
    }
  }
  onHover(column: number) {

  }
}
