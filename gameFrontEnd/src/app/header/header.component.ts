import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationComponent } from './authentication/authentication.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username = "UserName";
  guestname = "GuestName";
  routeParamsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.routeParamsSub = this.route.queryParams.subscribe(params => {
      if (params['auth']) {
        this.openAuthDialog(params['auth'])
      }
    })
   }

  ngOnInit(): void {
  }

  openAuthDialog(params: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {auth: params};

    const dialogRef = this.dialog.open(AuthenticationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data.auth == 'sign_in') {
        const authData = {
          session: {
            email: data.email,
            password: data.password
          }
        };
      }
      else if (data.auth == 'sign_up') {
        const authData = {
          user: {
            email: data.email,
            password: data.password
          }
        };
      }
    })
  }

}
function AuthComponent(AuthComponent: any, dialogConfig: MatDialogConfig<any>) {
  throw new Error('Function not implemented.');
}

