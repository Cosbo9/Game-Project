import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { LobbyService } from './services/lobby.service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private socket: WebsocketService,
    private gameService: GameService,
    private lobbyService: LobbyService
  ) {
    socket.message.subscribe((data: any) => {
      if (data?.message?.type == 'data') {
        gameService.sendData(data.message.game);
      }
      if (data?.message?.type == 'lobby_message') {
        this.lobbyService.sendMessage(data.message.message);
      }
      if (data?.message?.type == 'chat_message') {
        this.gameService.sendMessage(data.message.message);
      }
      if (data?.message?.error) {
        throw data.message.error;
      }
    });
  }

  ngOnInit() {}
}
