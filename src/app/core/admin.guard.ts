import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';
import { isAbsolute } from 'path';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private _auth: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this._auth.user$.pipe(
      take(1),
      map(user => user && user.roles.isAdmin ? true : false),
      tap(isAdmin => {
        if (!isAdmin) {
          console.error('Access denied - Admins Only')
        }
      })
    )
  }
}
