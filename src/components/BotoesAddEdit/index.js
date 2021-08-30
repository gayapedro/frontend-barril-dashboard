import useStyles from './style';

function BotoesAddEdit({ modalAberto, titulo }) {
  const classes = useStyles();

  return (
    <div className={classes.containerBotoes}>
      <button
        className={classes.botaoCancelar}
        type='button'
        onClick={() => modalAberto(false)}
      >
        Cancelar
      </button>
      <button className={classes.botaoEnviar} type='submit'>
        {titulo}
      </button>
    </div>
  );
}

export default BotoesAddEdit;
