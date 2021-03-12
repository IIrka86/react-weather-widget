import { DayInfo } from '@/interfaces/daysInfoResponse';
import { useMemo } from 'react';

const useDConverter = (
  daysInfo: DayInfo[],
): DayInfo[] => {
  const convertToCelsius = useMemo(() => (
    daysInfo.map((dayInfo: DayInfo) => ({
      ...dayInfo,
      temp: {
        max: Math.trunc(dayInfo.temp.max - 273.15),
        min: Math.trunc(dayInfo.temp.min - 273.15),
      },
    }))
  ), [daysInfo]);

  return convertToCelsius;
};

export default useDConverter;
