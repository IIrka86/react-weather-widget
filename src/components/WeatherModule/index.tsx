import { DayInfo } from '@/interfaces/daysInfoResponse';
import { Box } from '@material-ui/core';
import React, {
  memo, useCallback, useState, VFC,
} from 'react';
import ModuleDaysItem from '../ModuleDaysItem';
import ModuleDetails from '../ModuleDetails';
import useStyles from './weatherModule.styles';

interface WeatherModuleProps {
  daysInfo: DayInfo[];
}

const WhetherModule: VFC<WeatherModuleProps> = ({
  daysInfo,
}: WeatherModuleProps) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleSelectItem = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <Box className={classes.module}>
      <Box position="relative">
        <ModuleDetails />
        <Box className={classes.moduleDays}>
          {daysInfo.map((dayInfo, index) => (
            <ModuleDaysItem
              key={dayInfo.dt}
              index={index}
              dayInfo={dayInfo}
              onSelect={handleSelectItem}
              selected={index === selectedIndex}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(WhetherModule);
