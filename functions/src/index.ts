import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// not required because ^ ? // var admin = require('firebase-admin');

// const serviceAccount = require('../ngfb-multitenant-firebase-adminsdk-yckoa-3a95250696.json');

admin.initializeApp(functions.config().firebase);

export interface NewUser {
  email: string;
  displayName: string;
  roles: string;
  password: string;
  uid?: string; // comment when in production
}

export const helloWorld = functions.https.onRequest((request, response) => {
  const method = request.method;

  response.send(
    `Hello from Firebase!, Method: ${method}, Payload: ${request.params.email}`
  );
});

// https function is synchronous....
// when creating a new User from Angular, we call the https link
// of our cloud function, we send POST data with the password (auth)
// that the admin has set for the user
// then, we will send back the newly created user UID
// and we can handle from here (function) the creation
// of the user record.

// var data = require('./test/newUser-1'); onNewUserCreate(data); <--TODO: add to README
export const onNewUserCreate = functions.firestore
  .document('users/{userId}')
  .onCreate(userSnapshot => {
    const user = userSnapshot.data() as NewUser;

    const userUid: string = userSnapshot.id;

    console.log('Detected new user creation in Firestore with uid: ', userUid);
    const newUser: admin.auth.CreateRequest = {
      email: user.email,
      displayName: user.displayName,
      password: 'Password123',
      // uid: userUid <- uncomment when in production
      uid: user.uid + Math.random() // comment when in prod
    };

    const auth = admin.auth();

    return auth
      .createUser(newUser)
      .then(res => {
        // On Firebase...
        // When Firebase detects a newUser creation
        // Triggers the function
        // Passing in the function's event the data
        // of the newly created object
        // you MUST return a Promise
        console.log('New auth user created with userId', res.uid);
        // create Token
        // auth.createCustomToken(res.uid)
        // save the token into the user object in the users/userId col
        // send
      })
      .catch(err => console.error('could not create user in auth', err));
    // password reset email
  });

// password reset email
