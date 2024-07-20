'use client';

import React from 'react';
import { ToastContainer } from 'react-toastify';

import { CartContextProvider } from '@/context/cart-context';

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartContextProvider>
      {children}
      <ToastContainer position="top-center" theme="light" hideProgressBar />
    </CartContextProvider>
  );
};

export default ClientProvider;
