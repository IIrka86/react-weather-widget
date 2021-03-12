export interface DaysInfoResponse {
  city: CityInfo;
  list: DayInfo[];
}

export interface CityInfo {
  id: number;
  name: string;
  country: string;
  timezone: number;
}

export interface DayInfo {
  dt: number;
  temp: TemperatureInfo;
  humidity: number;
  weather: WeatherInfo[];
  speed: number;
}

export interface TemperatureInfo {
  min: number;
  max: number;
}

export interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}
