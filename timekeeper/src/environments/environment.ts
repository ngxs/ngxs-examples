// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBVXkXoYrAdWO2EYtHApG_kaOLAzInz79o',
    authDomain: 'ngxs-example.firebaseapp.com',
    databaseURL: 'https://ngxs-example.firebaseio.com',
    projectId: 'ngxs-example',
    storageBucket: 'ngxs-example.appspot.com',
    messagingSenderId: '662597598810',
  }
};
