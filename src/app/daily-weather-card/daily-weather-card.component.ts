import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import IWeatherData from '../../interfaces/IWeatherData';
import ILocationData from '../../interfaces/ILocationData';

@Component({
  selector: 'daily-weather-card',
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './daily-weather-card.component.html',
  styleUrl: './daily-weather-card.component.scss'
})

export class DailyWeatherCardComponent implements OnInit {
  @Input() current!: IWeatherData | null;
  @Input() location!: ILocationData | null;
  @Input() title!: string | null;
  dataSource: { key: string, value: string | number }[] = [];
  displayedColumns: string[] = ['key', 'value'];

  ngOnInit(): void {
    this.dataSource = this.formatTable(this.current);
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
          case 'avgtemp_c':
            dataSource.push({ key: 'Average Temperature', value: `${Math.round(data.avgtemp_c || 0)} °C` });
            break;
          case 'avgvis_km':
            dataSource.push({ key: 'Average Wind Speed', value: `${data.avgvis_km} km/h` });
            break;
          case 'totalprecip_mm':
            dataSource.push({ key: 'Total Percipitation', value: `${data.totalprecip_mm} mm` });
            break;
          default:
            break;
        }
      });
    }
    return dataSource;
  }
}
