import IWeatherStore from '../../interfaces/IWeatherStore';
import IWeatherData from '../../interfaces/IWeatherData';

export const selectIsLoading = (store: {weatherData: IWeatherStore}): boolean => {
  return !!store.weatherData.fetchingState?.isLoading;
};
export const selectCurrent = (store: {weatherData: IWeatherStore}): IWeatherData | null => {
  return store.weatherData.current;
};
export const selectForecast = (store: IWeatherStore) => store.forecast;
export const selectLocation = (store: {weatherData: IWeatherStore}) => store.weatherData.location;

export const selectErrorMessage = (store: {weatherData: IWeatherStore}): string | null => {
  return store.weatherData.fetchingState ? store.weatherData.fetchingState.errorMessage : null;
}

// export const weatherDataSelector = createSelector(
//   selectIsLoading,
//   selectCurrent,
//   selectForecast,
//   selectLocation,
//   (isLoading, current, forecast, location) => ({
//     isLoading,
//     current,
//     forecast,
//     location
//   })
// )