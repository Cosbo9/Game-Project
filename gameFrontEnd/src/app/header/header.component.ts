import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthenticationComponent } from './authentication/authentication.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  username: string | null = '';
  guestname = 'GuestName';
  routeParamsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private auth: AuthService
  ) {
    this.routeParamsSub = this.route.queryParams.subscribe((params) => {
      if (params['auth']) {
        this.openAuthDialog(params['auth']);
      }
    });
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('user');
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  onLogout() {
    this.auth.signOut();
  }

  openAuthDialog(params: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { auth: params };

    const dialogRef = this.dialog.open(AuthenticationComponent, dialogConfig);
  }
}
function AuthComponent(AuthComponent: any, dialogConfig: MatDialogConfig<any>) {
  throw new Error('Function not implemented.');
}
