import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  signUp: boolean = false;
  signIn: boolean = false;
  authType: any;

  authForm = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null),
    // 'passwordConfirm': new FormControl(null)
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AuthenticationComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: any,
    private auth: AuthService
  ) {
    this.authType = dialogData.auth;
    if (dialogData.auth == 'sign_up') {
      this.signUp = true;
    } else if (dialogData.auth == 'sign_in') {
      this.signIn = true;
    }
  }

  ngOnInit(): void {}

  submitDialog(formData: any) {
    let mergedData = { ...formData.value, auth: this.authType };
    this.dialogRef.close(mergedData);
    this.router.navigate([], { relativeTo: this.route });
    this.signUp = false;
    this.signIn = false;
  }

  closeDialog() {
    this.dialogRef.close();
    this.router.navigate([], { relativeTo: this.route });
    this.signUp = false;
    this.signIn = false;
  }

  onSignUp(data: any) {
    this.auth.signUp({ user: data.value }).subscribe((res: any) => {
      const user = res.body.data.email.split('@')[0];
      const token = res.headers.get('Authorization')!;
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
      this.closeDialog();
    });
  }

  onSignIn(data: any) {
    this.auth.signIn({ user: data.value }).subscribe((res: any) => {
      const user = res.body.data.email.split('@')[0];
      const token = res.headers.get('Authorization')!;
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);
      this.closeDialog();
      console.log(res);
    });
  }
}
