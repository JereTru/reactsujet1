import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/priority.css';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const PriorityDel = (props) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3030/priorities/${props.id}`);
            handleClose(); // Fermer la boîte de dialogue après la suppression réussie
            navigate('/priorities'); // Naviguer vers la page des priorités après la suppression réussie
            window.location.reload(); 
        } catch (error) {
            console.error('Error deleting priority:', error);
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
            <button variant="outlined" onClick={handleClickOpen} class='buttonDel'>
                Delete
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure to delete " {props.label} " ? <br />
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} class='buttonCancel'>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus class='buttonValid'>I'm sure</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default PriorityDel;