import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { LoggerService } from '../core/logger/logger.service';

// TODO add non-auth user filter

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private _router: Router,
    public auth: AuthService,
    private _logger: LoggerService
  ) {}

  ngOnInit() {}
  navigateTo(location) {
    this._router.navigate([location]);
  }
}
