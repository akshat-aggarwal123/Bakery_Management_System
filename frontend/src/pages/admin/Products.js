import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../utils/api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: ''
  });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.quantity) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsCreating(true);
    
    try {
      await api.post('/products', {
        name: formData.name,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      });
      
      toast.success('Product created successfully!');
      
      // Reset form and refresh products list
      setFormData({ name: '', price: '', quantity: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error(error.response?.data?.error || 'Failed to create product');
    } finally {
      setIsCreating(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="admin-products-page">
      <h1>Manage Products</h1>
      
      <div className="admin-content">
        <div className="create-product-section">
          <h2>Create New Product</h2>
          
          <form onSubmit={handleCreateProduct} className="create-product-form">
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input
                type="number"
                id="price"
                name="price"
                min="0.01"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="quantity">Quantity in Stock</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="create-button"
              disabled={isCreating}
            >
              {isCreating ? 'Creating...' : 'Create Product'}
            </button>
          </form>
        </div>
        
        <div className="products-list-section">
          <h2>Current Products</h2>
          
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="admin-products-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>${Number(product.price).toFixed(2)}</td>
                      <td className={product.quantity < 5 ? 'low-stock' : ''}>
                        {product.quantity}
                      </td>
                      <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;