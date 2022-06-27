import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  hide = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(data: NgForm) {
    console.log(data.value)
    // just need to create auth service and pass in data.value
  }
}
