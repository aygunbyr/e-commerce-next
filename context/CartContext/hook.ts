'use client';
import { useContext } from 'react';
import { CartContext } from './index';

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartContextProvider');
  }

  return context;
};

export default useCart;
