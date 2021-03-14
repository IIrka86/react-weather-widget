import { loadDailyWeather } from '@/api/apiCalls';
import textKey from '@/constants/textKey';
import TemperatureType from '@/enums/TemperatureType';
import useConverter from '@/hooks/useConverter';
import { Coordinates } from '@/interfaces/currentWeatherResponse';
import { DayInfo, DailyWeatherResponse } from '@/interfaces/dailyWeatherResponse';
import { Box } from '@material-ui/core';
import React, {
  memo, useCallback, useEffect, useState, VFC,
} from 'react';
import ModuleDaysItem from '@/components/ModuleDaysItem';
import ModuleDetails from '@/components/ModuleDetails';
import ModuleError from '@/components/ModuleError';
import useStyles from './weatherModule.styles';

interface WeatherModuleProps {
  location: string;
  coordinates: Coordinates;
  error: boolean;
  errorText: string;
}

const WhetherModule: VFC<WeatherModuleProps> = ({
  location,
  coordinates,
  error,
  errorText,
}: WeatherModuleProps) => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [temperatureType, setTemperatureType] = useState<TemperatureType>(TemperatureType.CELSIUS);
  const [weatherInfo, setWeatherInfo] = useState<DailyWeatherResponse>({
    current: {},
    daily: [],
  } as unknown as DailyWeatherResponse);

  const convertedWeatherInfo: DailyWeatherResponse = useConverter(weatherInfo, temperatureType);

  useEffect(() => {
    setLoading(true);
    if (coordinates && coordinates.lat !== undefined && coordinates.lon !== undefined) {
      loadDailyWeather(coordinates.lat, coordinates.lon).then((data: DailyWeatherResponse) => {
        setWeatherInfo(data);
      }).finally(() => { setLoading(false); });
    }
  }, [coordinates]);

  const handleSelectItem = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleSwitchType = useCallback((type: TemperatureType) => {
    setTemperatureType(type);
  }, []);

  return (
    <Box className={classes.module}>
      {error
        ? <ModuleError errorText={errorText} />
        : (
          <Box position="relative">
            {isLoading
              ? <Box className={classes.loading}>{textKey.LOADING}</Box>
              : (
                <>
                  <ModuleDetails
                    selectedIndex={selectedIndex}
                    weatherInfo={convertedWeatherInfo}
                    location={location}
                    onSwitchType={handleSwitchType}
                  />
                  <Box className={classes.moduleDays}>
                    {convertedWeatherInfo.daily.map((dayInfo: DayInfo, index: number) => (
                      <ModuleDaysItem
                        key={dayInfo.dt}
                        index={index}
                        dayInfo={dayInfo}
                        onSelect={handleSelectItem}
                        selected={index === selectedIndex}
                      />
                    ))}
                  </Box>
                </>
              )}
          </Box>
        )}
    </Box>
  );
};

export default memo(WhetherModule);
