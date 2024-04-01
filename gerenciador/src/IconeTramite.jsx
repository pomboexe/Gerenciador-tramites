import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, IconButton } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import axios from 'axios'

function NovoTramiteIcon() {
  const [open, setOpen] = useState(false);
  const [DataHoraEnvio, setDataHoraEnvio] = useState(new Date().toISOString().slice(0, 16));
  const [documentoId, setDocumentoId] = useState('')
  const [setorEnvioId , setSetorEnvioId] = useState('')
  const [setorRecebeId, setSetorRecebeId] = useState('')


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
        await axios.post('http://localhost:3333/tramite', {
            documentoId,
            setorEnvioId,
            setorRecebeId,
            
        });
        handleClose();
    } catch (error) {
        console.error('Erro ao cadastrar documento:', error);
        }
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <AddCircleOutline />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Novo Trâmite de Documento</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="Setor de Envio" id= "setorEnvioId" fullWidth value={setorEnvioId} onChange={(e) => setSetorEnvioId(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Setor de Recebimento" fullWidth  value={setorRecebeId} onChange={(e) => setSetorRecebeId(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Número do Documento" fullWidth  value={documentoId} onChange={(e) => setDocumentoId(e.target.value)}/>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Título" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Descrição" multiline rows={4} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Data e Hora de Envio" type="datetime-local" fullWidth value={DataHoraEnvio} onChange={(e) => setDataHoraEnvio(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Anexar PDF" type="text" fullWidth />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" color="primary">Enviar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NovoTramiteIcon;