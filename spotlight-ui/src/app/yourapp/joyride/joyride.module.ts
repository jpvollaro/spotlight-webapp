import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoyrideModule } from 'ngx-joyride';
import { JoyrideComponent } from '@app/yourapp/joyride/joyride.component';
import { JoyrideRoutingModule } from '@app/yourapp/joyride/joyride-routing.module';

@NgModule({
  imports: [CommonModule, JoyrideRoutingModule, JoyrideModule.forChild()],
  declarations: [JoyrideComponent]
})
export class JoyrideSampleModule {}
