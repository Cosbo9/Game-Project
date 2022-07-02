import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  createGame() {
    var token = localStorage.getItem('token')
    return token != null ? this.http.post(environment.apiKey, {game: {token: token}}) : this.http.post(environment.apiKey, {"game": {}})
  }

  joinGame(gameId: number) {
    return this.http.post(environment.apiKey + 'join', {
      game: { game_id: gameId },
    });
  }

  playMove(id: number, move: number, token: string) {
    return this.http.post(environment.apiKey + 'play', {
      game: {
        token: token,
        game_id: id,
        new_move: move,
      },
    });
  }
}
