// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
export const environment = {
  firebase: {
    projectId: 'mywines',
    appId: '1:194774243909:web:23d8eea47eeb10b6b6212c',
    storageBucket: 'mywines.appspot.com',
    apiKey: 'AIzaSyBN-y90hrCy3SbgB0YK7aLixSmptNIX40M',
    authDomain: 'mywines.firebaseapp.com',
    messagingSenderId: '194774243909',
  },
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBONgpaXT8A3bQVMtNwerT075ayZJUtpts',
      authDomain: 'ng-wine-app.firebaseapp.com',
      databaseURL: 'https://ng-wine-app.firebaseio.com',
      projectId: 'ng-wine-app',
      storageBucket: 'ng-wine-app.appspot.com',
      messagingSenderId: '344796102137'
  }
};