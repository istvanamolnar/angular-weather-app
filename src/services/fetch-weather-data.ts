import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { formatDateString, isToday } from '../utils/date-formatting';
import IWeatherFetchResponse from '../interfaces/IWeatherFetchResponse';

export async function fetchWeatherData(http: HttpClient, location: string, date: string) {
  const { weatherApiKey, weatherApiUrl } = environment;
  const isDateToday = isToday(date);
  const jsonName = isDateToday ? 'forecast' : 'future';
  const dayParam = isDateToday ? 'days=3' : `dt=${formatDateString(date)}`;

  return http.get<IWeatherFetchResponse>(
    `${weatherApiUrl}/${jsonName}.json?key=${weatherApiKey}&q=${location}&${dayParam}`
  );
}

