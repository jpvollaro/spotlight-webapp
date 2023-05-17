import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  mockToken: 'fdasfdsa3343214fdasf';
  readonly TOKEN_NAME = 'access_token';

  constructor() {
    localStorage.setItem(this.TOKEN_NAME, this.mockToken);
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  clearToken() {
    localStorage.removeItem(this.TOKEN_NAME);
  }

  setUser(user: any) {
    localStorage.setItem('user', user);
  }

}
