import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

const api = {
  register: (email, password) => axios.post(`${BASE_URL}/register`, { email, password }),
  login: (email, password) => axios.post(`${BASE_URL}/login`, { email, password }),
  getProducts: () => axios.get(`${BASE_URL}/products`).then((res) => res.data),
  addToCart: (productId, quantity) => axios.post(`${BASE_URL}/cart`, { productId, quantity }),
  getCart: () => axios.get(`${BASE_URL}/cart`).then((res) => res.data),
  getOrders: () => axios.get(`${BASE_URL}/orders`).then((res) => res.data),
  getUsers: () => axios.get(`${BASE_URL}/users`).then((res) => res.data),
};

export default api;