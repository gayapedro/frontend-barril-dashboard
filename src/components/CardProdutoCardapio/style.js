import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardProdutoCardapio: {
    display: 'flex',
    gap: 24,
    '& > img': {
      height: 77,
      width: 77,
      borderRadius: 16,
    },
  },
  infoProduto: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: 'Montserrat',
    color: '#525459',
    '& > *': {
      margin: 0,
    },
    '& > h3': {
      fontSize: 20,
      fontWeight: 600,
    },
    '& > p': {
      fontSize: 14,
      fontWeight: 500,
    },
  },
  preco: {
    background:
      'linear-gradient(0deg, rgba(13, 138, 79, 0.1), rgba(13, 138, 79, 0.1)), #FFFFFF',
    width: 'max-content',
    borderRadius: 4,
    padding: '4px 13px',
    fontSize: 10,
    fontWeight: 600,
    color: '#006335',
  },
}));

export default useStyles;
