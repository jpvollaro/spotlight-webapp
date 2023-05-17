import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YourappRoutingModule } from '@app/yourapp/yourapp-routing.module';
import { AboutComponent } from '@app/yourapp/about/about.component';
import { HomeComponent } from '@app/yourapp/home/home.component';

@NgModule({
  imports: [CommonModule, YourappRoutingModule],
  declarations: [HomeComponent, AboutComponent]
})
export class YourappModule {}
