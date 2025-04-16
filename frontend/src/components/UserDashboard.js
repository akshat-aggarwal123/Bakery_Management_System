import React, { useEffect, useState } from 'react';
import api from '../services/api';

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await api.get('/orders');
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      <h2>Your Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.product.name} - Quantity: {order.quantity}, Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;