import React, { createContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/me');
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.log('Not authenticated');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
    const userData = { email, isAuthenticated: true, isAdmin: false };
    
    // We need to make another request to get user data since login doesn't return it
    try {
      const userResponse = await api.get('/auth/me');
      if (userResponse.data) {
        userData.isAdmin = userResponse.data.isAdmin;
      }
    } catch (error) {
      console.error('Error fetching user data', error);
    }
    
    setUser(userData);
    return response;
  };

  const register = async (email, password) => {
    const response = await api.post('/register', { email, password });
    return response;
  };

  const logout = async () => {
    try {
      await api.post('/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};