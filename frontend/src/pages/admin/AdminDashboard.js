import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    lowStockProducts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real app, you'd have an endpoint for this
        // For now, we'll make separate requests
        const [users, products, orders] = await Promise.all([
          api.get('/users'),
          api.get('/products'),
          api.get('/orders')
        ]);
        
        const lowStockCount = products.data.filter(p => p.quantity < 5).length;
        
        setStats({
          totalUsers: users.data.length,
          totalProducts: products.data.length,
          totalOrders: orders.data.length,
          lowStockProducts: lowStockCount
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="loading">Loading dashboard data...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="stat-cards">
        <div className="stat-card">
          <h2>{stats.totalUsers}</h2>
          <p>Total Users</p>
          <Link to="/admin/users" className="stat-link">View Users</Link>
        </div>
        
        <div className="stat-card">
          <h2>{stats.totalProducts}</h2>
          <p>Total Products</p>
          <Link to="/admin/products" className="stat-link">Manage Products</Link>
        </div>
        
        <div className="stat-card">
          <h2>{stats.totalOrders}</h2>
          <p>Total Orders</p>
        </div>
        
        <div className="stat-card warning">
          <h2>{stats.lowStockProducts}</h2>
          <p>Low Stock Products</p>
          <Link to="/admin/products" className="stat-link">View Inventory</Link>
        </div>
      </div>
      
      <div className="admin-actions">
        <Link to="/admin/products" className="admin-action-button">
          Manage Products
        </Link>
        <Link to="/admin/users" className="admin-action-button">
          Manage Users
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;