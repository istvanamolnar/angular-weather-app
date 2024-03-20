import IWeatherData from './IWeatherData';

export default interface IForecastData {
  forecastday: {
    hour: IWeatherData[];
  }[]
}