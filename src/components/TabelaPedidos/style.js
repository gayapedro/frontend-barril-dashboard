import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  containerPedidos: {
    boxSizing: 'border-box',
    margin: '0 92px',
    marginTop: 80,
    width: 'calc(100% - 92px*2)',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 33,
  },
  backdropLoading: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 7,
    display: 'grid',
    placeContent: 'center',
  },
  loading: {
    zIndex: 9,
    display: 'grid',
    placeContent: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    boxShadow:
      'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
  },
  botoes: {
    width: 'max-content',
    marginLeft: 'auto',
    '& > button': {
      all: 'unset',
      cursor: 'pointer',
      width: 120,
      height: 41,
      textAlign: 'center',
      fontFamily: 'Lato',
      fontSize: 14,
      fontWeight: 700,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
    },
    '& :nth-child(1)': {
      borderRadius: '5px 0px 0px 5px',
    },
    '& :nth-child(2)': {
      borderRadius: '0px 5px 5px 0px',
    },
  },
  selecionado: {
    color: 'white !important',
    backgroundColor: '#D13201 !important',
  },
  naoSelecionado: {
    color: 'rgba(18, 18, 18, 0.8) !important',
    backgroundColor: '#F9F9F9 !important',
  },
  tabela: {
    fontFamily: 'Lato',
    fontSize: 14,
    color: 'black',
  },
  tabelaHeader: {
    display: 'flex',
    gap: 20,
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    height: 58,
    '& > div': {
      textAlign: 'center',
      width: '20%',
      '& > p': {
        margin: 0,
        fontWeight: 700,
      },
    },
  },
  semPedidos: {
    width: '100%',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 600,
    fontFamily: 'Montserrat',
    color: 'rgba(80, 80, 80, 0.87)',
  },
}));

export default useStyles;
