import useStyles from './style';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Header from '../../components/Header';
import ProdutosVazios from '../../components/ProdutosVazios';
import AdicionarProduto from '../../components/AdicionarProduto';
import EditarProduto from '../../components/EditarProduto';
import EditarPerfil from '../../components/EditarPerfil';
import CardProduto from '../../components/CardProduto';
import { toast } from 'react-toastify';
import apiAddress from '../../utils/apiAddress';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [informacoesUsuario, setInformacoesUsuario] = useState({});
  const [modalAdicionarProduto, setModalAdicionarProduto] = useState(false);
  const [modalEditarProduto, setModalEditarProduto] = useState(false);
  const [modalEditarPerfil, setModalEditarPerfil] = useState(false);
  const [idEditar, setIdEditar] = useState(null);
  const [imagem, setImagem] = useState({});
  const classes = useStyles();
  const { token, deslogar } = useAuth();
  const history = useHistory();
  const [toggle, setToggle] = useState(false);

  const toastOpts = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleLogout = () => {
    deslogar(history.push('/'));
  };

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const resposta = await fetch(`${apiAddress}/produtos`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const dados = await resposta.json();
        setProdutos(dados);
      } catch (error) {
        toast.error('Ocorreu um erro ao buscar produtos.', toastOpts);
      }
    };
    const fetchInformacoes = async () => {
      try {
        const resposta = await fetch(`${apiAddress}/usuarios`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const dados = await resposta.json();
        setInformacoesUsuario(dados);
        setImagem({
          url: dados.restaurante_imagem,
          hash: Date.now(),
        });
      } catch (error) {
        toast.error(
          'Ocorreu um erro ao buscar informações do usuário.',
          toastOpts
        );
      }
    };
    fetchProdutos();
    fetchInformacoes();
  }, [toggle]);

  return (
    <div className={classes.containerPaginaProdutos}>
      <Header
        imagem={imagem}
        handleLogout={handleLogout}
        informacoesUsuario={informacoesUsuario}
        setModalEditarPerfil={setModalEditarPerfil}
      />
      {produtos.length === 0 && (
        <ProdutosVazios modalAdicionar={setModalAdicionarProduto} />
      )}
      {produtos.length > 0 && (
        <div className={classes.produtosContainer}>
          <button onClick={() => setModalAdicionarProduto(true)}>
            Adicionar produto ao cardápio
          </button>
          {typeof produtos === 'object' &&
            produtos.map((item) => (
              <CardProduto
                key={item.id}
                titulo={item.nome}
                descricao={item.descricao}
                preco={item.preco}
                imagem={item.imagem}
                ativo={item.ativo}
                modalAberto={setModalEditarProduto}
                setId={setIdEditar}
                setToggle={setToggle}
                id={item.id}
              />
            ))}
        </div>
      )}
      {modalAdicionarProduto && (
        <AdicionarProduto
          modalAberto={setModalAdicionarProduto}
          setToggle={setToggle}
        />
      )}
      {modalEditarProduto && (
        <EditarProduto
          id={idEditar}
          modalAberto={setModalEditarProduto}
          setToggle={setToggle}
        />
      )}
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

export default Produtos;
