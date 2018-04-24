import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { AuthService } from '../core/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', [Validators.required]);

  constructor(

    public auth: AuthService,
  ) { }

  ngOnInit() {
    if (this.auth.isLoggedIn) {
      this.auth.signOut();
    }

  }
}
