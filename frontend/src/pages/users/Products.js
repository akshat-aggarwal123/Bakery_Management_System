import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../utils/api';
import { CartContext } from '../../context/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      
      {loading ? (
        <div className="loading">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="no-products">
          <p>No products available at the moment.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {/* Placeholder image - replace with actual product images */}
                <div className="placeholder-image"></div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">${Number(product.price).toFixed(2)}</p>
                <p className="product-stock">
                  {product.quantity > 0 
                    ? `${product.quantity} in stock` 
                    : 'Out of stock'}
                </p>
                <div className="product-actions">
                  <Link to={`/products/${product.id}`} className="view-button">
                    View Details
                  </Link>
                  <button 
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.quantity <= 0}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;