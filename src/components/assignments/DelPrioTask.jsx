import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from 'react-router-dom';

import '../../css/assignments.css';

const urlTo = `/rui`; // à changer pour home '/'

function DelPrioTask(props){
  
  const navigate = useNavigate();
  const [task, setTask] = useState([]);
    
  const taskId = +props.taskID;

  useEffect(() => {
    chargerTask();  // Déclenché une fois à la montée du composant pour charger les données
  }, []);

  const chargerTask = async () => {
    try {
        const result = await axios.get(`http://localhost:3030/tasks/${taskId}`);
        setTask(result.data);
    } catch (error) {
        console.error("Erreur lors de la récupération de la tâche:", error);
    }
  };

  const retirerPrioTask = async () => {
    try {
        // Ajout de l'id de la tâche au tableau des tâches du board en utilisant l'API put
        await axios.put(`http://localhost:3030/tasks/${task.id}`, { ...task, priority_id: 0 });           
        console.log("Priorité retirée avec succès!");
        navigate(urlTo); // pour actualiser la page
        window.location.reload();  // pour forcer actualisation la page
    } catch (error) {
        console.error("Erreur lors du retrait de la Priorité:", error);  
    }
  }
  
  return (
      <button onClick={() => retirerPrioTask()} className="btnRetirerPrio">{props.name}</button>
  );
}

export default DelPrioTask;