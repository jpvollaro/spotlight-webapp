import {
  HttpClientModule,
  HttpClient,
  HttpRequest,
  HttpParams
} from '@angular/common/http';
import { TestBed, tick, async, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { WeatherService } from '@app/yourapp/weather/services/weather.service';

describe('WeatherService', () => {
  const MockForecast = {
    city: {
      id: 0,
      name: 'Lima',
      coord: {
        lon: -84.1459,
        lat: 40.7399
      },
      country: 'US',
      population: 0
    },
    cod: '200',
    message: 0.1124246,
    cnt: 16,
    list: [
      {
        dt: 1497373200,
        temp: {
          day: 71.6,
          min: 63.99,
          max: 71.6,
          night: 63.99,
          eve: 71.6,
          morn: 71.6
        },
        pressure: 995.95,
        humidity: 50,
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d'
          }
        ],
        speed: 3.94,
        deg: 273,
        clouds: 64,
        rain: 1.69
      },
      {
        dt: 1497373200,
        temp: {
          day: 71.6,
          min: 63.99,
          max: 71.6,
          night: 63.99,
          eve: 71.6,
          morn: 71.6
        },
        pressure: 995.95,
        humidity: 50,
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d'
          }
        ],
        speed: 3.94,
        deg: 273,
        clouds: 64,
        rain: 1.69
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // no more boilerplate code w/ custom providers needed :-)
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [WeatherService]
    });
  });

  afterEach(inject(
    [HttpTestingController],
    (backend: HttpTestingController) => {
      backend.verify();
    }
  ));

  describe('Get Forcast By Zip', () => {
    const mockResponse = JSON.stringify(MockForecast);
    // 1. declare as async test since the HttpClient works with Observables
    it('Should call Weather API url: http://api.openweathermap.org/data/2.5/forecast/daily?zip=', async(
      // 2. inject HttpClient and HttpTestingController into the test
      inject(
        [HttpClient, HttpTestingController],
        (http: HttpClient, backend: HttpTestingController) => {
          // 3. send a simple request
          http
            .get('http://api.openweathermap.org/data/2.5/forecast/daily?zip=')
            .subscribe();

          // 4. HttpTestingController supersedes `MockBackend` from the "old" Http package
          // here two, it's significantly less boilerplate code needed to verify an expected request
          backend.expectOne({
            url: 'http://api.openweathermap.org/data/2.5/forecast/daily?zip=',
            method: 'GET'
          });
        }
      )
    ));

    it('Should call toForecast', async(
      inject(
        [WeatherService, HttpTestingController],
        (service: WeatherService, backend: HttpTestingController) => {
          service.getForcastByZip('45805').subscribe(result => {
            const spy = spyOn(service, 'toForecast').and.callThrough();
            expect(spy.calls.any()).toBe(true, 'toForecast was called');
          });

          backend.expectOne((req: HttpRequest<any>) =>
            req.url.startsWith(
              'http://api.openweathermap.org/data/2.5/forecast'
            )
          );
        }
      )
    ));
  });

  describe('toForecast', () => {
    it('should return null if Response is null', async(
      inject(
        [WeatherService, HttpTestingController],
        (service: WeatherService, backend: HttpTestingController) => {
          const actual = service.toForecast(null);
          expect(actual).toBeNull();
        }
      )
    ));

    it('should return a valid object if Response is valid', async(
      inject(
        [WeatherService, HttpTestingController],
        (service: WeatherService, backend: HttpTestingController) => {
          const forecast = service.toForecast(MockForecast);
          expect(forecast).not.toBeNull();
          expect(forecast.city).toEqual('Lima');
        }
      )
    ));
  });

  describe('mockBadCall', () => {
    it('should return 404', async(
      inject(
        [WeatherService, HttpTestingController],
        (service: WeatherService, backend: HttpTestingController) => {
          let errorMessage: string;
          service.mockBadCall().subscribe(
            data => {},
            error => {
              errorMessage = error;
            }
          );

          expect(errorMessage).not.toBeNull();
        }
      )
    ));
  });
});
