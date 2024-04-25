import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/priority.css'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const PriorityAdd = () => {
  const [open, setOpen] = useState(false);
  const [newPrio, setNewPrio] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setNewPrio(event.target.value);
  };

  const handleAddPrio = async () => {
    try {
      await axios.post(`http://localhost:3030/priorities/`, { label: newPrio });
      handleClose();
      navigate('/priorities');
      window.location.reload();
    } catch (error) {
      console.error('Error adding priority:', error);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button variant="outlined" onClick={handleClickOpen} id="buttonAddPrio">
        +
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <DialogTitle>Create priority</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Name
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="priorityAddPrio"
            label="name"
            type="text"
            fullWidth
            value={newPrio}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} class='buttonCancel'>Cancel</button>
          <button onClick={handleAddPrio} class='buttonValid'>Create</button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default PriorityAdd