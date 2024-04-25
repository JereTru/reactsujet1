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

const PriorityUp = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [newPrio, setNewPrio] = useState([]);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setNewPrio(event.target.value);
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`http://localhost:3030/priorities/${id}`, {
        label: newPrio,
      });
      handleClose();
      navigate('/priorities');
      window.location.reload();
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} class='buttonUp'>
        Update
      </Button>
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
        <DialogTitle>Update priority</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Name
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="priorityUp"
            label={newPrio}
            type="text"
            fullWidth
            variant="standard"
            value={newPrio}
            onChange={handleInputChange}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} class='buttonCancel'>Cancel</Button>
          <Button type="submit" onClick={handleUpdate} class='buttonValid'>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PriorityUp;
