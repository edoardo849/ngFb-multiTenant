import { userRecordConstructor } from 'firebase-functions/lib/providers/auth';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

var db = admin.firestore();

exports.createTempUser = functions.firestore

  .document('newUsers/{userId}')
  .onCreate(async (snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = snap.data();

    // perform desired operations ...
    console.log(newValue.name);

    // const tempUid = newValue.userId;

    admin
      .auth()
      .createUser({
        email: newValue.email,
        password: 'Password123',
        displayName: newValue.displayName,
        disabled: false
      })
      .then(function(userRecord) {
        console.log('Sucessfully created new Auth user:', userRecord.uid);
      })
      .catch(function(error) {
        console.log('Error creating new Auth user:', error);
      });

    return 0;
  });

// exports.sendPasswordResetEmail = functions.auth.user().onCreate(user => {
// TODO:
// });
