import { Box, Typography } from '@material-ui/core';
import React, {
  memo, useCallback, useMemo, useState, VFC,
} from 'react';
import textKeys from '@/constants/textKey';
import { DailyWeatherResponse, DayInfo } from '@/interfaces/dailyWeatherResponse';
import TemperatureType from '@/enums/TemperatureType';
import { WeekDay } from '@/constants/weekDay';
import apiUrl from '@/constants/apiUrl';
import clsx from 'clsx';
import degToCard from '@/utils/degToCard';
import formatHours from '@/utils/formatHours';
import useStyles from './moduleDetails.styles';

interface ModuleDetailsProps {
  selectedIndex: number;
  weatherInfo: DailyWeatherResponse;
  location: string;
  onSwitchType: (type: TemperatureType) => void;
}

const ModuleDetails: VFC<ModuleDetailsProps> = ({
  selectedIndex,
  weatherInfo,
  location,
  onSwitchType,
}: ModuleDetailsProps) => {
  const classes = useStyles();
  const [temperatureType, setTemperatureType] = useState<TemperatureType>(TemperatureType.CELSIUS);

  const isToday: boolean = !selectedIndex;
  const { current, daily } = weatherInfo;

  const selectedDay: DayInfo = useMemo(() => (
    daily[selectedIndex]
  ), [daily, selectedIndex]);

  const weekDay: string = useMemo(() => {
    const date: Date = new Date(selectedDay.dt * 1000);
    let dayString: string = WeekDay[date.getDay()];
    if (isToday) {
      const currentDate: Date = new Date(current.dt * 1000);
      dayString += ` ${formatHours(currentDate.getHours())}`;
    }
    return dayString;
  }, [current.dt, isToday, selectedDay.dt]);

  const windString: string = useMemo(() => {
    const speed: number = isToday ? current.wind_speed : selectedDay.wind_speed;
    const degree: number = isToday ? current.wind_deg : selectedDay.wind_deg;
    const unit: string = temperatureType === TemperatureType.CELSIUS ? textKeys.KPH : textKeys.MPH;
    const direction: string = degToCard(degree);

    return `${textKeys.WIND}: ${speed} ${unit} ${direction}`;
  }, [current, isToday, selectedDay, temperatureType]);

  const handleFahrenheitClick = useCallback(() => {
    setTemperatureType(TemperatureType.FAHRENHEIT);
    onSwitchType(TemperatureType.FAHRENHEIT);
  }, [onSwitchType]);

  const handleCelsiusClick = useCallback(() => {
    setTemperatureType(TemperatureType.CELSIUS);
    onSwitchType(TemperatureType.CELSIUS);
  }, [onSwitchType]);

  return (
    <Box className={classes.moduleDetails}>
      <Typography className={classes.location}>{location}</Typography>
      <Typography className={classes.day}>
        {`${weekDay} ${textKeys.CENTER_POINT} ${selectedDay.weather[0].main}`}
      </Typography>
      <Box className={classes.weatherInfo}>
        <Box display="flex" alignItems="center">
          <img
            alt="icon"
            src={`${apiUrl.ICON_URL}${selectedDay.weather[0].icon}.png`}
            className={classes.icon}
          />
          <Typography className={classes.degree}>
            {`${isToday ? current.temp : selectedDay.temp.max}${textKeys.DEGREE}`}
          </Typography>
          <Box className={classes.typeWrapper}>
            <Box
              className={clsx(temperatureType === TemperatureType.FAHRENHEIT
                ? classes.selectedType
                : classes.unselectedType)}
              onClick={handleFahrenheitClick}
            >
              {textKeys.FAHRENHEIT}
            </Box>
            <span>/</span>
            <Box
              className={clsx(temperatureType === TemperatureType.CELSIUS
                ? classes.selectedType
                : classes.unselectedType)}
              onClick={handleCelsiusClick}
            >
              {textKeys.CELSIUS}
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography>{`${textKeys.HUMIDITY}: ${isToday ? current.humidity : selectedDay.humidity}%`}</Typography>
          <Typography>{windString}</Typography>
          {isToday && <Typography>{`${textKeys.AIR_QUALITY}: ${textKeys.MODERATE}`}</Typography>}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(ModuleDetails);
