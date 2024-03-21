import { Action, createReducer, on } from '@ngrx/store';

import { setErrorMessage, setIsLoading, setWeatherData } from './weather.actions';
import IWeatherStore from '../../interfaces/IWeatherStore';
import IWeatherFetchResponse from '../../interfaces/IWeatherFetchResponse';

const intialState: IWeatherStore = {
  fetchingState: {
    isLoading: false,
    errorMessage: null
  },
  current: null,
  forecast: null,
  location: null
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
