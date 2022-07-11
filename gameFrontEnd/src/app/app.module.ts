import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialsModule } from './materials.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { LobbyChatComponent } from './lobby-chat/lobby-chat.component';
import { GameListComponent } from './game-list/game-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { LobbyComponent } from './lobby/lobby.component';
import { GameplayScreenComponent } from './gameplay-screen/gameplay-screen.component';
import { HttpClient, HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationComponent } from './header/authentication/authentication.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeviseInterceptor } from './devise-interceptor';
import { GameChatComponent } from './game-chat/game-chat.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    LobbyChatComponent,
    GameListComponent,
    GameComponent,
    GameBoardComponent,
    LobbyComponent,
    GameplayScreenComponent,
    AuthenticationComponent,
    LeaderboardComponent,
    GameChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: DeviseInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
