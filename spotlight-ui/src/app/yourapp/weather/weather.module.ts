import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { TableModule } from '@uimf/uitk/components/tables';
import { PanelModule } from '@uimf/uitk/components/panel';
import { ButtonModule } from '@uimf/uitk/components/button';
import { WeatherService } from '@app/yourapp/weather/services/weather.service';

@NgModule({
  imports: [
    CommonModule,
    WeatherRoutingModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    PanelModule
  ],
  declarations: [WeatherComponent],
  providers: [WeatherService]
})
export class WeatherModule {}
