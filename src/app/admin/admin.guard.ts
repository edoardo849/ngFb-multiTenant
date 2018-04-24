import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoggerService } from '../core/logger/logger.service';

import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private _logger: LoggerService) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    const url: string = state.url;

    return this.auth.user$
      .take(1)
      .map(user => !!user)
      .do(loggedIn => {
        const uid = route.queryParamMap.get('uid');
        const orgUid = route.paramMap.get('organisationUid');

        if (!loggedIn || !this.auth.isSuperAdmin(this.auth.userData)) {
          console.log('access denied');
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      });
  }

  checkLogin(url: string): boolean {
    const isLoggedIn = this.auth.isLoggedIn;
    this._logger.log(`User is logged in: ${isLoggedIn}`);
    return isLoggedIn;
  }
}
