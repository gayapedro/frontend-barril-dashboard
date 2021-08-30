import useStyles from './style';
import botaoFechar from '../../assets/botaocloselaranja.svg';
import { useEffect, useState } from 'react';
import CardProdutoCardapio from '../CardProdutoCardapio';
import CircularProgress from '@material-ui/core/CircularProgress';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import apiAddress from '../../utils/apiAddress';

function ModalDetalhe({ setModalDetalhe, idPedido, setToggle }) {
  const classes = useStyles();
  const [detalhes, setDetalhes] = useState({});
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleClose = () => {
    setToggle((prevValue) => !prevValue);
    setModalDetalhe(false);
  };

  const toastOpts = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleEnviarParaEntrega = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiAddress}/entrega`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: idPedido }),
      });
      if (!response.ok) {
        setLoading(false);
        toast.error('Erro ao mudar estado do pedido.', toastOpts);
        return;
      }
      setSucesso(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Erro ao mudar estado do pedido.', toastOpts);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchDetalhes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiAddress}/pedidos/${idPedido}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          toast.error('Erro ao buscar detalhes do pedido.', toastOpts);
          setLoading(false);
          return;
        }

        const dados = await response.json();
        setDetalhes(dados);
      } catch (error) {
        toast.error('Erro ao buscar detalhes do pedido.', toastOpts);
        setLoading(false);
      }
      setLoading(false);
    };

    fetchDetalhes();
  }, [idPedido]);

  return (
    <div className={classes.backdrop}>
      {loading && (
        <div className={classes.backdropLoading}>
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        </div>
      )}
      <div className={classes.card}>
        <img
          className={classes.botaoFechar}
          onClick={handleClose}
          src={botaoFechar}
          alt='fechar'
        />
        <h2>{String(detalhes.id).padStart(4, '0')}</h2>
        <p className={classes.infoCliente}>
          <span>Cliente: </span>
          {detalhes !== {} && `${detalhes?.cliente?.nome}`}
        </p>
        <p className={classes.infoCliente}>
          <span>Endereço de Entrega: </span>
          {detalhes !== {} &&
            `${detalhes?.cliente?.endereco}, ${detalhes?.cliente?.complemento}, ${detalhes?.cliente?.cep}`}
        </p>
        <div className={classes.produtos}>
          {detalhes?.produtos?.map((item) => (
            <CardProdutoCardapio produto={item} key={item.id} />
          ))}
        </div>
        <div className={classes.footer}>
          <div className={classes.footerTexto}>
            <p>Total</p>
            <h3>{`R$ ${String((detalhes.total_pedido / 100).toFixed(2)).replace(
              '.',
              ','
            )}`}</h3>
          </div>
          <button
            onClick={handleEnviarParaEntrega}
            disabled={sucesso || detalhes?.saiu_entrega}
          >
            Enviar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDetalhe;
