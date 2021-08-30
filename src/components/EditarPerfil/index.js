import useStyles from './style';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import BotoesAddEdit from '../BotoesAddEdit';
import UploadImagem from '../UploadImagem';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import apiAddress from '../../utils/apiAddress';

function EditarPerfil({ modalAberto, setToggle, informacoesUsuario }) {
  const classes = useStyles();
  const { token } = useAuth();
  const { handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagem, setImagem] = useState(informacoesUsuario.restaurante_imagem);
  const [base64, setBase64] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [informacoes, setInformacoes] = useState({
    ...informacoesUsuario,
    taxa_entrega: String(
      (informacoesUsuario.taxa_entrega / 100).toFixed(2)
    ).replace('.', ','),
    valor_minimo_pedido: String(
      (informacoesUsuario.valor_minimo_pedido / 100).toFixed(2)
    ).replace('.', ','),
  });
  const [senhas, setSenhas] = useState({ senha: '', senhaconfirm: '' });
  //
  const toastOpts = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPasswordConfirm = () => {
    setShowPasswordConfirm((prevValue) => !prevValue);
  };

  const handleMouseDownPasswordConfirm = (e) => {
    e.preventDefault();
  };

  const isValid = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!informacoes.nome) {
      toast.error('O nome é obrigatório.', toastOpts);
      return false;
    }
    if (!informacoes.email) {
      toast.error('O email é obrigatório.', toastOpts);
      return false;
    }
    if (!re.test(informacoes.email.toLowerCase())) {
      toast.error('O email é inválido.', toastOpts);
      return false;
    }
    if (!informacoes.restaurante_nome) {
      toast.error('O nome do restaurante é obrigatório.', toastOpts);
      return false;
    }
    if (!informacoes.categoria_id) {
      toast.error('A categoria é obrigatória.', toastOpts);
      return false;
    }
    if (!informacoes.taxa_entrega) {
      toast.error('A taxa de entrega é obrigatória.', toastOpts);
      return false;
    }
    if (isNaN(Number(informacoes.taxa_entrega.replace(',', '.')))) {
      toast.error('A taxa de entrega é inválida.', toastOpts);
      return false;
    }
    if (!informacoes.tempo_entrega_minutos) {
      toast.error('O tempo de entrega é obrigatório.', toastOpts);
      return false;
    }
    if (informacoes.tempo_entrega_minutos % 1 > 0) {
      toast.error('O tempo de entrega deve ser um número inteiro.', toastOpts);
      return false;
    }
    if (!informacoes.valor_minimo_pedido) {
      toast.error('O valor mínimo do pedido é obrigatório.', toastOpts);
      return false;
    }
    if (isNaN(Number(informacoes.valor_minimo_pedido.replace(',', '.')))) {
      toast.error('O valor mínimo do pedido é inválido.', toastOpts);
      return false;
    }
    if (
      (senhas.senha && !senhas.senhaconfirm) ||
      (!senhas.senha && senhas.senhaconfirm)
    ) {
      toast.error(
        'As duas senhas são obrigatórias para realizar alteração.',
        toastOpts
      );
      return false;
    }
    if (senhas.senha !== senhas.senhaconfirm) {
      toast.error('As duas senhas não conferem.', toastOpts);
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    setLoading(false);
    const valido = isValid();
    if (!valido) return;
    setLoading(true);
    try {
      const objetoAtualizar = {
        nome: informacoes.nome,
        email: informacoes.email,
        restaurante: {
          nome: informacoes.restaurante_nome,
          descricao: informacoes.descricao,
          idCategoria: informacoes.categoria_id,
          taxaEntrega: (
            Number(informacoes.taxa_entrega.replace(',', '.')) * 100
          ).toFixed(0),
          tempoEntregaEmMinutos: informacoes.tempo_entrega_minutos,
          valorMinimoPedido: (
            Number(informacoes.valor_minimo_pedido.replace(',', '.')) * 100
          ).toFixed(0),
          imagem: base64 ? base64 : undefined,
        },
      };
      if (senhas.senha) {
        objetoAtualizar.senha = senhas.senha;
      }

      const response = await fetch(`${apiAddress}/usuarios`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(objetoAtualizar),
      });
      if (!response.ok) {
        toast.error('Ocorreu um erro ao editar as informações.', toastOpts);
        setLoading(false);
        return;
      }
      setToggle((prevValue) => !prevValue);
      setLoading(false);
      toast.success('Perfil editado com sucesso.', toastOpts);
      modalAberto(false);
    } catch (error) {
      toast.error('Ocorreu um erro ao editar as informações.', toastOpts);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(`${apiAddress}/restaurante/categorias`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const dados = await response.json();
        setCategorias(dados);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCategorias();
  }, []);

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
        <div className={classes.cardModalEditarPerfil}>
          <h3>Editar perfil</h3>
          <form className={classes.modalForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.colunaEsquerda}>
              <div className={classes.containerInput}>
                <label htmlFor='nome'>Nome de usuário</label>
                <TextField
                  className={classes.input}
                  id='nome'
                  variant='outlined'
                  value={informacoes.nome}
                  onChange={(e) =>
                    setInformacoes({ ...informacoes, nome: e.target.value })
                  }
                />
              </div>
              <div className={classes.containerInput}>
                <label htmlFor='email'>Email</label>
                <TextField
                  className={classes.input}
                  id='email'
                  variant='outlined'
                  value={informacoes.email}
                  onChange={(e) =>
                    setInformacoes({ ...informacoes, email: e.target.value })
                  }
                />
              </div>
              <div className={classes.containerInput}>
                <label htmlFor='nomeRestaurante'>Nome do restaurante</label>
                <TextField
                  className={classes.input}
                  id='nomeRestaurante'
                  variant='outlined'
                  value={informacoes.restaurante_nome}
                  onChange={(e) =>
                    setInformacoes({
                      ...informacoes,
                      restaurante_nome: e.target.value,
                    })
                  }
                />
              </div>
              <div className={classes.containerInput}>
                <label id='label-categoria' htmlFor='categoria'>
                  Categoria do restaurante
                </label>
                <FormControl variant='outlined' className={classes.formControl}>
                  <Select
                    value={informacoes.categoria_id}
                    onChange={(e) =>
                      setInformacoes({
                        ...informacoes,
                        categoria_id: e.target.value,
                      })
                    }
                    labelId='label-categoria'
                    id='categoria'
                  >
                    {categorias.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.nome}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className={classes.containerInput}>
                <label htmlFor='descricao'>Descrição</label>
                <TextField
                  id='descricao'
                  variant='outlined'
                  multiline
                  rows={2}
                  value={informacoes.descricao}
                  onChange={(e) =>
                    setInformacoes({
                      ...informacoes,
                      descricao: e.target.value,
                    })
                  }
                />
                <p className={classes.helperMultiline}>Máx.: 50 caracteres</p>
              </div>
              <div className={classes.containerInput}>
                <label htmlFor='taxa'>Taxa de entrega</label>
                <TextField
                  className={classes.input}
                  type='text'
                  id='taxa'
                  variant='outlined'
                  value={informacoes.taxa_entrega}
                  onChange={(e) =>
                    setInformacoes({
                      ...informacoes,
                      taxa_entrega: e.target.value,
                    })
                  }
                />
              </div>
              <div className={classes.containerInput}>
                <label htmlFor='tempoEntrega'>Tempo estimado de entrega</label>
                <TextField
                  className={classes.input}
                  type='number'
                  id='tempoEntrega'
                  variant='outlined'
                  value={informacoes.tempo_entrega_minutos}
                  onChange={(e) =>
                    setInformacoes({
                      ...informacoes,
                      tempo_entrega_minutos: e.target.value,
                    })
                  }
                />
              </div>
              <div className={classes.containerInput}>
                <label htmlFor='minimo'>Valor mínimo do pedído</label>
                <TextField
                  className={classes.input}
                  id='minimo'
                  type='text'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>R$</InputAdornment>
                    ),
                  }}
                  variant='outlined'
                  placeholder='00,00'
                  value={informacoes.valor_minimo_pedido}
                  onChange={(e) =>
                    setInformacoes({
                      ...informacoes,
                      valor_minimo_pedido: e.target.value,
                    })
                  }
                />
              </div>
              <div className={classes.containerInput}>
                <label htmlFor='senha'>Senha</label>
                <FormControl className={classes.input} variant='outlined'>
                  <OutlinedInput
                    className={classes.input}
                    id='senha'
                    type={showPassword ? 'text' : 'password'}
                    value={senhas.senha}
                    onChange={(e) =>
                      setSenhas({ ...senhas, senha: e.target.value })
                    }
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className={classes.containerInput}>
                <label htmlFor='confirmasenha'>Repita a senha</label>
                <FormControl className={classes.input} variant='outlined'>
                  <OutlinedInput
                    className={classes.input}
                    id='confirmasenha'
                    type={showPasswordConfirm ? 'text' : 'password'}
                    value={senhas.senhaconfirm}
                    onChange={(e) =>
                      setSenhas({
                        ...senhas,
                        senhaconfirm: e.target.value,
                      })
                    }
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPasswordConfirm}
                          onMouseDown={handleMouseDownPasswordConfirm}
                          edge='end'
                        >
                          {showPasswordConfirm ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
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
                titulo='Editar informações'
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditarPerfil;
