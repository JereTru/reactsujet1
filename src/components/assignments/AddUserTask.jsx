import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

import '../../css/assignments.css';

const urlTo = `/rui`;  // à changer pour home '/task'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function AddUserTask(props) {
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [task, setTask] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    let compteurUser = 0; // pour afficher un message


    const listeUsers = async () => {
        try {
            const result = await axios.get(`http://localhost:3030/users`);
            setUsers(result.data);  // Mise à jour de l'état avec les données chargées
        } catch (error) {
            console.error("Erreur lors de la récupération des Users:", error);  // Gestion des erreurs pour le chargement des users
        }
    };

    const chargerTask = async () => {
        try {
            const result = await axios.get(`http://localhost:3030/tasks/${props.taskID}`);
            setTask(result.data);  // Mise à jour de l'état avec les données chargées
        } catch (error) {
            console.error("Erreur lors de la récupération de la tâche:", error); 
        }
    };

    useEffect(() => {
        listeUsers();  
        chargerTask();  
    }, []);

    const ajouterUserTask = async (idUser) => { 
        try {
            // Ajout de l'id de l'user au tableau des users des tâches en utilisant l'API put
            await axios.put(`http://localhost:3030/tasks/${task.id}`, { ...task, users_id: [...task.users_id, +idUser] });
            console.log("User ajoutée avec succès!");
            handleClose();  // Fermer le modal après l'ajout de la tâche
            navigate(urlTo); // pour actualiser la page
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de l'ajout de user:", error);
        }
    }

    return (
        <div>
            <button onClick={handleOpen} className="btnAddUserTask">{props.name}</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Liste des Users disponibles :
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="afficheListeBTN">
                            {users.map(user => (
                                // ajout de contition pour ne pas ajouter la tache un tableau la contenant déjà
                                task.users_id ? (
                                    !task.users_id.includes(+user.id) ? (
                                        
                                        // Ajout d'une fonction lambda pour éviter l'exécution immédiate lors du rendu
                                        <button key={user.id} onClick={() => ajouterUserTask(user.id)} className="btnAffectUser">
                                            Ajouter "{user.name}"" à la Task "{task.task_name}"
                                        <input type="hidden" value={compteurUser++} />
                                        </button>
                                    )
                                    : null
                                ) : null
                            ))}

                            { compteurUser === 0 ? ( <div className="infoMessage">Aucun User diponible pour cette Task</div>  ) : null }
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default AddUserTask;