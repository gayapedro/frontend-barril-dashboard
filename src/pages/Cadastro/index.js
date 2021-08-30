import './style.css';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import CircularProgress from '@material-ui/core/CircularProgress';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IllustrationCadastro from '../../assets/illustration.svg';
import { toast } from 'react-toastify';
import LinkEntrarCadastrar from '../../components/LinkEntrarCadastrar';
import { useState, useEffect } from 'react';
import useStyles from './style';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import apiAddress from '../../utils/apiAddress';

const toastOpts = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const { token } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmasenha: '',
    restaurante: '',
    categoria: '',
    descricao: '',
    taxaEntrega: '',
    tempoEntregaEmMinutos: 0,
    valorMinimoPedido: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.taxaEntrega) {
      toast.error('A taxa de entrega é obrigatória.', toastOpts);
      return;
    }
    if (isNaN(Number(values.taxaEntrega.replace(',', '.')))) {
      toast.error('A taxa de entrega é inválida.', toastOpts);
      return;
    }
    if (!values.tempoEntregaEmMinutos) {
      toast.error('O tempo de entrega é obrigatório.', toastOpts);
      return;
    }
    if (values.tempoEntregaEmMinutos % 1 > 0) {
      toast.error('O tempo de entrega deve ser um número inteiro.', toastOpts);
      return;
    }
    if (!values.valorMinimoPedido) {
      toast.error('O valor mínimo do pedido é obrigatório.', toastOpts);
      return;
    }
    if (isNaN(Number(values.valorMinimoPedido.replace(',', '.')))) {
      toast.error('O valor mínimo do pedido é inválido.', toastOpts);
      return;
    }
    setLoading(true);
    try {
      const objetoCadastro = {
        nome: values.nome,
        email: values.email,
        senha: values.senha,
        restaurante: {
          nome: values.restaurante,
          descricao: values.descricao,
          idCategoria: values.categoria,
          taxaEntrega: (
            Number(values.taxaEntrega.replace(',', '.')) * 100
          ).toFixed(0),
          tempoEntregaEmMinutos: values.tempoEntregaEmMinutos,
          valorMinimoPedido: (
            Number(values.valorMinimoPedido.replace(',', '.')) * 100
          ).toFixed(0),
        },
      };

      const response = await fetch(`${apiAddress}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objetoCadastro),
      });
      const dados = await response.json();
      if (dados === 'email deve ser um email válido') {
        toast.error('Email inválido.', toastOpts);
        setLoading(false);
        return;
      }
      if (!response.ok) {
        toast.error('Ocorreu um erro ao cadastrar.', toastOpts);
        setLoading(false);
        return;
      }

      setLoading(false);
      toast.success('Cadastro realizado com sucesso.', toastOpts);
      history.push('/');
    } catch (error) {
      toast.error('Ocorreu um erro ao cadastrar.', toastOpts);
    }
    setLoading(false);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (activeStep === 0) {
      if (!values.nome) {
        toast.error('O nome de usuário é obrigatório.', toastOpts);
        return;
      }
      if (!values.email) {
        toast.error('O email é obrigatório.', toastOpts);
        return;
      }
      if (!re.test(values.email.toLowerCase())) {
        toast.error('O email é inválido.', toastOpts);
        return;
      }
      if (!values.senha) {
        toast.error('A senha é obrigatória.', toastOpts);
        return;
      }
      if (!values.confirmasenha) {
        toast.error('A confirmação de senha é obrigatória.', toastOpts);
        return;
      }
      if (values.senha !== values.confirmasenha) {
        toast.error('As duas senhas não conferem.', toastOpts);
        return;
      }
    } else if (activeStep === 1) {
      if (!values.restaurante) {
        toast.error('O nome do restaurante é obrigatório.', toastOpts);
        return;
      }
      if (!values.categoria) {
        toast.error('A categoria do restaurante é obrigatória.', toastOpts);
        return;
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (e) => {
    e.stopPropagation();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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

  useEffect(() => {
    if (token) {
      history.push('/pedidos');
    }
  }, []);

  return (
    <div className={classes.cadastroContainer}>
      <div className={loading ? classes.backdrop : classes.noBackdrop}>
        <CircularProgress />
      </div>
      <div className={classes.root}>
        <div className={classes.cadastroHeader}>
          <h2 className={classes.cadastroTitle}>Cadastro</h2>

          <Stepper className={classes.stepper} activeStep={activeStep}>
            <Step>
              <StepLabel />
            </Step>
            <Step>
              <StepLabel />
            </Step>
            <Step>
              <StepLabel />
            </Step>
          </Stepper>
        </div>
        <div>
          <form className={classes.form} noValidate autoComplete='off'>
            {activeStep === 0 && (
              <>
                <div className={classes.containerInput}>
                  <label htmlFor='usuario'>Nome de usuário</label>
                  <TextField
                    className={classes.input}
                    id='usuario'
                    variant='outlined'
                    value={values.nome}
                    onChange={(e) =>
                      setValues({ ...values, nome: e.target.value })
                    }
                  />
                </div>
                <div className={classes.containerInput}>
                  <label htmlFor='email'>Email</label>
                  <TextField
                    className={classes.input}
                    id='email'
                    variant='outlined'
                    value={values.email}
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
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
                      value={values.senha}
                      onChange={(e) =>
                        setValues({ ...values, senha: e.target.value })
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
                      value={values.confirmasenha}
                      onChange={(e) =>
                        setValues({ ...values, confirmasenha: e.target.value })
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
              </>
            )}
            {activeStep === 1 && (
              <>
                <div className={classes.containerInput}>
                  <label htmlFor='restaurante'>Nome do restaurante</label>
                  <TextField
                    className={classes.input}
                    id='restaurante'
                    variant='outlined'
                    value={values.restaurante}
                    onChange={(e) =>
                      setValues({ ...values, restaurante: e.target.value })
                    }
                  ></TextField>
                </div>

                <div className={classes.containerInput}>
                  <label id='label-categoria' htmlFor='categoria'>
                    Categoria do restaurante
                  </label>
                  <FormControl
                    variant='outlined'
                    className={classes.formControl}
                  >
                    <Select
                      labelId='label-categoria'
                      id='categoria'
                      value={values.categoria}
                      onChange={(e) =>
                        setValues({ ...values, categoria: e.target.value })
                      }
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
                    value={values.descricao}
                    onChange={(e) =>
                      setValues({ ...values, descricao: e.target.value })
                    }
                    multiline
                    rows={3}
                  ></TextField>
                  <p className={classes.helperMultiline}>Máx.: 50 caracteres</p>
                </div>
              </>
            )}
            {activeStep === 2 && (
              <>
                <div className={classes.containerInput}>
                  <label htmlFor='taxa'>Taxa de entrega</label>
                  <TextField
                    className={classes.input}
                    type='text'
                    id='taxa'
                    variant='outlined'
                    value={values.taxaEntrega}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        taxaEntrega: e.target.value,
                      })
                    }
                  ></TextField>
                </div>
                <div className={classes.containerInput}>
                  <label htmlFor='tempoEntrega'>
                    Tempo estimado de entrega
                  </label>
                  <TextField
                    className={classes.input}
                    type='number'
                    id='tempoEntrega'
                    variant='outlined'
                    value={values.tempoEntregaEmMinutos}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        tempoEntregaEmMinutos: e.target.valueAsNumber,
                      })
                    }
                  ></TextField>
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
                    value={values.valorMinimoPedido}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        valorMinimoPedido: e.target.value,
                      })
                    }
                    placeholder='00,00'
                  />
                </div>
              </>
            )}
            <div className={classes.footerCadastro}>
              <div className={classes.botoes}>
                <button
                  disabled={activeStep === 0}
                  onClick={(e) => handleBack(e)}
                  className={classes.botaoVoltar}
                  type='button'
                >
                  Anterior
                </button>
                {activeStep === 2 && (
                  <button
                    onClick={(e) => handleSubmit(e)}
                    type='submit'
                    className={classes.botaoProximo}
                  >
                    Criar conta
                  </button>
                )}
                {activeStep < 2 && (
                  <button
                    type='button'
                    onClick={(e) => handleNext(e)}
                    className={classes.botaoProximo}
                  >
                    Próximo
                  </button>
                )}
              </div>
              <LinkEntrarCadastrar
                texto='Já tem uma conta?'
                titulo='Login'
                destino='/'
              />
            </div>
          </form>
        </div>
      </div>
      <img
        className={classes.illustrationLogin}
        src={IllustrationCadastro}
        alt='illustration'
      />
    </div>
  );
}

export default Cadastro;
