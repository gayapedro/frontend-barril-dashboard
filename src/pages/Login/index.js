import useStyles from './style';
import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinkEntrarCadastrar from '../../components/LinkEntrarCadastrar';
import { useForm } from 'react-hook-form';
import IllustrationLogin from '../../assets/illustration.svg';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import apiAddress from '../../utils/apiAddress';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const { logar, token } = useAuth();
  const history = useHistory();

  const toastError = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const onSubmit = async (data) => {
    if (!data.email || !data.senha) {
      toast.error('Email e senha são obrigatórios.', toastError);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${apiAddress}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        setLoading(false);
        toast.error('Email ou senha incorretos.', toastError);
        return;
      }
      const dados = await response.json();
      logar(dados.token, () => history.push('/pedidos'));
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (token) {
      history.push('/pedidos');
    }
  }, []);

  return (
    <div className={classes.containerLogin}>
      <div className={loading ? classes.backdrop : classes.noBackdrop}>
        <CircularProgress />
      </div>
      <img
        className={classes.illustrationLogin}
        src={IllustrationLogin}
        alt='illustration'
      />
      <div className={classes.root}>
        <h2 className={classes.loginTitle}>Login</h2>
        <form
          className={classes.form}
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={classes.containerInput}>
            <label htmlFor='email'>Email</label>
            <TextField
              className={classes.input}
              id='email'
              variant='outlined'
              {...register('email')}
            />
          </div>
          <div className={classes.containerInput}>
            <label htmlFor='senha'>Senha</label>
            <FormControl variant='outlined' className={classes.input}>
              <OutlinedInput
                className={classes.input}
                id='senha'
                type={showPassword ? 'text' : 'password'}
                {...register('senha')}
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
          <button type='submit' className={classes.botao}>
            Entrar
          </button>
        </form>
        <LinkEntrarCadastrar
          texto='Ainda não tem uma conta?'
          destino='/cadastro'
          titulo='Cadastre-se'
        />
      </div>
    </div>
  );
}

export default Login;
