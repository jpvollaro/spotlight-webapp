import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Forecast } from '@app/yourapp/weather/models/forcast.model';
import { ForcastDay } from '@app/yourapp/weather/models/forcastday.model';

@Injectable()
export class WeatherService {

  private key = environment.weatherApiKey;
  private url = `${environment.weatherApi}weather?zip=`;
  private forcast = `${environment.weatherApi}forecast/daily?zip=`;

  constructor(private http: HttpClient) { }

  getForcastByZip(zipCode: string) {
      return this.http.get(`${this.forcast}${zipCode},us&cnt=16&appid=${this.key}&units=imperial`).pipe(
        map(responseData => responseData),
        map(data => this.toForecast(data))
      );
  }

  mockBadCall() {
    return Observable.create(observer => {
      observer.error(new Error('404'));
      observer.complete();
    });
  }

  toForecast(data: any): Forecast {
    if (null === data) {
      return null;
    }
    const forcast = new Forecast();
          forcast.city = data.city.name;
          forcast.country = data.city.country;
          forcast.population = data.city.population;
          forcast.days = new Array();
          for (let i = 0; i < data.list.length; i++) {
            const day = new ForcastDay();
            day.clouds = data.list[i].clouds;
            day.dateTime = data.list[i].dt;
            day.dayTemp = data.list[i].temp.day;
            day.eveningTemp = data.list[i].temp.eve;
            day.humidity = data.list[i].humidity;
            day.maxTemp = data.list[i].temp.max;
            day.minTemp = data.list[i].temp.min;
            day.nightTemp = data.list[i].temp.night;
            day.pressure = data.list[i].pressure;
            day.weatherDescription = data.list[i].weather[0].description;
            day.weatherMain = data.list[i].weather[0].main;
            day.windSpeed = data.list[i].speed;
            forcast.days.push(day);
          }
          return forcast;
  }
}
