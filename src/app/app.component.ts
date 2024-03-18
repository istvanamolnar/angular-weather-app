import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationInputComponent } from './location-input/location-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LocationInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-weather-app';
}
