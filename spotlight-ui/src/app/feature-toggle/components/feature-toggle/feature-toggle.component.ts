import { Component, OnInit } from '@angular/core';
import { FeatureToggleService } from '@app/feature-toggle/services/feature-toggle.service';
import { NotificationService } from '@app/core/services/notification.service';
import { AuthService } from '@app/core/services/auth.service';
import { cloneDeep } from '@app/common/helpers/cloneDeep';
import { FeatureConfig } from '@app/feature-toggle/services/feature-config.service';
import { equalsDeep } from '@app/common/helpers/equalsDeep';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-feature-toggle',
  templateUrl: './feature-toggle.component.html',
  styleUrls: ['./feature-toggle.component.scss']
})
export class FeatureToggleComponent implements OnInit {
  public appFeatures: {
    [name: string]: boolean;
  };

  constructor(
    private featureToggleService: FeatureToggleService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.appFeatures = cloneDeep(FeatureConfig.settings.features);
  }

  ngOnInit() {}

  keys() {
    return Object.keys(this.appFeatures);
  }

  public handleToggleChange(event, featureName) {
    this.appFeatures[featureName] = event;
  }

  public submit() {
    if (!equalsDeep(this.appFeatures, FeatureConfig.settings.features)) {
      this.notificationService.showWarning('Warning', [
        'Once features are toggled, you will be logged out of system'
      ]);
      const objFeature = { features: this.appFeatures };
      this.featureToggleService
        .updateFeatureData(objFeature)
        .subscribe((response: any) => {
          if (
            response !== undefined &&
            response.result !== undefined &&
            response.result.data !== undefined &&
            response.result.data.length > 0 &&
            response.result.data[0]
          ) {
            this.notificationService.showSuccess('Success', [
              'Features toggled successfully'
            ]);
            let timerSub: Subscription;
            timerSub = timer(1000).subscribe(tick => {
              this.authService.logout();
              timerSub.unsubscribe();
            });
          }
        });
    }
  }
}
