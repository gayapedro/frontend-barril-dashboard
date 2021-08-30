import useStyles from './style';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import BotoesAddEdit from '../BotoesAddEdit';
import UploadImagem from '../UploadImagem';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useState } from 'react';
import apiAddress from '../../utils/apiAddress';

function AdicionarProduto({ modalAberto, setToggle }) {
  const classes = useStyles();
  const { token } = useAuth();
  const { register, handleSubmit } = useForm();
  const [switchState, setSwitchState] = useState({
    ativar: true,
    observacoes: true,
  });
  const [loading, setLoading] = useState(false);
  const [imagem, setImagem] = useState('');
  const [base64, setBase64] = useState(null);

  const toastOpts = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleChange = (event) => {
    setSwitchState({
      ...switchState,
      [event.target.name]: event.target.checked,
    });
  };

  const isValid = (data) => {
    if (!data.nome) {
      toast.error('O nome do produto é obrigatório.', toastOpts);
      return false;
    }
    if (!data.valor) {
      toast.error('O valor do produto é obrigatório.', toastOpts);
      return false;
    }
    if (isNaN(Number(data.valor.replace(',', '.')))) {
      toast.error('O valor do produto é inválido.', toastOpts);
      return false;
    }
    if (!base64) {
      toast.error('A foto do produto é obrigatória.', toastOpts);
      return false;
    }
    return true;
  };

  const onSubmit = async (data) => {
    const valido = isValid(data);
    if (!valido) return;
    setLoading(true);

    const objetoAdicionar = {
      nome: data.nome,
      descricao: data.descricao,
      preco: (Number(data.valor.replace(',', '.')) * 100).toFixed(0),
      permiteObservacoes: switchState.observacoes,
      ativo: switchState.ativar,
      imagem: base64,
    };

    try {
      const response = await fetch(`${apiAddress}/produtos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(objetoAdicionar),
      });
      if (!response.ok) {
        toast.error('Não foi possível cadastrar o produto.', toastOpts);
        setLoading(false);
        return;
      }
    } catch (error) {
      toast.error('Não foi possível cadastrar o produto.', toastOpts);
    }
    setLoading(false);
    modalAberto(false);
    toast.success('Produto cadastrado com sucesso.', toastOpts);
    setToggle((prevValue) => !prevValue);
  };

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
        <div className={classes.cardModalAdicionar}>
          <h3>Novo produto</h3>
          <form className={classes.modalForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.colunaEsquerda}>
              <div className={classes.containerInput}>
                <label htmlFor='usuario'>Nome</label>
                <TextField
                  className={classes.input}
                  id='usuario'
                  variant='outlined'
                  {...register('nome')}
                />
              </div>
              <div className={classes.containerInput}>
                <label htmlFor='descricao'>Descrição</label>
                <TextField
                  id='descricao'
                  variant='outlined'
                  multiline
                  rows={2}
                  {...register('descricao')}
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
                  {...register('valor')}
                />
              </div>
              <div>
                <div className={classes.switch}>
                  <Switch
                    name='ativar'
                    checked={switchState.ativar}
                    onChange={handleChange}
                  />
                  <p>Ativar produto</p>
                </div>
                <div className={classes.switch}>
                  <Switch
                    name='observacoes'
                    checked={switchState.observacoes}
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
                titulo='Adicionar produto ao cardápio'
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdicionarProduto;
