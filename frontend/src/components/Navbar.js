import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Sweet Delights Bakery</Link>
      </div>
      
      <div className="navbar-menu">
        <Link to="/products">Products</Link>
        
        {user && user.isAdmin && (
          <div className="dropdown">
            <button className="dropdown-button">Admin</button>
            <div className="dropdown-content">
              <Link to="/admin">Dashboard</Link>
              <Link to="/admin/products">Manage Products</Link>
              <Link to="/admin/users">Manage Users</Link>
            </div>
          </div>
        )}
      </div>
      
      <div className="navbar-end">
        <Link to="/cart" className="cart-icon">
          🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </Link>
        
        {user ? (
          <div className="user-menu">
            <Link to="/orders">My Orders</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-button">Login</Link>
            <Link to="/register" className="register-button">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
