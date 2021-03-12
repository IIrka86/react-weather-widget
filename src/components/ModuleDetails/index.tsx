import { Box, Typography } from '@material-ui/core';
import React, { memo, VFC } from 'react';
import textKeys from '@/constants/textKey';
import useStyles from './moduleDetails.styles';

const ModuleDetails: VFC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.moduleDetails}>
      <Typography className={classes.location}>location, BY</Typography>
      <Typography className={classes.day}>Sunday 9pm</Typography>
      <Box className={classes.weatherInfo}>
        <Box display="flex" alignItems="center">
          <img
            alt="icon"
            src="http://openweathermap.org/img/wn/10d.png"
            className={classes.icon}
          />
          <Typography className={classes.degree}>{`28${textKeys.DEGREE}`}</Typography>
          <Box display="flex">
            <span>{textKeys.FAHRENHEIT}</span>
            <span>/</span>
            <span>{textKeys.CELSIUS}</span>
          </Box>
        </Box>
        <Box>
          <Typography>{`${textKeys.HUMIDITY}:`}</Typography>
          <Typography>{`${textKeys.WIND}:`}</Typography>
          <Typography>{`${textKeys.HUMIDITY}:`}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(ModuleDetails);
