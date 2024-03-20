import { Action, createReducer, on } from '@ngrx/store';

import { setErrorMessage, setIsLoading, setWeatherData } from './weather.actions';
import IWeatherStore from '../../interfaces/IWeatherStore';
import IWeatherFetchResponse from '../../interfaces/IWeatherFetchResponse';

const intialState: IWeatherStore = {
  fetchingState: {
    isLoading: false,
    errorMessage: null
  },
  current: null, // JSON.parse(`{"last_updated_epoch":1710919800,"last_updated":"2024-03-20 07:30","temp_c":11,"temp_f":51.8,"is_day":1,"condition":{"text":"Light rain","icon":"//cdn.weatherapi.com/weather/64x64/day/296.png","code":1183},"wind_mph":2.5,"wind_kph":4,"wind_degree":170,"wind_dir":"S","pressure_mb":1017,"pressure_in":30.03,"precip_mm":0.05,"precip_in":0,"humidity":87,"cloud":25,"feelslike_c":10.6,"feelslike_f":51.1,"vis_km":8,"vis_miles":4,"uv":3,"gust_mph":6.4,"gust_kph":10.2}`),
  forecast: null,
  location: null, // JSON.parse(`{"name":"London","region":"City of London, Greater London","country":"United Kingdom","lat":51.52,"lon":-0.11,"tz_id":"Europe/London","localtime_epoch":1710920345,"localtime":"2024-03-20 7:39"}`)
}

export const weatherReducer = createReducer(
  intialState,
  on(setWeatherData, (state: IWeatherStore, payload: IWeatherFetchResponse | Action) => ({
    ...state,
    current: (payload as IWeatherFetchResponse).current,
    location: (payload as IWeatherFetchResponse).location,
    forecast: (payload as IWeatherFetchResponse).forecast,
    fetchingState: {
      isLoading: false,
      errorMessage: null
    }
  })),
  on(setIsLoading, (state: IWeatherStore, payload: { isLoading: boolean }) => ({
    ...state,
    current: null,
    location: null,
    forecast: null,
    fetchingState: {
      isLoading: payload.isLoading,
      errorMessage: null
    }
  })),
  on(setErrorMessage, (state: IWeatherStore, payload: { message: string }) => ({
    ...state,
    fetchingState: {
      isLoading: false,
      errorMessage: payload.message
    }
  }))
);
