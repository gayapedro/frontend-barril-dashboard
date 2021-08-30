import { makeStyles } from '@material-ui/core/styles';
import BackgroundCadastro from '../../assets/bg-cadastro.png';

const useStyles = makeStyles((theme) => ({
  cadastroContainer: {
    backgroundImage: `url(${BackgroundCadastro})`,
    backgroundPosition: 'center',
    width: '100%',
    maxHeight: '100vh',
    position: 'relative',
    zIndex: 0,
    display: 'flex',
    overflow: 'hidden',
  },
  illustrationLogin: {
    height: '100%',
    marginTop: 300,
    zIndex: -1,
  },
  root: {
    width: '45%',
    backgroundColor: 'white',
    height: '100vh',
    borderBottomRightRadius: 88,
    boxSizing: 'border-box',
    paddingTop: 50,
    paddingLeft: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    zIndex: 3,
  },
  cadastroHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  cadastroTitle: {
    fontSize: 32,
    fontFamily: "'Baloo 2', cursive",
    color: '#D13201',
    fontWeight: 700,
    margin: 0,
  },
  form: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 0,
    gap: 30,
    '& > *': {
      width: '80%',
      padding: 0,
    },
  },
  containerInput: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    '& > label': {
      fontSize: 16,
      color: '#393C40',
      marginLeft: 16,
      fontFamily: 'Montserrat',
      fontWeight: '600',
      zIndex: 1,
    },
  },
  input: {
    '&>*': {
      height: 47,
    },
  },
  helperMultiline: {
    margin: 0,
    marginLeft: 24,
    fontFamily: 'Montserrat',
    color: '#6F7377',
    fontSize: 14,
    lineHeight: '17px',
  },
  botaoProximo: {
    all: 'unset',
    cursor: 'pointer',
    padding: '12px 40px',
    borderRadius: 25,
    backgroundColor: '#D13201',
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '500',
    textTransform: 'capitalize',
    alignSelf: 'center',
    '&:hover': {
      backgroundColor: '#FB3B00',
    },
  },
  botaoVoltar: {
    all: 'unset',
    cursor: 'pointer',
    fontSize: 14,
    color: '#D13201',
    fontFamily: 'Montserrat',
    fontWeight: '500',
    textTransform: 'capitalize',
    alignSelf: 'center',
    '&:disabled': {
      color: '#C9CCD1',
      cursor: 'not-allowed',
    },
  },
  footerCadastro: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 35,
  },
  botoes: {
    display: 'flex',
    gap: 16,
  },
  testee: {
    backgroundColor: 'black',
  },
  backdrop: {
    position: 'absolute',
    zIndex: 5,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'grid',
    placeContent: 'center',
  },
  noBackdrop: {
    display: 'none',
  },
}));

export default useStyles;
