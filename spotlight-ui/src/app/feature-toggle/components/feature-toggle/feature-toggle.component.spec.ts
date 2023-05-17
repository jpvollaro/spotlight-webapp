import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureToggleComponent } from './feature-toggle.component';
import { ToggleSwitchModule, ButtonModule } from '@uimf/uitk';
import { AuthService } from '@app/core/services/auth.service';
import { FeatureToggleService } from '@app/feature-toggle/services/feature-toggle.service';
import { NotificationService } from '@app/core/services/notification.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  OAuthModule,
  OAuthService,
  UrlHelperService
} from 'angular-oauth2-oidc';
import { TokenService } from '@app/core/services/token.service';
import { InjectionToken } from '@angular/core';
import { LocationService } from '@app/core/services/location.service';
import { FeatureConfig } from '@app/feature-toggle/services/feature-config.service';
import { IFeatureConfig } from '@app/feature-toggle/models/feature.config';

const WINDOW = new InjectionToken('window');
function getWindow() {
  return window;
}

describe('FeatureToggleComponent', () => {
  class MockFeatureConfig {
    static settings: IFeatureConfig = {
      features: {
        toggleInterface: true,
        breadcrumb: false
      }
    };
  }

  let component: FeatureToggleComponent;
  let fixture: ComponentFixture<FeatureToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureToggleComponent],
      imports: [
        ToggleSwitchModule,
        ButtonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        OAuthModule.forRoot()
      ],
      providers: [
        FeatureToggleService,
        NotificationService,
        AuthService,
        TokenService,
        OAuthService,
        UrlHelperService,
        { provide: FeatureConfig, useClass: MockFeatureConfig },
        { provide: WINDOW, useFactory: getWindow },
        LocationService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
