import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';

import { createDateValidator } from '../../utils/date-validator';
import { fetchWeatherData } from '../../services/fetch-weather-data';
import searchSuggestions from '../../services/search-suggestions';

import { setErrorMessage, setIsLoading, setWeatherData } from '../store/weather.actions';

@Component({
  selector: 'location-form',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatLabel,
    NgIf,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.scss'
})

export class LocationFormComponent implements OnInit {
  // @ViewChild('f') form: NgForm = new NgForm([], []); 
  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  suggestions: Subject<string[]> = new Subject<string[]>();
  formData: FormGroup = new FormGroup({
    location: new FormControl('', Validators.required),
    date: new FormControl(new Date(), [Validators.required, createDateValidator()]),
  });

  ngOnInit(): void {
    this.formData.get('location')?.valueChanges.subscribe(async (value) => {
      if (value.length > 2) {
        (await searchSuggestions(this.http, value))
          .subscribe({
            next: (res) => {
              this.suggestions.next(res.map(s => `${s.name}, ${s.country}`));
            },
            error: (e) => {
              this.store.dispatch(setErrorMessage(e.error.error));
            }
          });
      }
    });
  
  }

  onLocationReset = () => {
    this.formData.get('location')?.reset('');
  }

  onSubmit = async () => {
    if (this.formData.valid) {
      const { date, location } = this.formData.value;

      this.store.dispatch(setIsLoading({ isLoading: true }));

      (await fetchWeatherData(this.http, location, date))
        .subscribe({
          next: (res) => {
            if (res.current) {
              this.store.dispatch(setWeatherData(res));
            } else {
              this.store.dispatch(
                setWeatherData({
                  current: res.forecast?.forecastday[0].day || null,
                  location: res.location,
                  forecast: res.forecast
                })
              );
            }
          },
          error: (e) => {
            this.store.dispatch(setErrorMessage(e.error.error));
          }
        });
    }
  }
}
