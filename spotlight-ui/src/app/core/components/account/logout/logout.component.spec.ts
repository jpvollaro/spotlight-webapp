import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from '@app/core/services/auth.service';
import { RouterTestingModule } from '../../../../../../node_modules/@angular/router/testing';
import { LogoutComponent } from '@app/core/components/account/logout/logout.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  class MockAuthService {
    logout() {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useClass: MockAuthService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
