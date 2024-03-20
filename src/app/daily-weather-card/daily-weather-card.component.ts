import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';

import IWeatherData from '../../interfaces/IWeatherData';
import { selectCurrent, selectLocation } from '../store/weather.selectors';
import IWeatherStore from '../../interfaces/IWeatherStore';
import ILocationData from '../../interfaces/ILocationData';

@Component({
  selector: 'daily-weather-card',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './daily-weather-card.component.html',
  styleUrl: './daily-weather-card.component.scss'
})
export class DailyWeatherCardComponent {
  current$: Observable<IWeatherData | null>;
  location$: Observable<ILocationData | null>;
  dataSource: { key: string, value: string | number }[] = [];
  displayedColumns: string[] = ['key', 'value'];

  constructor(private store: Store<{ weatherData: IWeatherStore }>) {
    this.current$ = this.store.pipe(select(selectCurrent));
    this.location$ = this.store.pipe(select(selectLocation));
    this.current$.subscribe(data => {
      this.dataSource = this.formatTable(data);
    });
  }

  formatTable = (data: IWeatherData | null): { key: string, value: string | number }[] => {
    const dataSource: { key: string, value: string | number }[] = []
    if (data) {
      Object.keys(data).forEach(k => {
        switch (k) {
          case 'temp_c':
            dataSource.push({ key: 'Temperature', value: `${data.temp_c} °C` });
            break;
          case 'feelslike_c':
            dataSource.push({ key: 'Feels Like', value: `${data.feelslike_c} °C` });
            break;
          case 'precip_mm':
            dataSource.push({ key: 'Percipitation', value: `${data.precip_mm} mm` });
            break;
          case 'wind_kph':
            dataSource.push({ key: 'Wind Speed', value: `${data.wind_kph} km/h, ${data.wind_dir}` });
            break;
          case 'cloud':
            dataSource.push({ key: 'Cloud Coverage', value: `${data.cloud} %` });
            break;
          default:
            break;
        }
      });
    }
    return dataSource;
  }
}
