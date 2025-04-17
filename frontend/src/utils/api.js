import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data.token;
};

export const register = async (email, password) => {
  await axios.post(`${API_URL}/register`, { email, password });
};

export const listProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getCart = async () => {
  const response = await axios.get(`${API_URL}/cart`);
  return response.data;
};