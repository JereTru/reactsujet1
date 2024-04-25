import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from 'react-router-dom';

import '../../css/assignments.css';

const urlTo = `/rui`; // à changer pour home '/'

function DelTaskBoard(props){
  
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);
    
  const boardId = +props.boardID;

  useEffect(() => {
    chargerBoard();  // Déclenché une fois à la montée du composant pour charger les données
  }, []);

  const chargerBoard = async () => {
    try {
        const result = await axios.get(`http://localhost:3030/boards/${boardId}`);
        setBoard(result.data);
    } catch (error) {
        console.error("Erreur lors de la récupération du board:", error);
    }
  };

  const retirerTaskBoard = async () => {  
    const taskToRemove = +props.taskID;
    try {
        // Ajout de l'id de la tâche au tableau des tâches du board en utilisant l'API put
        await axios.put(`http://localhost:3030/boards/${board.id}`, { ...board, task_id: board.task_id.filter(id => id !== taskToRemove) });           
        console.log("Tâche retirée avec succès!");
        navigate(urlTo); // pour actualiser la page
        window.location.reload();  // pour forcer actualisation la page
    } catch (error) {
        console.error("Erreur lors du retrait de la tâche:", error);  
    }
  }
  
  return (
      <button onClick={() => retirerTaskBoard()} className="buttonAddTaskBoard">{props.name}</button>
  );
}

export default DelTaskBoard;