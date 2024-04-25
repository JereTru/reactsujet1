import React from 'react';
import { Formik, Field, Form } from 'formik';
import '../css/Navbar.css';

const UpdateBoard = () => (
  <div>
    <h1>modifier un tableau</h1>
    
    <Formik
      initialValues={{ nomBoard: '', descriptionBoard: '', imageBoard: '' }}
      onSubmit={(values) => {
        // Handle form submission here
        console.log('Form values:', values);
      }}
    >
      <Form>
        <label htmlFor="nomBoard">Nom du board</label>
        <Field id="nomBoard" name="nomBoard" placeholder="Nom du board" type="text" />

        <label htmlFor="descriptionBoard">Description du board</label>
        <Field id="descriptionBoard" name="descriptionBoard" placeholder="Description du Board" type="text" />

        <label htmlFor="imageBoard">Image du Board</label>
        <Field id="imageBoard" name="imageBoard" placeholder="Mettre votre image ici" type="file" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);

export default UpdateBoard;
