import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import '../css/SignIn.css';
import '../css/Navbar.css';

const Signin = () => {
  const navigate = useNavigate();
  return (
    <div className="sign-container">
    <div className="login-bar">
      <div className="login-form">
        <h1 className="login-title">Login</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500)); // Simuler une action asynchrone
          navigate('/Home');
        }}
      >
        <Form>
          <div>
            <label htmlFor="email">Email:</label>
            <Field id="email" name="email" type="email" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field id="password" name="password" type="password" />
          </div>
          <button type="submit" className="submit-button">Sign In</button>
        </Form>
      </Formik>
      </div>
    </div>
    </div>
  );
};

export default Signin;