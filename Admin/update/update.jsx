import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { db } from '../../firebase';
import "../update"

import {
    collection,
    getDocs,
    query,
    updateDoc,
    where,
    doc,
} from "firebase/firestore";


function Update() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const updateUser = async (title, description, price) => {
        const itemRef = query(collection(db, "menu"), where("title", "==", title));
        const findItems = await getDocs(itemRef);
        findItems.forEach(async (item) => {
            const getItem = doc(db, 'menu', item.id);
            await updateDoc(getItem, {
                description: description,
                price: price
            });
        });
        
    }
    function handleSubmit(event) {
        event.preventDefault();
        updateUser(title, description, price);
    }

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
export default Update;