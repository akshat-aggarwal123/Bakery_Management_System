import express from 'express';
import { auth, admin } from '../middleware/auth.js';
import * as controller from '../controllers/bakeryController.js';

const router = express.Router();

// Admin routes
router.get('/users', [auth, admin], controller.getUsers);
router.post('/products', [auth, admin], controller.createProduct);

// Public routes
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/products', controller.getProducts); // Public route: No auth required

// Protected routes
router.post('/orders', auth, controller.createOrder);
router.get('/orders/:id', auth, controller.getOrder);

// Cart routes
router.post('/cart', auth, controller.addToCart);
router.get('/cart', auth, controller.getCart);


export default router;