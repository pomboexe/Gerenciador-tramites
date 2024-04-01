import Tabela from './Tabela'
import Cadastro from './Cadastrar'
import CadastroSetor from './Cadastrar-Setor';
import NovoTramiteIcon from './IconeTramite';
import { Grid } from '@mui/material';

import './App.css';
function App() {

  return (
  
    <div className='container-principal'>
      <h1>Gerenciamento de Documentos</h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Cadastro />
        </Grid>
        <Grid item xs={6}>
          <CadastroSetor />
        </Grid>
        <Grid item xs={6}>
          <NovoTramiteIcon />
        </Grid>
      </Grid>
      <Tabela />
    </div>
    
  )
}

export default App
