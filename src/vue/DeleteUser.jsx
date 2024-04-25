import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteUser = () => {
  let navigate = useNavigate(); // Initialise la fonction navigate pour la navigation
  const { id } = useParams(); // Récupère l'ID de l'utilisateur à supprimer depuis les paramètres de l'URL
  const [user, setUser] = useState({ // Initialise un état pour stocker les détails de l'utilisateur à supprimer
    name: "", // Nom de l'utilisateur
    email: "", // Email de l'utilisateur
  });

  useEffect(() => {
    loadUser(); // Charge les détails de l'utilisateur lors du chargement du composant
  }, []);

  const DeleteUser = async () => { // Fonction pour supprimer l'utilisateur
    await axios.delete(`http://localhost:3030/users/${id}`); // Effectue une requête DELETE pour supprimer l'utilisateur
    navigate("/"); // Redirige l'utilisateur vers la page d'accueil après la suppression
  };

  const loadUser = async () => { // Fonction pour charger les détails de l'utilisateur à supprimer
    const result = await axios.get(`http://localhost:3030/users/${id}`); // Effectue une requête GET pour obtenir les détails de l'utilisateur
    setUser(result.data); // Met à jour l'état avec les détails de l'utilisateur
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Delete User</h2>
        <form onSubmit={(e) => { e.preventDefault(); }}> {/* Empêche la soumission du formulaire */}
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={user.name}
              disabled // Désactive la modification du champ
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={user.email}
              disabled // Désactive la modification du champ
            />
          </div>
          <button
            className="btn btn-danger mr-2"
            onClick={() => DeleteUser()} // Appelle la fonction de suppression lors du clic sur le bouton
          >
            Delete
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteUser;
