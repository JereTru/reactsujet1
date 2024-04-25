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

function AddTaskBoard(props) {
    const [open, setOpen] = useState(false);
    const [boards, setBoards] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    let compteur = 0; // pour afficher un message

    useEffect(() => {
        listeBoards();  // Déclenché une fois à la montée du composant pour charger les données
    }, []);

    const listeBoards = async () => {
        try {
            const result = await axios.get(`http://localhost:3030/boards`);
            setBoards(result.data);  // Mise à jour de l'état avec les données chargées
        } catch (error) {
            console.error("Erreur lors de la récupération des boards:", error);  // Gestion des erreurs pour le chargement des boards
        }
    };

    const ajouterTaskBoard = async (idTask, index) => {
        const board = boards[index];
        
        try {
            // Ajout de l'id de la tâche au tableau des tâches du board en utilisant l'API put
            await axios.put(`http://localhost:3030/boards/${board.id}`, { ...board, task_id: [...board.task_id, +idTask] });
            console.log("Tâche ajoutée avec succès!");
            handleClose();  // Fermer le modal après l'ajout de la tâche
            navigate(urlTo); // pour actualiser la page
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de l'ajout de la tâche:", error);  // Gestion des erreurs pour l'ajout de la tâche
        }
    }

    return (
        <div>
            <button onClick={handleOpen} className="buttonAddTaskBoard">{props.name}</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Liste des Boards disponibles :
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="afficheListeBTN">
                            {boards.map((board, index) => (
                                // ajout de contition pour ne pas ajouter la tache un tableau la contenant déjà

                                board.task_id ? (
                                    !board.task_id.includes(+props.taskID) ? (
                                        
                                        // Ajout d'une fonction lambda pour éviter l'exécution immédiate lors du rendu
                                        <button key={board.id} onClick={() => ajouterTaskBoard(props.taskID, index)} className="buttonAffectation">
                                            Ajouter à {board.board_name} 
                                        <input type="hidden" value={compteur++} />
                                        </button>
                                    )
                                    : null
                                ) : null

                            ))}

                            { compteur === 0 ? ( <div className="infoMessage">Aucun Board diponible pour cette Task</div>  ) : null }
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default AddTaskBoard;