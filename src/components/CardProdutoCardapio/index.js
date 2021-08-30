import useStyles from './style';

function CardProdutoCardapio({ produto }) {
  const classes = useStyles();

  return (
    <div className={classes.cardProdutoCardapio}>
      <img src={produto.imagem} alt='produto' />
      <div className={classes.infoProduto}>
        <h3>{produto.nome}</h3>
        <p>
          {produto.quantidade === 1
            ? `${produto.quantidade} unidade`
            : `${produto.quantidade} unidades`}
        </p>
        <div className={classes.preco}>{`R$ ${String(
          (produto.valor_total / 100).toFixed(2)
        ).replace('.', ',')}`}</div>
      </div>
    </div>
  );
}

export default CardProdutoCardapio;
