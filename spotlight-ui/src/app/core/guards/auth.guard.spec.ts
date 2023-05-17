import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@app/core/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';

describe('AuthGuard', () => {
  class MockAuthService {
    isAuthenticated() {
      return false;
    }
  }
  class MockRouter {
    navigate(args: any[]): void {}
  }

  let authGuard: AuthGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    });
    authGuard = TestBed.get(AuthGuard);
    authService = TestBed.get(AuthService);
  });

  it('should ...', () => {
    expect(authGuard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('it should return true if user is authenticated', () => {
      const authSpy = spyOn(authService, 'isAuthenticated').and.returnValue(
        true
      );
      const result = authGuard.canActivate(null, null);
      expect(result).toBeTruthy();
    });

    it('it should return true if user is authenticated', () => {
      const authSpy = spyOn(authService, 'isAuthenticated').and.returnValue(
        false
      );
      const result = authGuard.canActivate(null, null);
    });
  });
});
