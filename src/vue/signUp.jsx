import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate pour la redirection
import '../css/Navbar.css';
import '../css/SignUp.css';

const Signup = () => {
  const navigate = useNavigate(); // Initialisation de useNavigate pour la redirection

  return (
    <div>
      {/* Titre du formulaire */}
      <h1>Sign Up</h1>
      {/* Utilisation de Formik pour gérer le formulaire */}
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '', // Ajout du champ pour le mot de passe
          reEnterPassword: '', // Ajout du champ pour la répétition du mot de passe
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500)); // Simuler une action asynchrone
          navigate('/ShowUser'); // Redirection vers une autre page après la soumission du formulaire
        }}
      >
        {/* Utilisation de Form pour définir le formulaire */}
        <Form>
          {/* Champ de saisie pour le prénom */}
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="Jane" />

          {/* Champ de saisie pour le nom */}
          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />

          {/* Champ de saisie pour l'email */}
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="jane@acme.com"
            type="email"
          />

          {/* Champ de saisie pour le mot de passe */}
          <label htmlFor="password">Password</label>
          <Field
            id="password"
            name="password"
            placeholder="Password"
            type="password"
          />

          {/* Répétition du champ de saisie pour le mot de passe */}
          <label htmlFor="reEnterPassword">Re-enter Password</label>
          <Field
            id="reEnterPassword"
            name="reEnterPassword"
            placeholder="Re-enter Password"
            type="password"
          />

          {/* Bouton de soumission du formulaire */}
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
