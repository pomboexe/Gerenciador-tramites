import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './Cadastrar.css'
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import axios from 'axios';

function Cadastro(){
    const [open, setOpen] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descDocumento, setDescDocumento] = useState('');
    const [nmoDocumento, setNmoDocumento] = useState('');
    const [pathArquivoPDF, setPathArquivoPDF] = useState('');

    
    
    const handleOpen = () => {
        setOpen(true);
      };

    const handleClose = () => {
        setOpen(false);
      };
    
    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:3333/documento', {
                titulo: String(titulo),
                descDocumento: String(descDocumento),
                nmoDocumento: String(nmoDocumento),
                pathArquivoPDF: String(pathArquivoPDF)
            });
            handleClose();
        } catch (error) {
            console.error('Erro ao cadastrar documento:', error);
            }
      };

   return (
    <div className='cad'>
        <Stack direction="row">
            <h3>Documento</h3>
            <Button className='button' variant="contained" onClick={handleOpen}>Cadastrar</Button>
        </Stack>

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Cadastrar Novo Documento</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField autoFocus margin="dense" id="nmoDocumento" label="Número do Documento" type="text" fullWidth value={nmoDocumento} onChange={(e) => setNmoDocumento(e.target.value)} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField margin="dense" id="titulo" label="Título" type="text" fullWidth value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                    <   TextField margin="dense" id="descDocumento" multiline rows={5} label="Descrição do Documento" type="text" fullWidth value={descDocumento} onChange={(e) => setDescDocumento(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField margin="dense" id="pathArquivoPDF" label="Anexar PDF" type="text" value={pathArquivoPDF} onChange={(e) => setPathArquivoPDF(e.target.value)} />
                    </Grid>
            
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleSubmit}>Cadastrar</Button>
            </DialogActions>
        </Dialog>
    </div>
   )

}

export default Cadastro;