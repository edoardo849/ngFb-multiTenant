import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { AuthService } from '../core/auth.service'

import { LoggerService } from '../core/logger/logger.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', [Validators.required]);

  hidePassword = true;

  constructor(

    public auth: AuthService,
    private _logger: LoggerService
  ) { }

  ngOnInit() {
    if (this.auth.isLoggedIn) {
      this.auth.signOut();
    }

  }
}
