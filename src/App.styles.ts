import { makeStyles } from '@material-ui/core';

export default makeStyles({
  app: {
    position: 'relative',
    width: 679,
    height: 512,
    background: '#ffffff',
  },
  searchBox: {
    position: 'absolute',
    width: 590,
    height: 44,
    left: 44,
    top: 70,
    background: '#ffffff',
    border: '1px solid rgba(150, 150, 150, 0.3)',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)',
    borderRadius: '4px',
    display: 'flex',
  },
  searchInput: {
    width: 540,
    height: 24,
    fontSize: 18,
    lineHeight: '21px',
    marginTop: 10,
    marginLeft: 20,
  },
  clearIcon: {
    padding: 10,
  },
  centeredText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
});
