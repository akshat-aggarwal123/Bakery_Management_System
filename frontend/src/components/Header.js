import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ token, onLogout }) => {
  return (
    <header style={{ padding: '1rem', background: '#f4f4f4' }}>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/products">Products</Link> |{' '}
        <Link to="/cart">Cart</Link>{' '}
        {token ? (
          <button onClick={onLogout} style={{ marginLeft: '1rem' }}>
            Logout
          </button>
        ) : (
          <>
            | <Link to="/login">Login</Link> |{' '}
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;