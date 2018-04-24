import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { LoggerService } from './logger/logger.service';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { User } from './user';
//import { Organisation } from '../organisation';

import { FirestoreService } from './firestore.service';

@Injectable()
export class AuthService {

  user$: Observable<User>;
  userData: User;

  isLoggedIn = false;
  loginHasError: boolean;
  loginErrorMessage: string;

  constructor(
    private afAuth: AngularFireAuth,
    private _logger: LoggerService,

    private router: Router,
    private db: FirestoreService,

  ) {
    // this.signOut();
    //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          this.isLoggedIn = true;
          return this.db.doc<User>(`users/${user.uid}`)
            .valueChanges()
            .do(data => this.userData = data);
        } else {
          this.isLoggedIn = false;
          return Observable.of(null);
        }
      });
  }

  login(email: string, password: string) {
    this._logger.info(`Signing in user ${email}`);
    this.resetLoginError();
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((credential) => {
        this._logger.info(`User ${credential.uid} signed in`);
        this._updateUserData(credential).then(() => {
          const navigationExtras: NavigationExtras = {
            queryParams: { 'uid': credential.uid },
            preserveFragment: true
          };
          this.router.navigate(['/home'], navigationExtras);
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
    this.loginHasError = true;
    this.loginErrorMessage = error;
  }

  // BUG is here, update user, then fetch it again
  // from the database.
  private _updateUserData(user): Promise<void> {

    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      signedIn: this.db.timestamp
    };

    return userRef.set(data, { merge: true });
  }

  createUser(email: string, password: string): Promise<any> {
    this._logger.log('Creating a new User to the Auth Service');
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signOut() {
    this._logger.log(`Signing out the user`);

    this.afAuth.auth.signOut().then(() => {
      this._logger.log('The user was signed out');
      this.isLoggedIn = false;
      this.userData = null;
      this.router.navigate(['/login']);
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
    if (!user) { return false; }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }

}
