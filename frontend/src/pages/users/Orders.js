import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../utils/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Note: Your backend would need an endpoint to get all orders for the current user
        // For now, let's assume it exists
        const response = await api.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <div className="loading">Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <h1>My Orders</h1>
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <Link to="/products" className="browse-button">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-id">Order #{order.id}</span>
              <span className="order-date">{formatDate(order.createdAt)}</span>
            </div>
            
            <div className="order-product">
              <span className="product-name">{order.product.name}</span>
              <span className="order-quantity">x{order.quantity}</span>
            </div>
            
            <div className="order-footer">
              <span className={`order-status status-${order.status}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
              <Link to={`/orders/${order.id}`} className="view-order-button">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;