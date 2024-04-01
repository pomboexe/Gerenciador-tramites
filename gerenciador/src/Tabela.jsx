import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check'
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

function Tabela() {
  const [tramites, setTramites] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [documentoInfo, setDocumentoInfo] = useState({
    nmoDocumento: '',
    titulo: '',
    descDocumento: '',
    pathArquivoPDF: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3333/documentos')
      .then(response => {
        setTramites(response.data); 
      })
      .catch(error => {
        console.error('Erro ao obter a tabela:', error);
      });
  }, []);

  const handleEditDocument = (id, documento) => {
   
    setDocumentoInfo(documento);
    setOpenEditDialog(true);
  };

  const handleDeleteDocument = async (id) => {
    try {
      await axios.delete(`http://localhost:3333/documentos/${id}`);
      const updatedTramites = tramites.filter(item => item.Documento.id !== id);
      setTramites(updatedTramites);
    } catch (error) {
      console.error('Erro ao excluir documento:', error);
    }
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:3333/documentos/${documentoInfo.id}`, documentoInfo);
      setOpenEditDialog(false);
      
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
    setOpenEditDialog(false);
  };

  return (
    <div>
      <h2>Tabela de Documentos e Tramitação</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Número do Documento</TableCell>
              <TableCell>Título do Documento</TableCell>
              <TableCell>Setor de Envio</TableCell>
              <TableCell>Data/Hora de Envio</TableCell>
              <TableCell>Setor de Recebimento</TableCell>
              <TableCell>Data/Hora de Recebimento</TableCell>
              <TableCell>Ações</TableCell>
              <TableCell>Editar</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {tramites.map(dado => (
              <TableRow key={dado.id}>
                <TableCell>{dado.Documento ? dado.Documento.nmoDocumento : ''}</TableCell>
                <TableCell>{dado.Documento ? dado.Documento.titulo : ''}</TableCell>
                <TableCell>{dado.setor_envio_id.SiglaSetor}</TableCell>
                <TableCell>{new Date(dado.DataHoraEnvio).toLocaleString()}</TableCell>
                <TableCell>{dado.setor_recebe_id.SiglaSetor}</TableCell>
                <TableCell>{dado.DataHoraRecebido ? new Date(dado.DataHoraRecebido).toLocaleString() : 'Não recebido'}</TableCell>
                <TableCell>
                  {dado.DataHoraRecebido ? (
                    <Tooltip title="Documento já recebido">
                      <CheckIcon color="primary" />
                    </Tooltip>
                  ) : (
                    <>
                      <Tooltip title="Receber Documento">
                        <CheckIcon color="action" onClick={() => handleReceiveDocument(dado.id)} />
                      </Tooltip>
                    </>
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip title="Editar Documento">
                    <IconButton onClick={() => handleEditDocument(dado.Documento ? dado.Documento.id : '', dado.Documento)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir Documento">
                    <IconButton onClick={() => handleDeleteDocument(dado.Documento ? dado.Documento.id : '')}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Editar Documento</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField autoFocus margin="dense" id="nmoDocumento" label="Número do Documento" type="text" fullWidth value={documentoInfo.nmoDocumento} onChange={(e) => setDocumentoInfo({ ...documentoInfo, nmoDocumento: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
              <TextField margin="dense" id="titulo" label="Título" type="text" fullWidth value={documentoInfo.titulo} onChange={(e) => setDocumentoInfo({ ...documentoInfo, titulo: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField margin="dense" id="descDocumento" multiline rows={5} label="Descrição do Documento" type="text" fullWidth value={documentoInfo.descDocumento} onChange={(e) => setDocumentoInfo({ ...documentoInfo, descDocumento: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField margin="dense" id="pathArquivoPDF" label="Anexar PDF" type="text" fullWidth value={documentoInfo.pathArquivoPDF} onChange={(e) => setDocumentoInfo({ ...documentoInfo, pathArquivoPDF: e.target.value })} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancelar</Button>
          <Button onClick={handleSaveChanges}>Salvar Alterações</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Tabela;
