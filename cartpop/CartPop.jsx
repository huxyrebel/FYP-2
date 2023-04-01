import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import "./CartPop.css"
import {
  collection,
  getDocs,
  deleteDoc,doc,
} from "firebase/firestore";

const CartPopup = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from Firestore
    const fetchCartItems = async () => {
      const cartCollection = collection(db, 'cart');
      const cartSnapshot = await getDocs(cartCollection);
      const cartData = cartSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setCartItems(cartData);
    };

    fetchCartItems();
  }, []);

  const removeCartItem = async (cartItemId) => {
    try {
      await deleteDoc(doc(db, 'cart', cartItemId));
      setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== cartItemId));
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  };

  return (
    <div className="cart-popup">
      {cartItems.length > 0 ? (
        <>
          <h3>Cart Items:</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <p>{item.title}</p>
                <p>{item.description}</p>
                <p>{item.price}</p>
                <button onClick={() => removeCartItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No items in cart.</p>
      )}
    </div>
  );
};

export default CartPopup;
