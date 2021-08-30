import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(32,32,32,0.6)',
    backdropFilter: 'blur(12px)',
    zIndex: 6,
    display: 'grid',
    placeContent: 'center',
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
  cardModalAdicionar: {
    boxSizing: 'border-box',
    width: 1009,
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: 'white',
    borderRadius: 16,
    boxShadow: '0px 4px 16px rgba(50, 50, 50, 0.4)',
    padding: 64,
    display: 'flex',
    flexDirection: 'column',
    '& > h3': {
      color: '#D13201',
      fontFamily: "'Baloo 2', cursive",
      fontSize: 32,
      margin: 0,
      marginBottom: 40,
    },
  },
  modalForm: {
    width: '100%',
    height: '100%',
    display: 'flex',
    gap: 49,
    '& > *': {
      width: '50%',
      height: '100%',
    },
  },
  colunaEsquerda: {
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
  },
  colunaDireita: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  inputMenor: {
    '&>*': {
      height: 47,
      width: '40%',
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
  switch: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    '& > p': {
      color: '#525459',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: 16,
    },
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
}));

export default useStyles;
