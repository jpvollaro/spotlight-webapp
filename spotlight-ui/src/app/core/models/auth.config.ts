import { AuthConfig } from 'angular-oauth2-oidc';

import { environment } from '@env/environment';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  loginUrl: environment.oauth.loginUrl,

  issuer: environment.oauth.issuer,

  // URL of the SPA to redirect the user to after login
  redirectUri: environment.oauth.redirectUri,

   // URL of the SPA to redirect the user after silent refresh
   silentRefreshRedirectUri: environment.oauth.silentRefreshUri,

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: environment.oauth.clientId,

  // set the scope for the permissions the client should request
  scope: environment.oauth.scope,

  responseType: environment.oauth.responseType,

  customQueryParams: {acr_values: environment.oauth.acr_values},
  // requireHttps: false,
  oidc: true
};
