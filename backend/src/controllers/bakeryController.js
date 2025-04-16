import { auth, admin } from '../middleware/auth.js';
import { 
  registerUser, 
  loginUser, 
  listUsers, 
  createProduct as createProductService, // Renamed imported function.
  listProducts, 
  placeOrder, 
  getOrderStatus 
} from '../services/bakeryService.js';

// Register Controller
export const register = async (req, res) => {
  try {
    const { email, password, is_admin } = req.body;
    
    // Allow admin creation if the request is from localhost (IPv4 or IPv6)
    // or if the request already comes from an admin user.
    const allowedToSetAdmin =
      (req.ip === '127.0.0.1' || req.ip === '::1') || req.user?.isAdmin;
    
    // Use the provided is_admin flag only if allowed; otherwise default to false.
    const finalIsAdmin = allowedToSetAdmin ? Boolean(is_admin) : false;
    
    const user = await registerUser(email, password, finalIsAdmin);
    // Remove password from the response
    res.status(201).json({ ...user, password: undefined });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Login Controller
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

// Get All Users (Admin Only)
export const getUsers = [auth, admin, async (req, res) => {
  try {
    const users = await listUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}];

// Create Product (Admin Only)
export const createProduct = [auth, admin, async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    // Use the renamed service function.
    const product = await createProductService(name, price, quantity, req.user.id);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}];

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
export const createOrder = [auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const order = await placeOrder(req.user.id, productId, quantity);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}];

// Get Order Status (Authenticated User)
export const getOrder = [auth, async (req, res) => {
  try {
    const order = await getOrderStatus(parseInt(req.params.id, 10));
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}];
