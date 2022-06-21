import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialsModule } from './materials.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './header/sign-in/sign-in.component';
import { SignUpComponent } from './header/sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { LobbyChatComponent } from './lobby-chat/lobby-chat.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameComponent } from './game/game.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { LobbyComponent } from './lobby/lobby.component';
import { GameplayScreenComponent } from './gameplay-screen/gameplay-screen.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    LobbyChatComponent,
    GameListComponent,
    GameComponent,
    GameBoardComponent,
    LobbyComponent,
    GameplayScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
