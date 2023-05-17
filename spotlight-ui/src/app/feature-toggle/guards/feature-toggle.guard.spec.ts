import { TestBed, async, inject } from '@angular/core/testing';

import { FeatureToggleGuard } from './feature-toggle.guard';
import { FeatureToggleService } from '@app/feature-toggle/services/feature-toggle.service';

describe('FeatureToggleGuard', () => {
  class MockFeatureToggleService {
    featureOn() {
      return false;
    }
  }

  let toggleGuard: FeatureToggleGuard;
  let toggleService: FeatureToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FeatureToggleGuard,
        { provide: FeatureToggleService, useClass: MockFeatureToggleService }
      ]
    });
    toggleGuard = TestBed.get(FeatureToggleGuard);
    toggleService = TestBed.get(FeatureToggleService);
  });

  it('should ...', () => {
    expect(toggleGuard).toBeTruthy();
  });
});
