import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectErrorMessage, selectIsLoading } from './store/weather.selectors';

import IWeatherStore from '../interfaces/IWeatherStore';

import { LocationFormComponent } from './location-form/location-form.component';
import { DailyWeatherCardComponent } from './daily-weather-card/daily-weather-card.component';
import { ForecastComponent } from './forecast/forecast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    RouterOutlet,
    MatProgressSpinnerModule,
    LocationFormComponent,
    DailyWeatherCardComponent,
    ForecastComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;

  constructor(private store: Store<{ weatherData: IWeatherStore }>) {
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.errorMessage$ = this.store.pipe(select(selectErrorMessage));
  }
}
