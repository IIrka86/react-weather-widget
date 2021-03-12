import { Box, IconButton, InputBase } from '@material-ui/core';
import React, {
  useCallback, useEffect, useState,
} from 'react';
import './index.css';
import Close from '@material-ui/icons/Close';
import textKeys from '@/constants/textKey';
import { DayInfo } from '@/interfaces/daysInfoResponse';
import WhetherModule from './components/WeatherModule';
import useStyles from './App.styles';
import useDebounce from './hooks/useDebounce';
import mockResponse from './mock.json';
import useDConverter from './hooks/useConverter';

function App() {
  const classes = useStyles();
  const [inputValue, setValue] = useState<string>('');
  const [daysInfo, setDaysInfo] = useState<DayInfo[]>([] as DayInfo[]);

  const debouncedValue = useDebounce(inputValue, 1000);

  const convertedDaysInfo = useDConverter(daysInfo);

  useEffect(() => {
    setDaysInfo(mockResponse.list);
  }, []);

  useEffect(() => {
    // fetch(
    //   `http://api.openweathermap.org/data/2.5/forecast/daily?q=${debouncedValue}&cnt=8&appid=828b8df00aee04ab2dac27e5bd19e6dc`
    // ).then((response) => {
    //   console.log(response);
    // }).catch((error) => {
    //   console.log(error);
    // });
  }, [debouncedValue]);

  const handleCityChange = useCallback(({ target: { value } }) => {
    setValue(value);
  }, []);

  const handleClearClick = useCallback(() => {
    setValue('');
  }, []);

  return (
    <Box className={classes.app}>
      <Box className={classes.searchBox}>
        <InputBase
          className={classes.searchInput}
          placeholder={textKeys.ENTER_CITY_NAME}
          value={inputValue}
          onChange={handleCityChange}
        />
        <IconButton
          className={classes.clearIcon}
          onClick={handleClearClick}
        >
          <Close />
        </IconButton>
      </Box>
      <WhetherModule daysInfo={convertedDaysInfo} />
    </Box>
  );
}

export default App;
