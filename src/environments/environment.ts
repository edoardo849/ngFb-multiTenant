// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  isDebugMode: true,

  firebase: {
    apiKey: 'AIzaSyA9NoT1b2vKkWx5WsECD1ZiXmLxckQLJHs',
    authDomain: 'ngfb-multitenant.firebaseapp.com',
    databaseURL: 'https://ngfb-multitenant.firebaseio.com',
    projectId: 'ngfb-multitenant',
    storageBucket: 'ngfb-multitenant.appspot.com',
    messagingSenderId: '105654261497'
    // projectId: // this may be needed for later versions of AngularFire
  }
};
