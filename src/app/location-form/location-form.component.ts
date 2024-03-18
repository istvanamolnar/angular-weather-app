import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { formatDate } from '@angular/common';
import { createDateValidator } from '../../utils/date-validator';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { fetchWeatherData } from '../../services/fetch-weather-data';
// import { map } from 'rxjs';

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
  constructor(private http: HttpClient) {}
  // @ViewChild('f') form: NgForm = new NgForm([], []);\

  dateAsString = formatDate(new Date(), 'dd.MM.yyyy', 'en');

  formData: FormGroup = new FormGroup({
    location: new FormControl('', Validators.required),
    date: new FormControl(this.dateAsString, [Validators.required, createDateValidator()]),
  });

  onSubmit = async () => {
    if (this.formData.valid) {
      (await fetchWeatherData(this.http, this.formData.value.location))
        // .pipe(map(data => {
        //   data.forecast.forecastday
        // }))
        .subscribe(res => {
        console.log(res);
      });
      
    }
  }
}
