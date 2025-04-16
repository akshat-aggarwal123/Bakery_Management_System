import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Products from '../pages/admin/Products';
import Users from '../pages/admin/Users';
import ProtectedRoute from '../components/AdminRoute';
import Unauthorized from '../pages/shared/Unauthorized';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default AdminRoutes;
