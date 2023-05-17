import { ForcastDay } from '@app/yourapp/weather/models/forcastday.model';

export class Forecast {
  public city?: string;
  public country?: string;
  public population?: number;
  public days?: ForcastDay[];
}
