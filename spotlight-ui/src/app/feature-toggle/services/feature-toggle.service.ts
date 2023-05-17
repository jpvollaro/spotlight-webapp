import { Injectable } from '@angular/core';
import { FeatureConfig } from '@app/feature-toggle/services/feature-config.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { of } from 'rxjs';

@Injectable()
export class FeatureToggleService {
  private _initialized = false;
  public apiPath = 'https://localhost:44306/api/'; // environment.coreApiPath;

  constructor(private _http: HttpClient) {}

  get initialized() {
    if (Object.keys(FeatureConfig.settings.features).length > 0) {
      this._initialized = true;
    }
    return this._initialized;
  }

  featureOff(featureName: string) {
    // Read the value from the config service
    if (FeatureConfig.settings.features.hasOwnProperty(featureName)) {
      return !FeatureConfig.settings.features[featureName];
    }
    return true; // if feature not found, default to turned off
  }

  featureOn(featureName: string) {
    const features = FeatureConfig.settings.features;
    if (features['*']) {
      return true;
    }
    return !this.featureOff(featureName);
  }

  anyFeatureOn(features: string[]) {
    return features.some(featureName => {
      if (!this.featureOff(featureName)) {
        return true;
      } else {
        return false;
      }
    });
  }

  updateFeatureData(appFeatures: any) {
    return of(true);
    // return this._http.post(this.apiPath + 'Feature/udpate', JSON.stringify(appFeatures));
  }
}
