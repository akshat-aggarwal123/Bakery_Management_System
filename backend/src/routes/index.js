import express from 'express';
import { auth, admin } from '../middleware/auth.js';
import * as controller from '../controllers/bakeryController.js';

const router = express.Router();

// Public routes
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/products', controller.getProducts);

// Protected routes
router.post('/orders', auth, controller.createOrder);
router.get('/orders/:id', auth, controller.getOrder);

// Admin routes
router.get('/users', [auth, admin], controller.getUsers);
router.post('/products', [auth, admin], controller.createProduct);

export default router;