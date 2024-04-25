import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import '../../css/assignments.css';

const urlTo = `/rui`; // à changer pour home '/'

function DelUserTask(props){
  

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [task, setTask] = useState([]);
    
  const taskId = +props.taskID;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    chargerTask();  // Déclenché une fois à la montée du composant pour charger les données
  }, []);

  const chargerTask = async () => {
    try {
        const result = await axios.get(`http://localhost:3030/tasks/${taskId}`);
        setTask(result.data);
    } catch (error) {
        console.error("Erreur lors de la récupération de la Task", error);
    }
  };

  const retirerUserTask = async () => {  
    const userToRemove = +props.userID;
    try {
        // Ajout de l'id de la tâche au tableau des tâches du board en utilisant l'API put
        await axios.put(`http://localhost:3030/tasks/${task.id}`, { ...task, users_id: task.users_id.filter(id => id !== userToRemove) });           
        console.log("User retirée avec succès!");
        navigate(urlTo); // pour actualiser la page
        window.location.reload();  // pour forcer actualisation la page
    } catch (error) {
        console.error("Erreur lors du retrait de la tâche:", error);  
    }
  }
  
  return (
    <React.Fragment>
        <button onClick={handleOpen}>{props.name}</button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Êtes-vous sûr de vouloir supprimer "{props.userName}" de la tâche "{task.task_name}" ?
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Non</Button>
                <Button onClick={retirerUserTask} autoFocus>Oui</Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
  );
}

export default DelUserTask;