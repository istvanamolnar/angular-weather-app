import IWeatherData from './IWeatherData';

export default interface IForecastAggregation {
  morning: IWeatherData[];
  afternoon: IWeatherData[];
  evening: IWeatherData[];
  night: IWeatherData[];
}