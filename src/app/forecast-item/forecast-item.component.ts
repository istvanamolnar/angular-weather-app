import { Component, Input, OnInit } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';

import IForecastData from '../../interfaces/IForecastData';
import IWeatherData from '../../interfaces/IWeatherData';
import IForecastAggregation from '../../interfaces/IForecastAggregation';

@Component({
  selector: 'forecast-item',
  standalone: true,
  imports: [
    MatExpansionModule
  ],
  templateUrl: './forecast-item.component.html',
  styleUrl: './forecast-item.component.scss'
})
export class ForecastItemComponent implements OnInit {
  @Input() forecastDay!: IForecastAggregation;
  averagedForecast!: {
    morning: IWeatherData | null;
    afternoon: IWeatherData | null;
    evening: IWeatherData | null;
    night: IWeatherData | null;
  };
  date!: string;

  ngOnInit() {
    this.averagedForecast = {
      morning: this.getAverageForInterval(this.forecastDay.morning),
      afternoon: this.getAverageForInterval(this.forecastDay.afternoon),
      evening: this.getAverageForInterval(this.forecastDay.evening),
      night: this.getAverageForInterval(this.forecastDay.night)
    };

    this.date = this.getDateString(this.forecastDay);
  }

  getDateString(fc: IForecastAggregation) {
    const dateStr = fc.morning[0]?.time || fc.afternoon[0]?.time || fc.evening[0]?.time || fc.night[0]?.time || '';
    const date = new Date(dateStr);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });

    let suffix;
    if (day % 10 == 1 && day != 11) {
      suffix = "st";
    } else if (day % 10 == 2 && day != 12) {
      suffix = "nd";
    } else if (day % 10 == 3 && day != 13) {
      suffix = "rd";
    } else {
      suffix = "th";
    }

    const formattedDate = `${day}${suffix} ${month}`;
    return formattedDate;
  }

  getAverageForInterval(data: IWeatherData[]): IWeatherData | null {
    if (data.length === 0) {
      return null;
    }
    const averaged: IWeatherData = {
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
    Object.keys(averaged).forEach((key) => {
      switch (key) {
        case 'temp_c':
          averaged[key] = this.getAverage(data, key);
          break;
        case 'feelslike_c':
          averaged[key] = this.getAverage(data, key);
          break;
        case 'wind_kph':
          averaged[key] = this.getAverage(data, key);
          break;
        case 'wind_dir':
          averaged[key] = data[0] ? data[0][key] : '';
          break;
        case 'cloud':
          averaged[key] = this.getAverage(data, key);
          break;
        case 'precip_mm':
          averaged[key] = this.getAverage(data, key);
          break;
        case 'condition':
          averaged[key] = data[0] ? data[0][key] : { icon: '', text: '' };
          break;
        default:
          break;
      }
    });
    return averaged;
  }

  getAverage(data: IWeatherData[], key: keyof IWeatherData) {
    const sum = data.reduce((acc, curr) => acc + (curr[key] as number), 0);
    const average = sum / (data.length || 1);
    const roundedAv = Math.round(average);
    return roundedAv;
  }
}
