import useStyles from './style';
import Header from '../../components/Header';
import TabelaPedidos from '../../components/TabelaPedidos';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import EditarPerfil from '../../components/EditarPerfil';
import ModalDetalhe from '../../components/ModalDetalhe';
import CircularProgress from '@material-ui/core/CircularProgress';
import apiAddress from '../../utils/apiAddress';

function Pedidos() {
  const classes = useStyles();
  const { token, deslogar } = useAuth();
  const history = useHistory();
  const [informacoesUsuario, setInformacoesUsuario] = useState({});
  const [modalEditarPerfil, setModalEditarPerfil] = useState(false);
  const [idPedido, setIdPedido] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [imagem, setImagem] = useState({});
  const [modalDetalhe, setModalDetalhe] = useState(false);

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
    const fetchInformacoes = async () => {
      setLoading(true);
      try {
        const resposta = await fetch(`${apiAddress}/usuarios`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!resposta.ok) {
          toast.error(
            'Ocorreu um erro ao buscar informações do usuário.',
            toastOpts
          );
          setLoading(false);
          return;
        }
        const dados = await resposta.json();
        setLoading(false);
        setInformacoesUsuario(dados);
        setImagem({
          url: dados.restaurante_imagem,
          hash: Date.now(),
        });
      } catch (error) {
        setLoading(false);
        toast.error(
          'Ocorreu um erro ao buscar informações do usuário.',
          toastOpts
        );
      }
      setLoading(false);
    };
    fetchInformacoes();
  }, [toggle]);

  const handleLogout = () => {
    deslogar(history.push('/'));
  };

  return (
    <div className={classes.containerPaginaPedidos}>
      {loading && (
        <div className={classes.backdropLoading}>
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        </div>
      )}
      {modalDetalhe && (
        <ModalDetalhe
          setToggle={setToggle}
          setModalDetalhe={setModalDetalhe}
          idPedido={idPedido}
        />
      )}
      <Header
        imagem={imagem}
        handleLogout={handleLogout}
        informacoesUsuario={informacoesUsuario}
        setModalEditarPerfil={setModalEditarPerfil}
      />
      <TabelaPedidos
        setIdPedido={setIdPedido}
        setModalDetalhe={setModalDetalhe}
        toggle={toggle}
      />
      {modalEditarPerfil && (
        <EditarPerfil
          modalAberto={setModalEditarPerfil}
          setToggle={setToggle}
          informacoesUsuario={informacoesUsuario}
        />
      )}
    </div>
  );
}

export default Pedidos;
