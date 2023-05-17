import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamplesRoutingModule } from '@app/yourapp/examples/examples-routing.module';
import { DrawerExampleComponent } from '@app/yourapp/examples/drawer/drawer.example.component';
import { PanelModule } from '@uimf/uitk/components/panel';
import { IconFontModule } from '@uimf/uitk/components/icon-font';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ExamplesRoutingModule,
    PanelModule,
    IconFontModule,
    SharedModule
  ],
  declarations: [DrawerExampleComponent]
})
export class ExamplesModule {}
