import useStyles from './style';
import placeholder from '../../assets/placeholder.svg';
import iconeupload from '../../assets/icone-upload.svg';
import { toast } from 'react-toastify';

const toastOpts = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

function UploadImagem({ imagem, setImagem, base64, setBase64 }) {
  const classes = useStyles();
  const tiposAceitos = ['image/png', 'image/jpeg'];

  const uploadImage = async (e) => {
    const arquivo = e.target.files[0];
    if (!arquivo) return;
    const resultado = await convertBase64(arquivo);
    const tipo = resultado.data.split(',')[0];
    if (!tiposAceitos.some((item) => tipo.includes(item))) {
      toast.error('Formato de imagem não suportado.', toastOpts);
      return;
    }
    setBase64(resultado.text);
    setImagem(resultado.data);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve({
          text: fileReader.result.split(',')[1],
          data: fileReader.result,
        });
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className={classes.uploadContainer}>
      {!imagem ? (
        <img
          className={classes.uploadPlaceholder}
          src={placeholder}
          alt='sem imagem'
        />
      ) : (
        <img
          src={base64 ? imagem : `${imagem}?${Date.now()}`}
          className={classes.imagemUpload}
          alt='imagem'
        />
      )}

      <input
        className={classes.inputArquivo}
        type='file'
        id='upteste'
        onChange={(e) => {
          uploadImage(e);
        }}
      />

      <div className={classes.uploadMessage}>
        <img src={iconeupload} alt='upload de imagem' />
        <p>
          Clique ou arraste
          <br />
          para adicionar uma imagem
        </p>
      </div>
    </div>
  );
}

export default UploadImagem;
