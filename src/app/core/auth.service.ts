import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { LoggerService } from './logger/logger.service';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { User, LoggedInUser } from './user';
// import { Organisation } from '../organisation';

import { FirestoreService } from './firestore.service';

@Injectable()
export class AuthService {
  user$: Observable<User>;
  userData: User;

  isLoggedIn = false;
  loginHasError: boolean;
  loginErrorMessage: string;

  constructor(
    private _afAuth: AngularFireAuth,
    private _logger: LoggerService,
    private _router: Router,
    private _db: FirestoreService
  ) {
    // this.signOut();
    //// Get auth data, then get firestore user document || null
    this.user$ = this._afAuth.authState.switchMap(user => {
      if (user) {
        this.isLoggedIn = true;
        return this._db
          .doc<User>(`users/${user.uid}`)
          .valueChanges()
          .do(data => (this.userData = data));
      } else {
        this.isLoggedIn = false;
        return Observable.of(null);
      }
    });
  }

  login(email: string, password: string) {
    this._logger.info(`Signing in user ${email}`);
    this.resetLoginError();
    return this._afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this._logger.info(`User ${credential.uid} signed in`);
        // no update, this is stupid
        // grab user id, we access the user/{id} doc
        // we check the mustResetPassword field
        // if true, redirect user to
        // reset-password FORM, there you
        // are setting the user password again.

        this._updateUserData(credential)
          .then(() => {
            const navigationExtras: NavigationExtras = {
              queryParams: { uid: credential.uid },
              preserveFragment: true
            };
            this._router.navigate(['/home'], navigationExtras);
          })
          .catch(error => {
            this.handleLoginError(error);
          });
      })
      .catch(error => {
        this.handleLoginError(error);
      });
  }

  private resetLoginError() {
    this.loginHasError = false;
    this.loginErrorMessage = '';
  }

  private handleLoginError(error) {
    this._logger.error(`login error`, error);
    this.loginHasError = true;
    this.loginErrorMessage = error;
  }

  // BUG is here, update user, then fetch it again
  // from the database.
  private _updateUserData(authCredentials: AuthCredentials): Promise<void> {
    const userRef: AngularFirestoreDocument<LoggedInUser> = this._db.doc(
      `users/${authCredentials.uid}`
    );

    const data: LoggedInUser = {
      signedIn: this._db.timestamp
    };

    return userRef.set(data, { merge: true });
  }

  createUser(email: string, password: string): Promise<any> {
    this._logger.log('Creating a new user to the Auth Service');
    return this._afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signOut() {
    this._logger.log(`Signing out the user`);

    this._afAuth.auth.signOut().then(() => {
      this._logger.log('The user was signed out');
      this.isLoggedIn = false;
      this.userData = null;
      this._router.navigate(['/login']);
    });
  }

  ///// Role-based Authorization //////
  // https://angularfirebase.com/lessons/role-based-authorization-with-firestore-nosql-and-angular-5/

  canRead(user: User): boolean {
    const allowed = ['isAdmin', 'isEditor', 'isSubscriber', 'isSuperAdmin'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['isAdmin', 'isEditor', 'isSuperAdmin'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    return this.isAdmin(user);
  }

  isAdmin(user: User): boolean {
    const allowed = ['isAdmin', 'isSuperAdmin'];
    return this.checkAuthorization(user, allowed);
  }

  isSuperAdmin(user: User): boolean {
    const allowed = ['isSuperAdmin'];
    return this.checkAuthorization(user, allowed);
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }
}

export interface AuthCredentials {
  email: string;
  uid: string;
}
