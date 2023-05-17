// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` or `ng build --prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  application_name: 'Your App Name',
  name: 'local',
  isLocal: false,
  isTest: true,
  production: false,
  navigationMode: 'top',
  weatherApi: 'http://api.openweathermap.org/data/2.5/',
  weatherApiKey: '846976aa2e9484b3cc5f36157c8fc054',
  notification: {
    position: 'relative',
    messageRole: 'alertdialog',
    closeButton: true,
    animationType: 'fadeAnimation',
    autoClose: true,
    messageVisibleTime: '5000',
    animationTime: '.5'
  },
  oauth: {
    issuer: 'https://ssoiamcorp-nonprod.uhg.com',
    loginUrl: 'https://ssoiamcorp-nonprod.uhg.com/as/authorization.oauth2',
    logoutUrl: 'https://ssoiamcorp-nonprod.uhg.com/idp/startSLO.ping',
    redirectUri: '<your base url>',
    silentRefreshUri: '<your base url>/silent-refresh.html',
    clientId: '<enter your client id>',
    responseType: 'id_token token',
    scope: 'openid profile address email phone',
    acr_values: 'AAL1_MS-AD-Kerberos',
    autoRefresh: true
  },
  idleTimeout: 900
};
