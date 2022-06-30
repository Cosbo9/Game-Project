import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private socket: WebsocketService,
    private gameService: GameService
  ) {
    socket.message.subscribe((data: any) => {

      if (data?.message?.type == 'data') {
        gameService.sendData(data.message.game);
      }
      if (data?.message?.error) {
        throw data.message.error;
      }
      console.log("THIS IS GAME DATA", data)
    });
  }

  ngOnInit() {}
}
