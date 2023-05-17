export const environment = {
  application_name: 'Your App Name',
  name: 'prod',
  isLocal: false,
  production: true,
  navigationMode: 'side',
  weatherApi : 'http://api.openweathermap.org/data/2.5/',
  weatherApiKey : '846976aa2e9484b3cc5f36157c8fc054',
  notification : {
    position: 'relative',
    messageRole: 'alertdialog',
    closeButton: true,
    animationType: 'fadeAnimation',
    autoClose: true,
    messageVisibleTime: '10000',
    animationTime: '.5'
  },
  oauth: {
    issuer: 'https://ssoiamcorp.uhg.com',
    loginUrl: 'https://ssoiamcorp.uhg.com/as/authorization.oauth2',
    logoutUrl: 'https://ssoiamcorp.uhg.com/idp/startSLO.ping',
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
