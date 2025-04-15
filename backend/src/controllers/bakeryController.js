import { auth, admin } from '../middleware/auth.js';

export const register = async (req, res) => {
  try {
    const { email, password, is_admin } = req.body;
    
    // Only allow admin creation if request is from localhost or has valid token
    const isAdmin = (req.ip === '127.0.0.1') || req.user?.isAdmin;
    
    const user = await registerUser(email, password, isAdmin);
    res.status(201).json({ ...user, password: undefined });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.cookie('auth_token', token, { httpOnly: true });
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const getUsers = [auth, admin, async (req, res) => {
  try {
    const users = await listUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}];

export const createProduct = [auth, admin, async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const product = await createProduct(name, price, quantity, req.user.id);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}];

export const getProducts = async (req, res) => {
  try {
    const products = await listProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrder = [auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const order = await placeOrder(req.user.id, productId, quantity);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}];

export const getOrder = [auth, async (req, res) => {
  try {
    const order = await getOrderStatus(parseInt(req.params.id));
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}];