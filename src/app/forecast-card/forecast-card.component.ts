import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { MatExpansionModule } from '@angular/material/expansion';

import IWeatherStore from '../../interfaces/IWeatherStore';
import IForecastData from '../../interfaces/IForecastData';
import IForecastAggregation from '../../interfaces/IForecastAggregation';
import { selectForecast } from '../store/weather.selectors';
import IWeatherData from '../../interfaces/IWeatherData';
import { ForecastItemComponent } from '../forecast-item/forecast-item.component';

@Component({
  selector: 'forecast-card',
  standalone: true,
  imports: [
    AsyncPipe,
    ForecastItemComponent,
    MatExpansionModule,
    NgIf,
    NgFor
  ],
  templateUrl: './forecast-card.component.html',
  styleUrl: './forecast-card.component.scss'
})
export class ForecastCardComponent {
  forecast$: Observable<IForecastData | null>;
  forecastDays: IForecastAggregation[] | null = null;

  constructor(private store: Store<{ weatherData: IWeatherStore }>) {
    this.forecast$ = this.store.pipe(select(selectForecast));
    this.forecast$.subscribe((data) => {
      const accumulatedData: IForecastAggregation[] = [];

      data?.forecastday.forEach((day, index) => {
        accumulatedData.push({
          morning: this.getIntervalHours(data?.forecastday, index, 6, 12),
          afternoon: this.getIntervalHours(data?.forecastday, index, 12, 18),
          evening: this.getIntervalHours(data?.forecastday, index, 18, 22),
          night: this.getIntervalHours(data?.forecastday, index, 22, 6)
        });
      });
      this.forecastDays = accumulatedData;
    });
  }

  getIntervalHours(
    data: { hour: IWeatherData[] }[],
    index: number,
    firstHour: number,
    lastHour: number
  ): IWeatherData[] {
    const currentDay = data[index];
    const isNight = firstHour > lastHour;

    const currentHours = currentDay.hour.filter(h => {
      const hDate = h.time ? new Date(h.time) : null;
      const isFutureDate = hDate && hDate > new Date();
      if (isFutureDate && hDate) {
        const startDate = new Date(hDate);
        startDate.setHours(firstHour);

        const endDate = new Date(hDate);
        endDate.setHours(lastHour);

        return (hDate >= startDate && hDate < endDate) || (isNight && hDate >= startDate);
      }
      return false;
    });

    const nextDay = data[index + 1];
    if (isNight && nextDay) {
      nextDay.hour
        .filter(h => {
          const hDate = h.time ? new Date(h.time) : null;
          if (hDate) {
            const endDate = new Date(hDate);
            endDate.setHours(lastHour);

            return hDate < endDate;
          }
          return false;
        })
        .forEach(h => currentHours.push(h));
    }

    return currentHours;
  }
}
