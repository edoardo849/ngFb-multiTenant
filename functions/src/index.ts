import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// not required because ^ ? // var admin = require('firebase-admin');

const serviceAccount = require('../ngfb-multitenant-firebase-adminsdk-yckoa-3a95250696.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ngfb-multitenant.firebaseio.com'
});

// uncomment for cloud Fn // admin.initializeApp(functions.config().firebase);

export interface NewUser {
  email: string;
  displayName: string;
  roles: string;
  password: string;
}

// var data = require('./test/newUser'); onNewUserCreate(data) <--TODO: add to README
export const onNewUserCreate = functions.firestore
  .document('newUsers/{userId}')
  .onCreate(event => {
    const user = event.data() as NewUser;

    console.log('User is:', event.id);
    const newUser: admin.auth.CreateRequest = {
      email: user.email,
      displayName: user.displayName,
      password: 'Password123',
      uid: event.id
    };
    return admin
      .auth()
      .createUser(newUser)
      .then(
        res => {
          console.log('The user logged created with userId', res.uid);
        }
        // On Firebase...
        // When Firebase detects a newUser creation
        // Triggers the function
        // Passing in the function's event the data
        // of the newly created object
        // you MUST return a Promise
      );
  });
