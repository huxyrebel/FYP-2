import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import "./delete.css";
import { db } from '../../firebase';
import { collection, deleteDoc, query, where, getDocs } from "firebase/firestore";

function Del() {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Find the document with the matching title
      const q = query(collection(db, "menu"), where("title", "==", title));
      const querySnapshot = await getDocs(q);
      
      // Delete the document
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      console.log('Document deleted successfully');
      
      // Reset the form fields after successful submission
      setTitle('');
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} />
      </FormGroup>
      <Button color="primary" type="submit" className="submit-form">Submit</Button>
    </Form>
  );
}

export default Del;
