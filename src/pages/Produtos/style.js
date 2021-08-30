import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  containerPaginaProdutos: {
    position: 'relative',
  },
  produtosContainer: {
    boxSizing: 'border-box',
    position: 'relative',
    width: '100%',
    padding: 112,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 30,
    '& > *': {
      width: 'calc(50% - 15px)',
    },
    '& > button': {
      all: 'unset',
      position: 'absolute',
      cursor: 'pointer',
      top: 20,
      right: 250,
      backgroundColor: '#D13201',
      borderRadius: 20,
      color: 'white',
      fontFamily: 'Montserrat',
      padding: '11px 40px',
      fontSize: 14,
      fontWeight: 600,
    },
  },
}));

export default useStyles;
