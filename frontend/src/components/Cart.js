import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const data = await api.getCart();
      setCart(data);
    };
    fetchCart();
  }, []);

  if (!cart) return <p>Loading cart...</p>;

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.items.map((item) => (
            <li key={item.id}>
              {item.product.name} - ${item.product.price} x {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;