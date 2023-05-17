import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  OAuthService,
  UrlHelperService,
  OAuthModule
} from 'angular-oauth2-oidc';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@env/environment';
import { InjectionToken } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { TokenService } from '@app/core/services/token.service';
import { LocationService } from '@app/core/services/location.service';

const WINDOW = new InjectionToken('window');
function getWindow() {
  return window;
}

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        OAuthModule.forRoot()
      ],
      providers: [
        AuthService,
        TokenService,
        OAuthService,
        UrlHelperService,
        { provide: WINDOW, useFactory: getWindow },
        LocationService
      ]
    });
    const user = { userName: 'testUser' };
    localStorage.setItem('user', JSON.stringify(user));
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  describe('login', () => {
    it('should call init when not local', inject(
      [AuthService, OAuthService],
      (service: AuthService, oauthService: OAuthService) => {
        const spy = spyOn(oauthService, 'initImplicitFlow');
        service.login();
        expect(spy).toHaveBeenCalled();
      }
    ));
  });

  describe('logout', () => {
    it('should clear session', inject([AuthService], (service: AuthService) => {
      const locationService = TestBed.get(LocationService);
      const locationSpy = spyOn(locationService, 'go').and.callFake(() => {});
      service.logout();
      expect(service.user).toBeNull();
      expect(locationSpy).toHaveBeenCalled();
    }));
  });

  describe('isAuthenticated', () => {
    it('should return true if user exists', inject(
      [AuthService],
      (service: AuthService) => {
        service.user = { name: 'test' };
        const actual = service.isAuthenticated();
        expect(actual).toBeTruthy();
      }
    ));
    it('should return false if user exists without username', inject(
      [AuthService],
      (service: AuthService) => {
        sessionStorage.setItem(service.USER_KEY, null);
        service.user = {};
        const actual = service.isAuthenticated();
        expect(actual).toBeFalsy();
      }
    ));
    it('should return false if user does not exists', inject(
      [AuthService],
      (service: AuthService) => {
        sessionStorage.setItem(service.USER_KEY, null);
        service.user = null;
        const actual = service.isAuthenticated();
        expect(actual).toBeFalsy();
      }
    ));
    it('should return true if user is empty and sessionStorage has user object', inject(
      [AuthService],
      (service: AuthService) => {
        service.user = {};
        sessionStorage.setItem(
          service.USER_KEY,
          JSON.stringify({ name: 'testUser ' })
        );
        const actual = service.isAuthenticated();
        expect(actual).toBeTruthy();
      }
    ));
    it('should return true if user is null and sessionStorage has user object', inject(
      [AuthService],
      (service: AuthService) => {
        service.user = null;
        sessionStorage.setItem(
          service.USER_KEY,
          JSON.stringify({ name: 'testUser ' })
        );
        const actual = service.isAuthenticated();
        expect(actual).toBeTruthy();
      }
    ));
  });

  describe('current', () => {
    it('should return current user', inject(
      [AuthService],
      (service: AuthService) => {
        service.user = { userName: 'test' };
        service.current().subscribe(user => {
          expect(user.userName).toEqual('test');
        });
      }
    ));
  });
});
