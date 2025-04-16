import { useState, useEffect } from 'react';
import api from '../services/api';

// Define the useAuth hook
export const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await api.login(email, password);
    document.cookie = `auth_token=${response.data}; path=/;`;
    setUser({ email });
  };

  const logout = () => {
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    setUser(null);
  };

  useEffect(() => {
    // Check if user is logged in
    const token = document.cookie.split('; ').find((row) => row.startsWith('auth_token='));
    if (token) setUser({ email: 'Logged In User' }); // Replace with actual user details
  }, []);

  return { user, login, logout };
};

export default useAuth;