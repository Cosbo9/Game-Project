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
      ? this.http.post(environment.game, { game: { token: token } })
      : this.http.post(environment.game, { game: {} });
  }

  joinGame(gameId: number) {
    var token = localStorage.getItem('token');
    return this.http.post(environment.game + 'join', {
      game: { game_id: gameId, token: token },
    });
  }

  playMove(id: number, move: number, token: string) {
    return this.http.post(environment.game + 'play', {
      game: {
        token: token,
        game_id: id,
        new_move: move,
      },
    });
  }

  sendLobbyMessage(body: string) {
    return this.http.post(environment.apiKey + 'lobby/message', body);
  }

  sendGameChatMessage(body: string, id: number, token: string | null) {
    let postData = { message: body, game_id: id, token: token };
    return this.http.post(environment.apiKey + 'game/message', postData);
  }
}
