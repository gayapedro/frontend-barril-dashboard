import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  headerProdutos: {
    position: 'relative',
  },
  imgHeader: {
    width: '100vw',
    height: '180px',
    borderBottomRightRadius: 232,
    objectFit: 'cover',
    filter: 'brightness(0.7)',
  },
  imgProfile: {
    boxSizing: 'border-box',
    width: 176,
    height: 176,
    borderRadius: '50%',
    border: '6px solid white',
    position: 'absolute',
    bottom: '-88px',
    left: '7.77%',
    zIndex: 3,
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  headerTexto: {
    display: 'flex',
    width: '65%',
    zIndex: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    marginLeft: '23%',
    bottom: 30,
    '& h3': {
      fontFamily: "'Baloo 2', cursive",
      color: 'white',
      fontSize: 40,
      margin: 0,
    },
    '& > button': {
      all: 'unset',
      cursor: 'pointer',
      fontFamily: 'Montserrat',
      fontSize: 16,
      color: 'white',
      fontWeight: 400,
    },
  },
  containerBotoes: {
    display: 'flex',
    gap: 18,
    alignItems: 'center',
    '& > button': {
      all: 'unset',
      cursor: 'pointer',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: '6.5px',
      width: 119,
      color: '#D13201',
      fontFamily: 'Montserrat',
      fontSize: 14,
      fontWeight: 600,
      textAlign: 'center',
    },
  },
  illustrationHeader: {
    position: 'absolute',
    bottom: -80,
    left: -50,
  },
}));

export default useStyles;
