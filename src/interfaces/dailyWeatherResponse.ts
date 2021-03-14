export interface DailyWeatherResponse {
  current: CurrentWeatherInfo;
  daily: DayInfo[];
}

export interface CurrentWeatherInfo {
  dt: number;
  temp: number;
  humidity: number;
  weather: WeatherInfo;
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface DayInfo {
  dt: number;
  temp: TemperatureInfo;
  humidity: number;
  weather: WeatherInfo[];
  wind_speed: number;
  wind_deg: number;
}

interface TemperatureInfo {
  min: number;
  max: number;
}

interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}
