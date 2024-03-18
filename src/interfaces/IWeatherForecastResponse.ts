import ILocationData from './ILocationData';
import IWeatherData from './IWeatherData';

export default interface IWeatherFetchResponse {
  current: IWeatherData,
  forecast: {
    forecastday: {
      hour: IWeatherData[];
    }
  },
  location: ILocationData;
}