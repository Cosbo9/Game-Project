import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  hide = true;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(data: NgForm) {
    console.log(data.value)
    // just need to create auth service and pass in data.value
  }
}
