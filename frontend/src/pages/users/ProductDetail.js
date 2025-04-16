import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../utils/api';
import { CartContext } from '../../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // In a real app, you'd have an endpoint to get a single product
        // For now, we'll get all products and find the one we need
        const response = await api.get('/products');
        const foundProduct = response.data.find(p => p.id === parseInt(id));
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          toast.error('Product not found');
          navigate('/products');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.quantity || 1)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${quantity} ${product.name} added to cart!`);
    }
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="not-found">Product not found</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image-large">
          {/* Placeholder image - replace with actual product image */}
          <div className="placeholder-image-large"></div>
        </div>
        
        <div className="product-details">
          <h1>{product.name}</h1>
          <p className="product-price">${Number(product.price).toFixed(2)}</p>
          
          <div className="product-availability">
            <span className={product.quantity > 0 ? 'in-stock' : 'out-of-stock'}>
              {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            {product.quantity > 0 && <span className="stock-count">({product.quantity} available)</span>}
          </div>
          
          <div className="product-description">
            <h3>Description</h3>
            <p>Delicious freshly baked {product.name}. Made with the finest ingredients.</p>
          </div>
          
          {product.quantity > 0 && (
            <div className="purchase-options">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <input 
                  type="number" 
                  id="quantity" 
                  min="1" 
                  max={product.quantity} 
                  value={quantity} 
                  onChange={handleQuantityChange}
                />
              </div>
              
              <button 
                className="add-to-cart-button-large"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;