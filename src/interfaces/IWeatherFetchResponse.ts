import IForecastData from './IForecastData';
import ILocationData from './ILocationData';
import IWeatherData from './IWeatherData';

export default interface IWeatherFetchResponse {
  current: IWeatherData | null,
  forecast: IForecastData | null,
  location: ILocationData | null;
}