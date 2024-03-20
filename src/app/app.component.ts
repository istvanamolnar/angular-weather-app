import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LocationFormComponent } from './location-form/location-form.component';
import { DailyWeatherComponent } from './daily-weather/daily-weather.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LocationFormComponent,
    DailyWeatherComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-weather-app';
}
