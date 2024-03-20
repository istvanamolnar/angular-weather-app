import { createAction, props } from '@ngrx/store';
import IWeatherFetchResponse from '../../interfaces/IWeatherFetchResponse';

export const setWeatherData = createAction(
  'SetWeatherData',
  props<IWeatherFetchResponse>()
);

export const setIsLoading = createAction(
  'SetIsLoading',
  props<{ isLoading: boolean }>()
);

export const setErrorMessage = createAction(
  'SetErrorMessage',
  props<{ message: string }>()
);

// export class SetWeatherData implements Action {
//   readonly type = 'SetWeatherData';
//   constructor(public payload: IWeatherFetchResponse) {}
// }

// export type WeatherActions = SetWeatherData; // | ReturnType<typeof setIsLoading>;