import { TestBed, inject } from '@angular/core/testing';

import { FeatureConfig } from './feature-config.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FeatureConfigService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeatureConfig]
    })
  );

  it('should be created', () => {
    const service: FeatureConfig = TestBed.get(FeatureConfig);
    expect(service).toBeTruthy();
  });

  it('should be created', inject([FeatureConfig], (service: FeatureConfig) => {
    expect(service).toBeTruthy();
  }));
});
