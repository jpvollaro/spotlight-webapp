import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@app/core/services/notification.service';
import { Forecast } from '@app/yourapp/weather/models/forcast.model';
import { ForcastDay } from '@app/yourapp/weather/models/forcastday.model';
import { WeatherService } from '@app/yourapp/weather/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  zipCode: string;
  weather: string;
  errorMessage: string;
  forecast: Forecast;
  currentForecast: Forecast;
  selectedDay: ForcastDay;
  data: any;
  private weekday = new Array<String>();
  zipCodeForm: FormGroup;
  displayDialog = false;

  constructor(
    private weatherService: WeatherService,
    private notificationService: NotificationService,
    private vRef: ViewContainerRef,
    fb: FormBuilder
  ) {
    this.zipCodeForm = fb.group({
      zipCode: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]{5}')
        ])
      ]
    });
  }

  ngOnInit() {
    this.weekday = new Array<String>();
    this.weekday[0] = 'Monday';
    this.weekday[1] = 'Tuesday';
    this.weekday[2] = 'Wednesday';
    this.weekday[3] = 'Thursday';
    this.weekday[4] = 'Friday';
    this.weekday[5] = 'Saturday';
    this.weekday[6] = 'Sunday';
  }

  getWeather(value: any) {
    this.errorMessage = '';
    this.weatherService.getForcastByZip(value.zipCode).subscribe(
      data => {
        this.notificationService.showSuccess('Good Job', [
          'You successfully connected to an weather API'
        ]);
        this.forecast = data;
      },
      error => {
        this.errorMessage = error;
        this.notificationService.showError('error', [this.errorMessage]);
      }
    );
  }

  mockBadCall(event) {
    event.preventDefault();
    this.weatherService.mockBadCall().subscribe(
      data => {},
      error => {
        this.notificationService.showError('404', ['404 Simualtion']);
      }
    );
  }

  onRowSelect(event) {
    this.selectedDay = event.data;
    this.displayDialog = true;
  }

  selectData(event) {
    this.selectedDay = this.forecast.days[event.element._index];
    this.displayDialog = true;
  }
}
