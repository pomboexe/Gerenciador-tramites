import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import axios from 'axios';

function CadastroSetor(){
    const [open, setOpen] = useState(false);
    const [SiglaSetor, setSiglaSetor] = useState('');
    const [DescSetor, setDescSetor] = useState('');
    
    const handleOpen = () => {
        setOpen(true);
      };

    const handleClose = () => {
        setOpen(false);
      };
    
    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:3333/setor', {
                SiglaSetor: String(SiglaSetor),
                DescSetor: String(DescSetor),
            });
            handleClose();
        } catch (error) {
            console.error('Erro ao cadastrar Setor:', error);
            }
      };

   return (
    <div className='cad'>
        <Stack direction="row">
            <h3>Setor</h3>
            <Button variant="contained" size='small' onClick={handleOpen}>Cadastrar</Button>
        </Stack>

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Cadastrar Novo Setor</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField autoFocus margin="dense" id="SiglaSetor" label="Sigla do Setor" type="text" fullWidth value={SiglaSetor} onChange={(e) => setSiglaSetor(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField margin="dense" id="DescSetor" multiline rows={4} label="Descrição Setor" type="text" fullWidth value={DescSetor} onChange={(e) => setDescSetor(e.target.value)} />
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

export default CadastroSetor;