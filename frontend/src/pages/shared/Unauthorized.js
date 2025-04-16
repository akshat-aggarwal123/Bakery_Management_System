import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">403 - Unauthorized</h1>
      <p className="text-lg mb-6">You do not have permission to access this page.</p>
      <Link to="/" className="text-blue-500 hover:underline">Return to Home</Link>
    </div>
  );
};

export default Unauthorized;
