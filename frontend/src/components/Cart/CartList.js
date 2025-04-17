import React, { useEffect, useState } from 'react';
import { getCart } from '../../utils/api';
import CartItem from './CartItem';

const CartList = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const data = await getCart();
      setCart(data);
    };
    fetchCart();
  }, []);

  if (!cart || !cart.items) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h2>Cart</h2>
      {cart.items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartList;