import useStyles from './style';
import IllustrationProdutos from '../../assets/illustration-2.svg';
import { useHistory } from 'react-router-dom';

function Header({
  informacoesUsuario,
  imagem,
  handleLogout,
  setModalEditarPerfil,
}) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.headerProdutos}>
      <img
        className={classes.imgHeader}
        src={informacoesUsuario.categoria_imagem}
        alt='header'
      />
      <img
        className={classes.imgProfile}
        src={`${imagem.url}?${imagem.hash}`}
        alt='profile'
        onClick={() => setModalEditarPerfil(true)}
      />
      <div className={classes.headerTexto}>
        <div>
          <h3>{informacoesUsuario.restaurante_nome}</h3>
          <div className={classes.containerBotoes}>
            <button onClick={() => history.push('/produtos')}>Cardápio</button>
            <button onClick={() => history.push('/pedidos')}>Pedidos</button>
          </div>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <img
        className={classes.illustrationHeader}
        src={IllustrationProdutos}
        alt='illustration'
      />
    </div>
  );
}

export default Header;
