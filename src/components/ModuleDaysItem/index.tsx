import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, {
  memo, useCallback, useMemo, VFC,
} from 'react';
import textKeys from '@/constants/textKey';
import { DayInfo } from '@/interfaces/daysInfoResponse';
import { ShortWeekDay } from '@/constants/weekDay';
import useStyles from './moduleDaysItem.styles';

interface ModuleDaysItemProps {
  index: number;
  dayInfo: DayInfo;
  selected: boolean;
  onSelect: (index: number) => void;
}

const ModuleDaysItem: VFC<ModuleDaysItemProps> = ({
  index,
  dayInfo,
  selected,
  onSelect,
}: ModuleDaysItemProps) => {
  const classes = useStyles();

  const getDay = useMemo(() => {
    const date = new Date(dayInfo.dt);
    return ShortWeekDay[date.getDay()];
  }, [dayInfo.dt]);

  const dayItemClasses = clsx(classes.dayItem, {
    [classes.selectedDayItem]: selected,
  });

  const handleClick = useCallback(() => {
    onSelect(index);
  }, [index, onSelect]);

  return (
    <Box
      className={dayItemClasses}
      onClick={handleClick}
    >
      <Typography className={classes.dayName}>{getDay}</Typography>
      <Box className={classes.iconWrapper}>
        <img
          alt="icon"
          src={`http://openweathermap.org/img/wn/${dayInfo.weather[0].icon}.png`}
          className={classes.icon}
        />
      </Box>
      <Typography className={classes.hightTemperature}>
        {`${dayInfo.temp.max}${textKeys.DEGREE}`}
      </Typography>
      <Typography className={classes.lowTemperature}>
        {`${dayInfo.temp.min}${textKeys.DEGREE}`}
      </Typography>
    </Box>
  );
};

export default memo(ModuleDaysItem);
