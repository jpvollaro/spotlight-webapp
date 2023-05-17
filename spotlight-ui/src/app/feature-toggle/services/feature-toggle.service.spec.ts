import { TestBed, inject } from '@angular/core/testing';

import { FeatureToggleService } from './feature-toggle.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FeatureToggleService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeatureToggleService]
    })
  );

  it('should be created', inject(
    [FeatureToggleService],
    (service: FeatureToggleService) => {
      expect(service).toBeTruthy();
    }
  ));
});
