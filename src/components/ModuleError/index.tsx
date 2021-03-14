import { Box, Typography } from '@material-ui/core';
import CloudOff from '@material-ui/icons/CloudOff';
import React, { memo, VFC } from 'react';
import useStyles from './moduleError.styles';

interface ModuleErrorProps {
  errorText: string;
}

const ModuleError: VFC<ModuleErrorProps> = ({
  errorText,
}: ModuleErrorProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <CloudOff className={classes.icon} />
      <Typography>{errorText}</Typography>
    </Box>
  );
};

export default memo(ModuleError);
