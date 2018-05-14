import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoggerService } from './logger/logger.service';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _logger: LoggerService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    const url: string = state.url;

    return this._auth.user$
      .take(1)
      .map(user => !!user)
      .do(loggedIn => {
        if (!loggedIn) {
          this._logger.warn('Access denied');
          return this._router.navigate(['/login']);

        }
        return true;
      });
  }

  checkLogin(url: string): boolean {
    const isLoggedIn = this._auth.isLoggedIn;
    this._logger.log(`User is logged in: ${isLoggedIn}`);
    return isLoggedIn;
  }

}
