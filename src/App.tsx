import { Box, IconButton, InputBase } from '@material-ui/core';
import React, {
  useCallback, useEffect, useState, VFC,
} from 'react';
import './index.css';
import Close from '@material-ui/icons/Close';
import textKeys from '@/constants/textKey';
import WhetherModule from '@/components/WeatherModule';
import useDebounce from '@/hooks/useDebounce';
import { loadCurrentWeather } from '@/api/apiCalls';
import { Coordinates, CurrentWeatherResponse } from '@/interfaces/currentWeatherResponse';
import useStyles from './App.styles';

const App: VFC = () => {
  const classes = useStyles();
  const [cityName, setCityName] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [coordinates, setCoordinates] = useState<Coordinates>({} as Coordinates);
  const [location, setLocation] = useState<string>('');

  const debouncedValue: string = useDebounce(cityName, 1000);

  const defineErrorText = useCallback((status) => {
    switch (status) {
      case 404:
        return textKeys.ERROR_WRONG_CITY_NAME;
      case 401:
        return textKeys.ERROR_ACCESS_DENIED;
      default:
        return textKeys.ERROR;
    }
  }, []);

  useEffect(() => {
    setError(false);
    if (debouncedValue) {
      loadCurrentWeather(debouncedValue).then((data: CurrentWeatherResponse) => {
        setCoordinates(data.coord);
        setLocation(`${data.name}, ${data.sys.country}`);
      }).catch((status) => {
        setError(true);
        setErrorText(defineErrorText(status));
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [debouncedValue, defineErrorText]);

  const handleCityChange = useCallback(({ target: { value } }) => {
    setLoading(true);
    setCityName(value.trim());
  }, []);

  const handleClearClick = useCallback(() => {
    setCityName('');
  }, []);

  return (
    <Box className={classes.app}>
      <Box className={classes.searchBox}>
        <InputBase
          className={classes.searchInput}
          placeholder={textKeys.ENTER_CITY}
          value={cityName}
          onChange={handleCityChange}
        />
        <IconButton
          className={classes.clearIcon}
          onClick={handleClearClick}
        >
          <Close />
        </IconButton>
      </Box>
      {debouncedValue
        ? (
          <>
            {isLoading
              ? <Box className={classes.centeredText}>{textKeys.LOADING}</Box>
              : (
                <WhetherModule
                  location={location}
                  coordinates={coordinates}
                  error={isError}
                  errorText={errorText}
                />
              )}
          </>
        )
        : <Box className={classes.centeredText}>{textKeys.WELCOME_TEXT}</Box>}
    </Box>
  );
};

export default App;
