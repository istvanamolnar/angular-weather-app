import IFetchingState from './IFetchingState';
import IWeatherFetchResponse from './IWeatherFetchResponse';

export default interface IWeatherStore extends IWeatherFetchResponse {
  fetchingState: IFetchingState | null;
}