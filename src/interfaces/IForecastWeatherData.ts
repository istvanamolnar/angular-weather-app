import IWeatherData from './IWeatherData';

export interface IForecastWeatherData {
  morning: IWeatherData;
  afternoon: IWeatherData;
  evening: IWeatherData;
  night: IWeatherData;
}