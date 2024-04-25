import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/priority.css'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function PriorityAddTask(props) {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3030/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const addPrioTask = async (index) => {
      const task = tasks[index];
      
      try {
          // Ajout de l'id de la tâche au tableau des tâches du board en utilisant l'API put
          await axios.put(`http://localhost:3030/tasks/${task.id}`, { ...task, priority_id: +props.id });
          console.log("Tâche ajoutée avec succès!");
          handleClose();  // Fermer le modal après l'ajout de la tâche
          window.location.reload();
      } catch (error) {
          console.error("Erreur lors de l'ajout de la tâche:", error);  // Gestion des erreurs pour l'ajout de la tâche
      }
    }

  return (
    <div>
      <Button onClick={handleOpen} class='buttonAdd'>Add to task</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box class='addToTask'>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ajouter à une tache :
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div class='dialogTasks'>
              {tasks.map((task, index) => (
                <button key={task.id} onClick={() => addPrioTask(index)}>
                  {task.task_name}
                </button>
              ))}
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default PriorityAddTask;