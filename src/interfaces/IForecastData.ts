import IWeatherData from './IWeatherData';

export default interface IForecastData {
  forecastday: {
    date: string;
    hour: IWeatherData[];
  }[]
}