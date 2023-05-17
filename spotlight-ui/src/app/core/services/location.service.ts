import { Injectable } from '@angular/core';
@Injectable()
export class LocationService {
  constructor() {}

  go(location) {
    window.location.href = location;
  }
}
