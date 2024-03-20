import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import IForecastData from '../../interfaces/IForecastData';
import IWeatherStore from '../../interfaces/IWeatherStore';
import IForecastAggregation from '../../interfaces/IForecastAggregation';
import { selectForecast } from '../store/weather.selectors';
import IWeatherData from '../../interfaces/IWeatherData';

@Component({
  selector: 'forecast',
  standalone: true,
  imports: [],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss'
})
export class ForecastComponent {
  forecast$: Observable<IForecastData | null>;
  forecastAggregation: IForecastAggregation | null = null;

  constructor(private store: Store<{ weatherData: IWeatherStore }>) {
    this.forecast$ = this.store.pipe(select(selectForecast));
    this.forecast$.subscribe((data) => {
      if (data) {
        this.forecastAggregation = {
          morning: this.aggregateForecast(data, 6, 11),
          afternoon: this.aggregateForecast(data, 12, 17),
          evening: this.aggregateForecast(data, 18, 21),
          night: this.aggregateForecast(data, 22, 5)
        }
      }
    });
  }

  aggregateForecast(data: IForecastData, firstHour: number, lastHour: number): IWeatherData {
    console.log(data);
    const aggregated: IWeatherData = {
      temp_c: 0,
      feelslike_c: 0,
      wind_kph: 0,
      wind_dir: '',
      cloud: 0,
      precip_mm: 0,
      condition: {
        text: '',
        icon: '',
      }
    };
    Object.keys(aggregated).forEach((key) => {
      switch (key) {
        case 'temp_c':
          aggregated[key] = this.getAverage(data, firstHour, lastHour, key);
          break;
        default:
          break;
      }
    });
    return aggregated;
  }

  getAverage(data: IForecastData, firstHour: number, lastHour: number, key: keyof IWeatherData) {
    return data.forecastday[0].hour.slice(firstHour, lastHour).reduce((acc, curr) => {
      return acc + (curr[key] as number);
    }, 0) / (lastHour - firstHour);
  }
}
