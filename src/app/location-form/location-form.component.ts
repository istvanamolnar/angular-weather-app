import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

import { createDateValidator } from '../../utils/date-validator';
import { fetchWeatherData } from '../../services/fetch-weather-data';

import { setErrorMessage, setIsLoading, setWeatherData } from '../store/weather.actions';

@Component({
  selector: 'location-form',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.scss'
})

export class LocationFormComponent {
  // @ViewChild('f') form: NgForm = new NgForm([], []);
  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  formData: FormGroup = new FormGroup({
    location: new FormControl('', Validators.required),
    date: new FormControl(new Date(), [Validators.required, createDateValidator()]),
  });

  onSubmit = async () => {
    if (this.formData.valid) {
      const { date, location } = this.formData.value;

      this.store.dispatch(setIsLoading({ isLoading: true }));

      (await fetchWeatherData(this.http, location, date))
        .subscribe({
          next: (res) => {
            this.store.dispatch(setWeatherData(res));
          },
          error: (e) => {
            this.store.dispatch(setErrorMessage(e.error.error));
          }
        });
    }
  }
}
