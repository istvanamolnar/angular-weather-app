export default interface IWeatherData {
  temp_c: number;
  feelslike_c: number;
  wind_kph: number;
  wind_dir: string;
  cloud: number;
  precip_mm: number;
  condition: {
    text: string;
    icon: string;
  };
  time?: string;
}
