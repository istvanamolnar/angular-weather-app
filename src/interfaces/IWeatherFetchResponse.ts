import ILocationData from './ILocationData';
import IWeatherData from './IWeatherData';

export default interface IWeatherFetchResponse {
  current: IWeatherData | null,
  forecast: {
    forecastday: {
      hour: IWeatherData[];
    }
  } | null,
  location: ILocationData | null;
}