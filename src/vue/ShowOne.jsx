import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate  } from "react-router-dom";
import axios from "axios";




const ShowOne = () => {
    const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
   password: "",
     email: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const res = await axios.get
            ( `http://localhost:3030/users/${id}`
    );
    setUser(res.data);
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">name: {user.name}</li>
        <li className="list-group-item"> Password : {user.password}</li>
        <li className="list-group-item">email :{user.email}</li>
      </ul>
      <button
                  className="update-button" // Ajouter la classe CSS pour le bouton "Update"
                  onClick={() => navigate(`/ShowOne/${user.id}`)}
                >

                </button>
     
    </div>
  );
};

export default ShowOne;