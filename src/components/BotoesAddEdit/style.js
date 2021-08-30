import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  containerBotoes: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 14,
    gap: 'auto',
  },
  botaoCancelar: {
    all: 'unset',
    cursor: 'pointer',
    color: '#D13201',
  },
  botaoEnviar: {
    all: 'unset',
    cursor: 'pointer',
    color: 'white',
    backgroundColor: '#D13201',
    borderRadius: 20,
    padding: '11px 40px',
  },
}));

export default useStyles;
