import { makeStyles } from '@material-ui/core';

export default makeStyles({
  dayItem: {
    width: 73.88,
    height: 123,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 0 0 0 ',
    border: '1px solid rgba(150, 150, 150, 0.3)',
    cursor: 'pointer',
  },
  selectedDayItem: {
    background: '#f7f7f7',
  },
  dayName: {
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '16px',
  },
  iconWrapper: {
    width: 48,
    height: 48,
  },
  icon: {
    width: 48,
    height: 48,
  },
  hightTemperature: {
    fontWeight: 700,
    fontSize: 18,
    lineHeight: '21px',
  },
  lowTemperature: {
    fontSize: 14,
    lineHeight: '16px',
    marginTop: 2,
  },
});
