import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  linha: {
    display: 'flex',
    boxSizing: 'border-box',
    gap: 20,
    minHeight: 97,
    padding: '12px 0',
    alignItems: 'center',
    borderBottom: '1px solid #E0E0E0',
    cursor: 'pointer',
    '& > div': {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '20%',
    },
    '& :nth-child(2)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      textAlign: 'left',
      '& > p': {
        margin: 0,
      },
      '& button': {
        all: 'unset',
        cursor: 'pointer',
        color: '#D13201',
        fontFamily: 'Montserrat',
        fontWeight: 600,
      },
    },
  },
  preco: {
    fontWeight: 700,
  },
}));

export default useStyles;
