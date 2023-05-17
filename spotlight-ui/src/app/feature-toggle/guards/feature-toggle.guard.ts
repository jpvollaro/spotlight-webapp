import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate
} from '@angular/router';
import { FeatureToggleService } from '@app/feature-toggle/services/feature-toggle.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleGuard implements CanActivate {
  constructor(private featureToggleService: FeatureToggleService) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> | boolean {
    // Get the name of the feature from the route data provided
    const featureName = route.data['featureToggle'];
    const featureNames: string[] = route.data['anyFeatureFlags'];
    if (this.featureToggleService.initialized) {
      if (featureName) {
        return this.featureToggleService.featureOn(featureName);
      } else if (featureNames && featureNames.length > 0) {
        return this.featureToggleService.anyFeatureOn(featureNames);
      }
      return true; // no feature supplied for this route
    }
  }
}
