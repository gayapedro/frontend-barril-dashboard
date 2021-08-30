import useStyles from './style';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import BotoesAddEdit from '../BotoesAddEdit';
import UploadImagem from '../UploadImagem';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import apiAddress from '../../utils/apiAddress';

function EditarProduto({ modalAberto, id, setToggle }) {
  const classes = useStyles();
  const { token } = useAuth();
  const [dadosProduto, setDadosProduto] = useState({
    ativo: false,
    permite_observacoes: false,
    preco: '',
  });
  const [loading, setLoading] = useState(false);
  const [imagem, setImagem] = useState();
  const [base64, setBase64] = useState(null);
  const [dadosCarregados, setDadosCarregados] = useState(false);

  const toastOpts = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const isValid = () => {
    if (!dadosProduto.nome) {
      toast.error('O nome do produto é obrigatório.', toastOpts);
      return false;
    }
    if (!dadosProduto.preco) {
      toast.error('O valor do produto é obrigatório.', toastOpts);
      return false;
    }
    if (isNaN(Number(dadosProduto.preco.replace(',', '.')))) {
      toast.error('O valor do produto é inválido.', toastOpts);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;
    setLoading(true);

    try {
      if (dadosProduto.ativo) {
        const response = await fetch(`${apiAddress}/produtos/${id}/ativar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          setLoading(false);
          toast.error('Não foi possível editar o produto.', toastOpts);
          return;
        }
      } else {
        const response = await fetch(`${apiAddress}/produtos/${id}/desativar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          setLoading(false);
          toast.error('Não foi possível editar o produto.', toastOpts);
          return;
        }
      }

      const response = await fetch(`${apiAddress}/produtos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...dadosProduto,
          preco: (
            Number(String(dadosProduto.preco).replace(',', '.')) * 100
          ).toFixed(0),
          permiteObservacoes: dadosProduto['permite_observacoes'],
          imagem: base64,
        }),
      });
      if (!response.ok) {
        setLoading(false);
        toast.error('Não foi possível editar o produto.', toastOpts);
        return;
      }
      toast.success('Produto editado com sucesso.');
      modalAberto(false);
      setToggle((prevValue) => !prevValue);
    } catch (error) {
      toast.error('Não foi possível editar o produto.', toastOpts);
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    setDadosProduto({
      ...dadosProduto,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    const fetchDados = async () => {
      const response = await fetch(`${apiAddress}/produtos/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const dados = await response.json();
      setDadosProduto({
        ...dados[0],
        preco: String((dados[0].preco / 100).toFixed(2)).replace('.', ','),
      });

      setDadosCarregados(true);
    };

    fetchDados();
  }, []);

  useEffect(() => {
    setImagem(dadosProduto.imagem);
  }, [dadosCarregados]);

  return (
    <>
      {loading && (
        <div className={classes.backdropLoading}>
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        </div>
      )}
      <div className={classes.backdrop}>
        <div className={classes.cardModalEditar}>
          <h3>Editar produto</h3>
          <form onSubmit={handleSubmit} className={classes.modalForm}>
            <div className={classes.colunaEsquerda}>
              <div className={classes.containerInput}>
                <label htmlFor='usuario'>Nome</label>
                <TextField
                  className={classes.input}
                  id='usuario'
                  variant='outlined'
                  value={dadosProduto.nome}
                  onChange={(e) =>
                    setDadosProduto({ ...dadosProduto, nome: e.target.value })
                  }
                />
              </div>
              <div className={classes.containerInput}>
                <label htmlFor='descricao'>Descrição</label>
                <TextField
                  id='descricao'
                  variant='outlined'
                  multiline
                  rows={2}
                  value={dadosProduto.descricao}
                  onChange={(e) =>
                    setDadosProduto({
                      ...dadosProduto,
                      descricao: e.target.value,
                    })
                  }
                ></TextField>
                <p className={classes.helperMultiline}>Máx.: 50 caracteres</p>
              </div>
              <div className={classes.containerInput}>
                <label htmlFor='minimo'>Valor</label>
                <TextField
                  className={classes.inputMenor}
                  id='minimo'
                  type='text'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>R$</InputAdornment>
                    ),
                  }}
                  variant='outlined'
                  placeholder='00,00'
                  value={dadosProduto.preco}
                  onChange={(e) =>
                    setDadosProduto({ ...dadosProduto, preco: e.target.value })
                  }
                />
              </div>
              <div>
                <div className={classes.switch}>
                  <Switch
                    name='ativo'
                    value={dadosProduto.ativo}
                    checked={dadosProduto.ativo}
                    onChange={handleChange}
                  />
                  <p>Ativar produto</p>
                </div>
                <div className={classes.switch}>
                  <Switch
                    name='permite_observacoes'
                    value={dadosProduto.permite_observacoes}
                    checked={dadosProduto.permite_observacoes}
                    onChange={handleChange}
                  />
                  <p>Permitir observações</p>
                </div>
              </div>
            </div>
            <div className={classes.colunaDireita}>
              <UploadImagem
                imagem={imagem}
                setImagem={setImagem}
                base64={base64}
                setBase64={setBase64}
              />
              <BotoesAddEdit
                modalAberto={modalAberto}
                titulo='Salvar alterações'
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditarProduto;
