import { auth, admin } from '../middleware/auth.js';
import { 
  registerUser, 
  loginUser, 
  listUsers, 
  createProduct, 
  listProducts, 
  placeOrder, 
  getOrderStatus 
} from '../services/bakeryService.js';

// Register Controller
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.cookie('auth_token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Get All Users (Admin Only)
export const getUsers = async (req, res) => {
  try {
    const users = await listUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Product (Admin Only)
export const createProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const product = await createProduct(name, price, quantity, req.user.id);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await listProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Order (Authenticated User)
export const createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const order = await placeOrder(req.user.id, productId, quantity);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Order Status (Authenticated User)
export const getOrder = async (req, res) => {
  try {
    const order = await getOrderStatus(parseInt(req.params.id));
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};