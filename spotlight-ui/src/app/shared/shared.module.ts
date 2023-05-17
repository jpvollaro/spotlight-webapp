import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from '@uimf/uitk/components/panel';
import { IconFontModule } from '@uimf/uitk/components/icon-font';
import { DrawerComponent } from '@app/shared/components/drawer/drawer.component';

@NgModule({
  declarations: [DrawerComponent],
  imports: [CommonModule, PanelModule, IconFontModule],
  exports: [DrawerComponent]
})
export class SharedModule {}
