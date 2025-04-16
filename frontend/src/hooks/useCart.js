import { useCallback } from 'react';
import api from '../services/api';

// Define the useCart hook
export const useCart = () => {
  const addToCart = useCallback(async (productId, quantity) => {
    await api.addToCart(productId, quantity);
  }, []);

  return { addToCart };
};

export default useCart;