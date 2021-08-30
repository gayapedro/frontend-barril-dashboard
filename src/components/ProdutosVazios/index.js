import useStyles from './style';

function ProdutosVazios({ modalAdicionar }) {
  const classes = useStyles();

  return (
    <div className={classes.produtosVaziosContainer}>
      <p>
        Você ainda não tem nenhum produto no seu cardápio.
        <br />
        Gostaria de adicionar um novo produto?
      </p>
      <button onClick={() => modalAdicionar(true)}>
        Adicionar produto ao cardápio
      </button>
    </div>
  );
}

export default ProdutosVazios;
