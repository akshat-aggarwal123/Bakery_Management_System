import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/user/Home';
import Products from '../pages/user/Products';
import Cart from '../pages/user/Cart';
import Orders from '../pages/user/Orders';
import ProductDetail from '../pages/user/ProductDetail';
import Checkout from '../pages/user/Checkout';
import OrderDetail from '../pages/shared/OrderDetail';
import NotFound from '../pages/shared/NotFound';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/order/:id" element={<OrderDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default UserRoutes;
