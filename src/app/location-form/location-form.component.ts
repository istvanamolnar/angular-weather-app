import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { createDateValidator } from '../../utils/date-validator';
import { fetchWeatherData } from '../../services/fetch-weather-data';

import { setErrorMessage, setIsLoading, setWeatherData } from '../store/weather.actions';
import { error } from 'console';

@Component({
  selector: 'app-location-form',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.scss'
})

export class LocationFormComponent {
  // @ViewChild('f') form: NgForm = new NgForm([], []);
  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  dateAsString = formatDate(new Date(), 'dd.MM.yyyy', 'en');

  formData: FormGroup = new FormGroup({
    location: new FormControl('', Validators.required),
    date: new FormControl(this.dateAsString, [Validators.required, createDateValidator()]),
  });

  onSubmit = async () => {
    if (this.formData.valid) {
      const { date, location } = this.formData.value;

      this.store.dispatch(setIsLoading({ isLoading: true }));

      (await fetchWeatherData(this.http, location, date))
        .subscribe({
          next: (res) => {
            console.log(JSON.stringify(res.location));
            
            this.store.dispatch(setWeatherData(res));
          },
          error: (e) => {
            this.store.dispatch(setErrorMessage(e.error.error));
          }
        });
    }
  }
}
