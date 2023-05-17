import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit
} from '@angular/core';
import { FeatureToggleService } from '@app/feature-toggle/services/feature-toggle.service';

@Directive({
  selector: '[appFeatureToggle]'
})
export class FeatureToggleDirective implements OnInit {
  @Input() appFeatureToggle: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private featureToggleService: FeatureToggleService
  ) {}

  ngOnInit() {
    if (this.featureToggleService.featureOn(this.appFeatureToggle)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
