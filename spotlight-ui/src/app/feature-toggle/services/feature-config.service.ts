import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { IFeatureConfig } from '@app/feature-toggle/models/feature.config';

@Injectable({
  providedIn: 'root'
})
export class FeatureConfig {
  static settings: IFeatureConfig;
  public apiPath = 'https://localhost:44306/api/'; // environment.coreApiPath;

  constructor(private _http: HttpClient) {}

  load() {
    const jsonFile = `assets/config/config.${environment.name}.json`;
    return new Promise<void>((resolve, reject) => {
      this._http
        .get(jsonFile)
        .toPromise()
        .then((response: IFeatureConfig) => {
          FeatureConfig.settings = <IFeatureConfig>response;
          resolve();
        })
        .catch((response: any) => {
          reject(
            `Could not load file '${jsonFile}': ${JSON.stringify(response)}`
          );
        });
    });
  }

  loadFromApi() {
    return new Promise<void>((resolve, reject) => {
      this._http
        .get(this.apiPath + 'Feature/GetAll')
        .toPromise()
        .then((response: any) => {
          if (
            response !== undefined &&
            response.result !== undefined &&
            response.result.data !== undefined &&
            response.result.data.length > 0
          ) {
            FeatureConfig.settings = <IFeatureConfig>response.result.data[0];
            resolve();
          } else {
            reject(`Could not load feature data : ${JSON.stringify(response)}`);
          }
        })
        .catch((response: any) => {
          reject(`Could not load feature data : ${JSON.stringify(response)}`);
        });
    });
  }
}

export function loadConfiguration(appConfig: FeatureConfig) {
  return () => appConfig.load();
}

export function loadConfigurationApi(appConfig: FeatureConfig) {
  return () => appConfig.loadFromApi();
}
