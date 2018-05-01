import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { User } from '../core/user';

// imports for firestore
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';
// import not working... import 'rjxs/add/operator/map';

// TODO fix error on add user action - review interface/class
// structure and how form is built

interface NewUser {
  email: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(private _afs: AngularFirestore) {}

  ngOnInit() {}

  addUser() {
    this._afs.collection('newUsers').add({ email: this.email });
  }
}
