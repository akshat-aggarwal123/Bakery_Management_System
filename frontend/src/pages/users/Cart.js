import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = () => {
    if (!user) {
      toast.info('Please login to checkout');
      navigate('/login');
      return;
    }
    
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h1>Your Cart</h1>
        <div className="empty-cart-message">
          <p>Your cart is empty</p>
          <Link to="/products" className="continue-shopping">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              {/* Placeholder image - replace with actual product images */}
              <div className="placeholder-image-small"></div>
            </div>
            
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-price">${Number(item.price).toFixed(2)}</p>
            </div>
            
            <div className="item-quantity">
              <button 
                className="quantity-button"
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="quantity-value">{item.quantity}</span>
              <button 
                className="quantity-button"
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            
            <div className="item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            
            <button 
              className="remove-item"
              onClick={() => removeFromCart(item.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="cart-total">
          <span>Total:</span>
          <span className="total-amount">${cartTotal.toFixed(2)}</span>
        </div>
        
        <div className="cart-actions">
          <Link to="/products" className="continue-shopping">Continue Shopping</Link>
          <button 
            className="checkout-button"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
