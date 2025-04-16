import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminDashboard from '../components/AdminDashboard';
import UserDashboard from '../components/UserDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>You need to be logged in to view this page.</p>;
  }

  return user.isAdmin ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;