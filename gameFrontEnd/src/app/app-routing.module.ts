import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { GameplayScreenComponent } from './gameplay-screen/gameplay-screen.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
  { path: '', component: LobbyComponent },
  { path: 'game', component: GameplayScreenComponent },
  { path: 'leaderboard', component: LeaderboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
