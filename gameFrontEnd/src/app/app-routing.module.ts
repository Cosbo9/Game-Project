import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { GameplayScreenComponent } from './gameplay-screen/gameplay-screen.component';
import { SignInComponent } from './header/sign-in/sign-in.component';
import { SignUpComponent } from './header/sign-up/sign-up.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
  { path: '', component: LobbyComponent },
  { path: 'game', component: GameplayScreenComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
