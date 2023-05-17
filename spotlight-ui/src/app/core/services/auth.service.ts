import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, of } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '@env/environment';
import { LocationService } from '@app/core/services/location.service';

@Injectable()
export class AuthService {
  USER_KEY = 'id_token_claims_obj';
  authEvent = new Subject<any>();
  user: any = {};
  mockUser = {
    sub: 'isuser',
    give_name: 'Test',
    roles: ['admin'],
    name: 'isuser',
    family_name: 'User',
    email: 'test.user@optum.com',
    aud: 'uitk_dev',
    jti: 'gCGQSe8hydROoabrRUU1S4',
    iss: 'https://ssoiamcorp-nonprod.uhg.com',
    iat: 1538657433,
    exp: 1538652886,
    'pi.sri': 'cHWY5hzU-3Bo9lmN380fiz3XzzU',
    nonce: 'thisisanonce',
    acr: 'AAL1_MS-AD-Kerberos',
    auth_time: 1538657433,
    at_hash: 'xtvix87Pp6PBX9aWbXt5lA'
  };

  constructor(
    private router: Router,
    private oauthService: OAuthService,
    private locationService: LocationService
  ) {}

  public get location() {
    return location;
  }

  setUser(user: any) {
    this.user = { ...user };
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
    this.authEvent.next(this.user);
  }

  login() {
    if (environment.isLocal) {
      this.user = Object.assign(this.mockUser, this.user);
      this.setUser(this.user);
      this.router.navigate(['/']);
    } else {
      this.oauthService.initImplicitFlow();
    }
  }

  logout() {
    this.clearSession();
    this.locationService.go(environment.oauth.logoutUrl);
  }

  /**
   * Checks if user exists. If user is empty or null, then
   * will check if sessionStorage contains user object.
   * Returns boolean based of if user exists or sessionStorage
   * contains user object. (Allows for page refresh)
   * @param none
   * @returns boolean
   */
  isAuthenticated(): boolean {
    if (
      (!this.user && sessionStorage.getItem(this.USER_KEY)) ||
      (this.user &&
        Object.keys(this.user).length === 0 &&
        sessionStorage.getItem(this.USER_KEY))
    ) {
      const user = JSON.parse(sessionStorage.getItem(this.USER_KEY));
      this.user = { ...user };
    }
    return this.user && this.user.name ? true : false;
  }

  current() {
    if (this.user && this.user.userName) {
      return of(this.user);
    } else {
      return of(null);
    }
  }

  setUserSession(user) {}

  clearSession() {
    sessionStorage.clear();
    localStorage.clear();
    this.user = null;
    this.oauthService.logOut();
    this.authEvent.next(null);
  }
}
