import API_KEY from '@/constants/apiKey';
import apiUrl from '@/constants/apiUrl';
import { CurrentWeatherResponse } from '@/interfaces/currentWeatherResponse';
import { DailyWeatherResponse } from '@/interfaces/dailyWeatherResponse';

const sendRequest = <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => fetch(url, options).then((response) => {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    }
    return response.json();
  });

const sendGetRequest = <T>(
  url: string,
): Promise<T> => sendRequest(url, { method: 'GET' });

export const loadCurrentWeather = (
  cityName: string,
): Promise<CurrentWeatherResponse> => {
  const url = `${apiUrl.CURRENT_WEATHER_URL}?q=${cityName}&appid=${API_KEY}`;
  return sendGetRequest<CurrentWeatherResponse>(url);
};

export const loadDailyWeather = (
  lat: number,
  lon: number,
): Promise<DailyWeatherResponse> => {
  const url = `${apiUrl.DAILY_URL}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts=&appid=${API_KEY}`;
  return sendGetRequest<DailyWeatherResponse>(url);
};
