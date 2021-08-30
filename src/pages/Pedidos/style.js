import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  containerPaginaPedidos: {
    position: 'relative',
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
}));

export default useStyles;
