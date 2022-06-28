import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  availableGames: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http
      .get(environment.games)
      .subscribe((games) => (this.availableGames = games));
    //   setInterval(() => {
    //     this.http
    //       .get(environment.games)
    //       .subscribe((games) => (this.availableGames = games));
    //   }, 10000);
  }

  joinGame(id: number) {
    this.http
      .post(environment.apiKey + 'join', { game: { game_id: id } })
      .subscribe((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('gameId', id.toString());
        this.router.navigate(['game']);
      });
  }
}
