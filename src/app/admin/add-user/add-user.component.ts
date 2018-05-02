import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { User, NewUser } from '../../core/user';
import { LoggerService } from '../../core/logger/logger.service';

// imports for firestore
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';
// import not working... import 'rjxs/add/operator/map';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  form: FormGroup; // declare instance of formGroup

  constructor(private _afs: AngularFirestore, private _log: LoggerService) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      displayName: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      roles: new FormControl('', [Validators.required])
      // ^^ TODO: change form to dropdown to force validity of role
    });
  }

  // TODO: make validators work - add error checks

  getEmailErrorMessage() {
    const field = this.form.controls.email;
    return field.hasError('required')
      ? 'You must enter a value'
      : field.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  getNameErrorMessage() {
    const field = this.form.controls.displayName;
    return field.hasError('required') ? 'You must enter a value' : '';
  }

  getRoleErrorMessage() {
    const field = this.form.controls.roles;
    return field.hasError('required') ? 'You must select a value' : '';
  }

  addUser() {
    this._log.log('Attempting to add new user (admin)');
    // TODO: alert user that creation is in progress
    const formValues = this.form.controls;
    return this._afs
      .collection<NewUser>('newUsers')
      .add({
        email: formValues.email.value,
        displayName: formValues.displayName.value,
        roles: formValues.roles.value
      })
      .then(response => {
        this._log.log(response);

        const newUserUid: User['uid'] = response.id;
        this._log.log(`New user created with uid: ${newUserUid}`);
        // TODO: alert user that acc created
      })
      .catch(err => {
        // alert(ERROR!)
        this._log.warn(err);
      });

    // if the "write" operation was succesful, show a message and log
    // if the "wirte " op was not succesfful, then console error and show dialog
    // ^^ e.g. when offline, slow network (timeout 40x returned by FB)
  }
}
