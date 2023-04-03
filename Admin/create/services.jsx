import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import "./services.css"
import MenuDataService from '../../menu.services';
import { db } from '../../../firebase';

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";


function Services() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });


  const handleSubmit = async (e) => {
    e.preventDefault();

    // db.collection("customersData").add({
    //   title: addtitle,
    //   description: adddescription,
    //   price: addprice
    // });

    // setTitle("");
    // setDescription("");
    // setPrice("");
    try {
      const docRef = await addDoc(collection(db, 'menu'), {
       title,
       description,
       price,
      });
      console.log('Document written with ID: ', docRef.id);
      // Reset form fields after successful submission
      setTitle('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }

  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="heading">Heading</Label>
        <Input type="text" name="heading" id="heading" value={title} onChange={e => setTitle(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="items">Description</Label>
        <Input type="text" name="items" id="description" value={description} onChange={e => setDescription(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="price">Price</Label>
        <Input type="number" name="price" id="price" value={price} onChange={e => setPrice(e.target.value)} />
      </FormGroup>
      <Button color="primary" type="submit" className="submit-form">Submit</Button>
    </Form>
  );
}
export default Services;