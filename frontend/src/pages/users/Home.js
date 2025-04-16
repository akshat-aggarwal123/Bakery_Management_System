import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        // Get up to 3 products for the featured section
        setFeaturedProducts(response.data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Sweet Delights Bakery</h1>
          <p>Handcrafted with love and the finest ingredients</p>
          <Link to="/products" className="cta-button">Shop Now</Link>
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  {/* Placeholder image - replace with actual product images */}
                  <div className="placeholder-image"></div>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-price">${Number(product.price).toFixed(2)}</p>
                  <Link to={`/products/${product.id}`} className="view-product-button">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="view-all">
          <Link to="/products" className="view-all-button">View All Products</Link>
        </div>
      </section>

      <section className="about-section">
        <h2>About Us</h2>
        <p>
          Sweet Delights Bakery has been serving our community with artisanal baked goods since 2010.
          Our passion for quality ingredients and traditional baking methods ensures that every bite
          brings joy and satisfaction.
        </p>
      </section>
    </div>
  );
};

export default Home;