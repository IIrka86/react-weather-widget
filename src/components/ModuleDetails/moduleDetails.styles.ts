import { makeStyles } from '@material-ui/core';

export default makeStyles({
  moduleDetails: {
    position: 'absolute',
    width: 550,
    height: 137,
    left: 0,
    top: 0,
    padding: '20px 20px 0 20px',
  },
  location: {
    fontWeight: 700,
    fontSize: 20,
    lineHeight: '23px',
    color: '#333333',
  },
  day: {
    fontSize: 14,
    lineHeight: '16px',
    color: '#666666',
    height: 32,
  },
  icon: {
    width: 64,
    height: 64,
  },
  degree: {
    fontWeight: 700,
    fontSize: 44,
    lineHeight: '52px',
    minWidth: 68,
  },
  typeWrapper: {
    display: 'flex',
    fontSize: 14,
    lineHeight: '16px',
    minHeight: '52px',
    paddingTop: '12px',
    paddingLeft: '6px',
  },
  unselectedType: {
    color: '#888888',
    cursor: 'pointer',
  },
  selectedType: {
    textDecoration: 'underline',
    color: '#222222',
  },
  weatherInfo: {
    display: 'flex',
    width: '100%',
    height: 64,
    '& > div': {
      width: '50%',
    },
    '& > div:last-child': {
      paddingTop: 9,
      '& > p': {
        fontSize: 14,
        lineHeight: '16px',
        color: '#222222',
        marginTop: 2,
      },
    },
  },
});
