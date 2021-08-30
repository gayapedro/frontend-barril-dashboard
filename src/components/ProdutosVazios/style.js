import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  produtosVaziosContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 32,
    textAlign: 'center',
    marginTop: 202,
    '& > p': {
      color: '#525459',
      fontFamily: 'Montserrat',
      fontSize: 16,
      lineHeight: '170%',
      margin: 0,
    },
    '& > button': {
      all: 'unset',
      cursor: 'pointer',
      padding: '11px 40px',
      borderRadius: 20,
      backgroundColor: '#D13201',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: 14,
      color: 'white',
    },
  },
}));

export default useStyles;
