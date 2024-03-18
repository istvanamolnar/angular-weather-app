import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocationFormComponent } from './location-form/location-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LocationFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-weather-app';
}
