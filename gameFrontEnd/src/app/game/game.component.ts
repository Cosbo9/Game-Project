import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  newGame() {
    localStorage.removeItem("gameId");
    localStorage.removeItem("token");
    setTimeout(()=>this.router.navigate(['game']), 3000)

  }
}
