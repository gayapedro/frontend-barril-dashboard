import useStyles from './style';
import { useState } from 'react';

function LinhaTabela({ pedido, setModalDetalhe, setIdPedido }) {
  const classes = useStyles();
  const [mostrarMais, setMostrarMais] = useState(false);

  const handleDetalhes = () => {
    setIdPedido(pedido.id);
    setModalDetalhe(true);
  };

  const handleMostrarMais = (e, tipo) => {
    e.stopPropagation();
    if (tipo === 'mais') {
      setMostrarMais(true);
    } else {
      setMostrarMais(false);
    }
  };

  return (
    <div className={classes.linha} onClick={handleDetalhes}>
      <div>
        <p>{String(pedido.id).padStart(4, '0')}</p>
      </div>
      <div>
        {pedido.produtos.map((item, indice) => {
          if (mostrarMais) {
            return (
              <p key={item.id}>{`${item.nome} - ${item.quantidade} uni`}</p>
            );
          } else if (!mostrarMais && indice < 2) {
            return (
              <p key={item.id}>{`${item.nome} - ${item.quantidade} uni`}</p>
            );
          }
        })}
        {pedido.produtos.length > 2 && !mostrarMais && (
          <button onClick={(e) => handleMostrarMais(e, 'mais')}>
            Ver mais
          </button>
        )}
        {pedido.produtos.length > 2 && mostrarMais && (
          <button onClick={(e) => handleMostrarMais(e, 'menos')}>
            Ver menos
          </button>
        )}
      </div>
      <div>
        <p>{`${pedido.cliente.endereco}, ${pedido.cliente.complemento}, ${pedido.cliente.cep}`}</p>
      </div>
      <div>
        <p>{pedido.cliente.nome}</p>
      </div>
      <div className={classes.preco}>
        <p>{`R$ ${String((pedido.total_pedido / 100).toFixed(2)).replace(
          '.',
          ','
        )}`}</p>
      </div>
    </div>
  );
}

export default LinhaTabela;
