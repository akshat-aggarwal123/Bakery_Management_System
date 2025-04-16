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

export const addToCart = async (userId, productId, quantity) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error('Product not found');

  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true }
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        user: { connect: { id: userId } },
        items: {
          create: {
            product: { connect: { id: productId } },
            quantity
          }
        }
      },
      include: { items: true }
    });
  } else {
    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cart: { connect: { id: cart.id } },
          product: { connect: { id: productId } },
          quantity
        }
      });
    }
    cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } }
    });
  }
  return cart;
};

export const getCart = async (userId) => {
  return prisma.cart.findUnique({
    where: { userId },
    include: { 
      items: { 
        include: { product: true } 
      } 
    }
  });
};