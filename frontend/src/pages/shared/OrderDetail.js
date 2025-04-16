import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../utils/api';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
        toast.error('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }

  if (!order) {
    return <div className="not-found">Order not found</div>;
  }

  return (
    <div className="order-detail-page">
      <div className="order-detail-header">
        <h1>Order #{order.id}</h1>
        <span className={`order-status-large status-${order.status}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>
      
      <div className="order-detail-container">
        <div className="order-info">
          <div className="order-date-time">
            <h3>Order Placed</h3>
            <p>{formatDate(order.createdAt)}</p>
          </div>
          
          <div className="order-product-details">
            <h3>Product</h3>
            <div className="ordered-product">
              <div className="product-image-small">
                {/* Placeholder image - replace with actual product image */}
                <div className="placeholder-image-small"></div>
              </div>
              
              <div className="product-info-small">
                <h4>{order.product.name}</h4>
                <p className="product-price">${Number(order.product.price).toFixed(2)} each</p>
                <p className="product-quantity">Quantity: {order.quantity}</p>
              </div>
            </div>
          </div>
          
          <div className="order-total-section">
            <h3>Order Total</h3>
            <p className="order-total-price">
              ${(Number(order.product.price) * order.quantity).toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="order-actions">
          <Link to="/orders" className="back-to-orders">Back to Orders</Link>
          <Link to="/products" className="continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;