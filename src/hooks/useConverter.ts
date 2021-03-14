import TemperatureType from '@/enums/TemperatureType';
import { DayInfo, DailyWeatherResponse, CurrentWeatherInfo } from '@/interfaces/dailyWeatherResponse';
import { useMemo } from 'react';

const useDConverter = (
  weatherInfo: DailyWeatherResponse,
  type: TemperatureType,
): DailyWeatherResponse => {
  const { current, daily } = weatherInfo;

  const convertToCelsius = useMemo(() => {
    const convertedCurrent: CurrentWeatherInfo = {
      ...current,
      temp: Math.trunc(current.temp - 273.15),
      wind_speed: Math.trunc(current.wind_speed * 3.6),

    };

    const convertedDaily: DayInfo[] = daily.map((dayInfo: DayInfo) => ({
      ...dayInfo,
      temp: {
        max: Math.trunc(dayInfo.temp.max - 273.15),
        min: Math.trunc(dayInfo.temp.min - 273.15),
      },
      wind_speed: Math.trunc(dayInfo.wind_speed * 3.6),
    }));

    return {
      current: convertedCurrent,
      daily: convertedDaily,
    };
  }, [current, daily]);

  const convertToFahrenheit = useMemo(() => {
    const convertedCurrent: CurrentWeatherInfo = {
      ...current,
      temp: Math.trunc((current.temp - 273.15) * (9 / 5) + 32),
      wind_speed: Math.trunc(current.wind_speed * 2.237),
    };

    const convertedDaily: DayInfo[] = daily.map((dayInfo: DayInfo) => ({
      ...dayInfo,
      temp: {
        max: Math.trunc((dayInfo.temp.max - 273.15) * (9 / 5) + 32),
        min: Math.trunc((dayInfo.temp.min - 273.15) * (9 / 5) + 32),
      },
      wind_speed: Math.trunc(dayInfo.wind_speed * 2.237),
    }));

    return {
      current: convertedCurrent,
      daily: convertedDaily,
    };
  }, [current, daily]);

  return type === TemperatureType.CELSIUS
    ? convertToCelsius
    : convertToFahrenheit;
};

export default useDConverter;
