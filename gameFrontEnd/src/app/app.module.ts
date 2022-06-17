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
<<<<<<< HEAD
import { GameComponent } from './game/game.component';
=======
import { GameBoardComponent } from './game-board/game-board.component';
>>>>>>> 8b1db604d7b48cba403f7c4a130b5225dc585c4b


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    LobbyChatComponent,
    GameListComponent,
<<<<<<< HEAD
    GameComponent,
=======
    GameBoardComponent,
>>>>>>> 8b1db604d7b48cba403f7c4a130b5225dc585c4b
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
