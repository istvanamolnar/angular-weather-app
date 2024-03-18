import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export async function fetchWeatherData(http: HttpClient, location: string) {
  const { weatherApiKey, weatherApiUrl } = environment;
  return http.get(`${weatherApiUrl}/forecast.json?key=${weatherApiKey}&q=${location}&days=3`);
}