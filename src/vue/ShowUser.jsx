
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ShowUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const DeleteUser = async (id) => {
    await axios.delete(`http://localhost:3030/users/${id}`);
    loadUsers();
  };

  const loadUsers = async () => {
    const result = await axios.get(`http://localhost:3030/users`);
    setUsers(result.data);
  };

  return (
    <div className="show-user-container">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="update-button" // Ajouter la classe CSS pour le bouton "Update"
                  onClick={() => navigate(`/ShowOne/${user.id}`)}
                >
                  View
                </button>
                <button
                  className="update-button" // Ajouter la classe CSS pour le bouton "Update"
                  onClick={() => navigate(`/UpdateUser/${user.id}`)}
                >
                  Edit
                </button>
                <button
                  className="delete-button" // Ajouter la classe CSS pour le bouton "Delete"
                  onClick={() => navigate(`/DeleteUser/${user.id}`)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowUser;
