import React from 'react';

const CartItem = ({ item }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem' }}>
      <h3>{item.product.name}</h3>
      <p>Price: ${item.product.price}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
};

export default CartItem;