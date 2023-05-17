import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleSwitchModule } from '@uimf/uitk/components/toggle-switch';

import { FeatureToggleComponent } from '@app/feature-toggle/components/feature-toggle/feature-toggle.component';
import { FeatureToggleService } from '@app/feature-toggle/services/feature-toggle.service';
import {
  FeatureConfig,
  loadConfiguration,
  loadConfigurationApi
} from '@app/feature-toggle/services/feature-config.service';
import { FeatureToggleDirective } from '@app/feature-toggle/directive/feature-toggle.directive';
import { ButtonModule } from '@uimf/uitk/components/button';

@NgModule({
  declarations: [FeatureToggleComponent, FeatureToggleDirective],
  imports: [CommonModule, ToggleSwitchModule, ButtonModule],
  providers: [
    FeatureToggleService,
    FeatureConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfiguration,
      deps: [FeatureConfig],
      multi: true
    }
  ],
  exports: [FeatureToggleDirective]
})
export class FeatureToggleModule {}
