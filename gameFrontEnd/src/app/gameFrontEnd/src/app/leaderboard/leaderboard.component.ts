import { Component, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface Userdata {
  name: string;
  position: number;
  wins: number;
  losses: number;
}

const USER_DATA: Userdata[] = [
  {position: 1, name: 'PlayerA1', wins: 1000, losses: 0},
  {position: 2, name: 'PlayerWow', wins: 900, losses: 100},
  {position: 3, name: 'PoohBear', wins: 800, losses: 200},
  {position: 4, name: 'UnikornBoi', wins: 700, losses: 300},
  {position: 5, name: 'RapGod', wins: 600, losses: 400},
  {position: 6, name: 'NotPutin69', wins: 400, losses: 600},
  {position: 7, name: 'SnowWhite', wins: 300, losses: 700},
  {position: 8, name: 'PuffTheDragon', wins: 200, losses: 800},
  {position: 9, name: 'KingAurther', wins: 100, losses: 900},
  {position: 10, name: 'Steven Grant', wins: 0, losses: 50000000000},

];

@Component({
  selector: 'app-leaderboard',
  styleUrls: ['leaderboard.component.scss'],
  templateUrl: 'leaderboard.component.html',
})
export class LeaderboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'wins', 'losses'];
  dataSource = new MatTableDataSource(USER_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
