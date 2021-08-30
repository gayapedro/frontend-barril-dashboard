import { useState, useEffect } from 'react';
import useStyles from './style';
import LinhaTabela from '../LinhaTabela';
import useAuth from '../../hooks/useAuth';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import apiAddress from '../../utils/apiAddress';

function TabelaPedidos({ setModalDetalhe, setIdPedido, toggle }) {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const [entregue, setEntregue] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const { token } = useAuth();

  const toastOpts = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiAddress}/pedidos`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const dados = await response.json();
        if (!response.ok) {
          setLoading(false);
          toast.error('Erro ao buscar pedidos.', toastOpts);
          return;
        }
        setLoading(false);
        setPedidos(dados);
      } catch (error) {
        setLoading(false);
        toast.error('Erro ao buscar pedidos.', toastOpts);
      }
      setLoading(false);
    };

    fetchPedidos();
  }, [toggle]);

  return (
    <div className={classes.containerPedidos}>
      {loading && (
        <div className={classes.backdropLoading}>
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        </div>
      )}
      <div className={classes.botoes}>
        <button
          onClick={() => setEntregue(false)}
          className={!entregue ? classes.selecionado : classes.naoSelecionado}
        >
          Não entregues
        </button>
        <button
          onClick={() => setEntregue(true)}
          className={entregue ? classes.selecionado : classes.naoSelecionado}
        >
          Entregues
        </button>
      </div>
      <div className={classes.tabela}>
        <div className={classes.tabelaHeader}>
          <div>
            <p>Pedido</p>
          </div>
          <div>
            <p>Itens</p>
          </div>
          <div>
            <p>Endereço</p>
          </div>
          <div>
            <p>Cliente</p>
          </div>
          <div>
            <p>Total</p>
          </div>
        </div>
        {pedidos.map((item) => {
          if (
            (item.saiu_entrega && entregue) ||
            (!item.saiu_entrega && !entregue)
          ) {
            return (
              <LinhaTabela
                key={item.id}
                setIdPedido={setIdPedido}
                setModalDetalhe={setModalDetalhe}
                pedido={item}
              />
            );
          }
          return '';
        })}
        {((!entregue && !pedidos.some((item) => !item.saiu_entrega)) ||
          (entregue && !pedidos.some((item) => item.saiu_entrega))) && (
          <div className={classes.semPedidos}>Nenhum pedido cadastrado.</div>
        )}
      </div>
    </div>
  );
}

export default TabelaPedidos;
