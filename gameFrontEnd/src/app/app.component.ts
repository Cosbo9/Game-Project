import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';
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
    private chatService: ChatService,
    private lobbyService: LobbyService,
    private gameService: GameService
  ) {
    socket.message.subscribe((data: any) => {
      if (data?.message?.type == 'data') {
        gameService.sendData(data.message.game);
      }
      if (data?.message?.type == 'lobby_message') {
        this.lobbyService.sendMessage(data.message.message);
      }
      if (data?.message?.type == 'chat_message') {
        this.chatService.sendMessage(data.message.message);
      }
      if (data?.message?.error) {
        throw data.message.error;
      }
    });
  }

  ngOnInit() {}
}
