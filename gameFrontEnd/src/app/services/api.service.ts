import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  createGame() {
    var token = localStorage.getItem('token');
    return token != null
      ? this.http.post(environment.apiKey, { game: { token: token } })
      : this.http.post(environment.apiKey, { game: {} });
  }

  joinGame(gameId: number) {
    var token = localStorage.getItem('token');
    return this.http.post(environment.apiKey + 'join', {
      game: { game_id: gameId, token: token },
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

  sendLobbyMessage(message: string) {
    return this.http.post(environment.apiKey + 'lobby/message', message);
  }
}
