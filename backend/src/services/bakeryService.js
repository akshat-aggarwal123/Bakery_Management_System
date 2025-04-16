import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma.js';

export const registerUser = async (email, password, isAdmin = false) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, password: hashedPassword, isAdmin }
  });
};

export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Invalid credentials');
  }
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
};

export const createProduct = async (name, price, quantity, creatorId) => {
  return prisma.product.create({
    data: { name, price, quantity, creatorId }
  });
};

export const listProducts = async () => {
  return prisma.product.findMany();
};

export const placeOrder = async (userId, productId, quantity) => {
  const product = await prisma.product.findUnique({ 
    where: { id: productId } 
  });
  
  if (!product || product.quantity < quantity) {
    throw new Error('Product not available');
  }

  await prisma.product.update({
    where: { id: productId },
    data: { quantity: product.quantity - quantity }
  });

  return prisma.order.create({
    data: { userId, productId, quantity, status: 'pending' }
  });
};

export const getOrderStatus = async (orderId) => {
  return prisma.order.findUnique({ 
    where: { id: orderId },
    include: { product: true }
  });
};

export const listUsers = async () => {
  return prisma.user.findMany();
};
