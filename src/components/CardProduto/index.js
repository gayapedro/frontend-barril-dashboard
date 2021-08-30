import useStyles from './style';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Button from '@material-ui/core/Button';
import useAuth from '../../hooks/useAuth';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import { useState } from 'react';
import apiAddress from '../../utils/apiAddress';

function CardProduto({
  titulo,
  descricao,
  preco,
  imagem,
  id,
  modalAberto,
  setId,
  setToggle,
  ativo,
}) {
  const classes = useStyles();
  const [hoverProduto, setHoverProduto] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleDelete = async () => {
    if (ativo) {
      toast.error('Não é possível excluir um produto ativo.', toastOpts);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${apiAddress}/produtos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        toast.error('Erro ao excluir produto.', toastOpts);
        setLoading(false);
        return;
      }
      setLoading(false);
      setToggle((prevValue) => !prevValue);
      toast.success('Produto excluído com sucesso.', toastOpts);
    } catch (error) {
      toast.error('Erro ao excluir produto.', toastOpts);
    }
    setLoading(false);
  };

  return (
    <div
      onMouseEnter={() => setHoverProduto(true)}
      onMouseLeave={() => setHoverProduto(false)}
      className={classes.cardContainer}
    >
      {loading && (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      )}
      {hoverProduto && (
        <div className={classes.backdrop}>
          <button onClick={handleDelete} className={classes.botaoExcluir}>
            Excluir produto do catálogo
          </button>
          <Button
            onClick={() => {
              modalAberto(true);
              setId(id);
            }}
            endIcon={<BorderColorIcon />}
            className={classes.botaoEditar}
          >
            Editar produto
          </Button>
        </div>
      )}
      <div className={classes.cardTexto}>
        <h4>{titulo}</h4>
        <p>{descricao}</p>
        <div className={classes.containerPreco}>{`R$ ${String(
          (preco / 100).toFixed(2)
        ).replace('.', ',')}`}</div>
      </div>
      <img src={`${imagem}?${Date.now()}`} alt={titulo} />
    </div>
  );
}

export default CardProduto;
