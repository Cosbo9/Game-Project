import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Game } from '../models/game';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, OnChanges {

  @Input() set moves(value:string){this.movesSubject.next(value)};
  movesSubject: BehaviorSubject<string> = new BehaviorSubject("");

  @Output() movePlayed: EventEmitter<number> = new EventEmitter();

  hoveredColumn: number | null = null;
  faArrowDown = faArrowDown
  game: Game;

  constructor() {
    this.game = new Game(this.movesSubject.value);
  }


  ngOnChanges(): void {
  }

  ngOnInit(): void {
    this.movesSubject.subscribe(moves =>{this.game.movesString = moves; console.log(this.game.board) })
  }

  playMove(column: number) {
    this.movePlayed.emit(column)
  }

  onHover(column: number) {

  }
}
