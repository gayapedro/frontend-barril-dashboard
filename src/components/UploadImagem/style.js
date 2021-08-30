import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  uploadContainer: {
    boxSizing: 'border-box',
    width: 384,
    height: 384,
    backgroundColor: 'white',
    backgroundImage:
      'linear-gradient(177.64deg, rgba(18, 18, 18, 0.2) 1.98%, rgba(18, 18, 18, 0.8) 98.3%)',
    borderRadius: 16,
    border: '2px solid rgba(251, 59, 0, 0.2)',
    '-webkit-background-clip': 'padding-box',
    backgroundClip: 'padding-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    zIndex: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  imgSet: {},
  imgNotSet: {
    position: 'relative',
    borderColor: 'transparent',
  },
  uploadMessage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    marginBottom: 41,
    marginTop: 44,
    zIndex: 2,
    position: 'absolute',
    '& > p': {
      margin: 0,
      color: 'white',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: 14,
      textAlign: 'center',
      zIndex: 1,
    },
    '& > img': {
      zIndex: 1,
    },
  },
  inputArquivo: {
    all: 'unset',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0,
    zIndex: 10,
    cursor: 'pointer',
  },
  imagemUpload: {
    boxSizing: 'border-box',
    borderRadius: 16,
    objectFit: 'cover',
    width: 382,
    height: 384,
  },
  uploadPlaceholder: {
    marginBottom: '45%',
  },
}));

export default useStyles;
