import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {}

  newGame() {
    this.apiService.createGame().subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['game', res.game_id]);
    });
  }
}
