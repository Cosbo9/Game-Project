import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
  { path: '', component: LobbyComponent},
  { path: 'game' , component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
