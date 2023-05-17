import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '../../../../node_modules/@angular/core';

import { BrowserAnimationsModule } from '../../../../node_modules/@angular/platform-browser/animations';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '../../../../node_modules/@angular/common/http/testing';
import { NotificationService } from '@app/core/services/notification.service';
import { of, throwError } from 'rxjs';

import { _throw } from 'rxjs/observable/throw';
import { WeatherComponent } from '@app/yourapp/weather/weather.component';
import { Forecast } from '@app/yourapp/weather/models/forcast.model';
import { ForcastDay } from '@app/yourapp/weather/models/forcastday.model';
import { WeatherService } from '@app/yourapp/weather/services/weather.service';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  const zipCode: string = null;
  const weather: string = null;
  const errorMessage: string = null;
  const forecast: Forecast = null;
  const currentForecast: Forecast = null;
  const data: any = null;

  let btnMock404;
  let btnMockDelete;
  let dtMockForecast;
  let chtMockForecast;

  class MockWeatherService {
    getForcastByZip(zip: string) {
      return this;
    }
    mockBadCall() {
      return this;
    }
  }

  let mockService: MockWeatherService;

  beforeEach(() => {
    mockService = new MockWeatherService();
    TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: WeatherService, useValue: mockService },
        MockBackend,
        BaseRequestOptions,
        Forecast,
        NotificationService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;

    btnMock404 = document.getElementById('btn404');
    btnMockDelete = document.getElementById('btnDelete');
    dtMockForecast = document.getElementById('dtForecast');
    chtMockForecast = fixture.debugElement.query(By.css('#chart'));
    fixture.detectChanges();
  });

  const mockForecast = new Forecast();
  mockForecast.city = 'test';
  mockForecast.country = 'test';
  mockForecast.population = 45;
  const mockDay = new ForcastDay();
  mockDay.clouds = 1;
  mockDay.dateTime = '1497373200';
  mockDay.dayTemp = '71.6';
  mockDay.eveningTemp = '67.5';
  mockDay.windSpeed = 3.94;

  mockForecast.days = new Array<ForcastDay>();
  mockForecast.days.push(mockDay);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getWeather', () => {
    it('should call weather api', () => {
      const weatherService = TestBed.get(WeatherService);
      const spy = spyOn(weatherService, 'getForcastByZip').and.returnValue(
        of({})
      );
      component.getWeather(12345);
      expect(spy).toHaveBeenCalled();
    });

    it('should call notificationService.showERROR() on error', () => {
      const weatherService = TestBed.get(WeatherService);
      const spy = spyOn(weatherService, 'getForcastByZip').and.returnValue(
        _throw('Error')
      );
      const notificationService = TestBed.get(NotificationService);
      const alertSpy = spyOn(
        notificationService,
        'showError'
      ).and.callThrough();
      component.getWeather(12345);
      expect(alertSpy).toHaveBeenCalled();
    });
  });

  describe('mockBadCall', () => {
    it('should call', () => {
      const weatherService = TestBed.get(WeatherService);
      const spy = spyOn(weatherService, 'mockBadCall').and.returnValue(of({}));
      component.mockBadCall({ preventDefault: () => {} });
      expect(spy).toHaveBeenCalled();
    });

    it('should call show error on error', () => {
      const weatherService = TestBed.get(WeatherService);
      const spy = spyOn(weatherService, 'mockBadCall').and.returnValue(
        _throw('Error')
      );
      const notificationService = TestBed.get(NotificationService);
      const alertSpy = spyOn(
        notificationService,
        'showError'
      ).and.callThrough();
      component.mockBadCall({ preventDefault: () => {} });
      expect(alertSpy).toHaveBeenCalled();
    });
  });

  describe('onRowSelect', () => {
    it('should set selectedDay with data object', () => {
      const fDay: ForcastDay = {
        dayTemp: '60'
      };
      const event = {
        data: fDay
      };
      component.onRowSelect(event);
    });
  });

  describe('selectData', () => {
    it('should set selectedDay with data object', () => {
      const fDay: ForcastDay = {
        dayTemp: '60'
      };
      const event = {
        element: {
          _index: fDay
        }
      };
      component.forecast = {
        days: []
      };
      component.selectData(event);
    });
  });
});
