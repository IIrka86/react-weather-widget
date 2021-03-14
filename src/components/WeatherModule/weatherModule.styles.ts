import { makeStyles } from '@material-ui/core';

export default makeStyles({
  module: {
    position: 'absolute',
    width: 590,
    height: 300,
    left: 44,
    top: 125,
    background: '#ffffff',
    border: '1px solid rgba(150, 150, 150, 0.3)',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
    borderRadius: '4px',
  },
  moduleDays: {
    position: 'absolute',
    width: 591,
    height: 144,
    left: -1,
    top: 157,
    display: 'flex',
    alignItems: 'flex-start',
    padding: 0,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
  },
});
