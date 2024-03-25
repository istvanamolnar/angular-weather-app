import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import ISuggestion from '../interfaces/ISuggestion';

export default async function searchSuggestions(http: HttpClient, query: string) {
  const { weatherApiKey, weatherApiUrl } = environment;
  const jsonName = 'search';

  return http.get<ISuggestion[]>(
    `${weatherApiUrl}/${jsonName}.json?key=${weatherApiKey}&q=${query}`
  );
}

