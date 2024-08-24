'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ToastContainer } from 'react-toastify';
import CartProvider from '@/features/cart/cart-provider';

const ClientProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <Provider store={store}>
      <CartProvider>
        {children}
        <ToastContainer position="top-center" theme="light" hideProgressBar />
      </CartProvider>
    </Provider>
  );
};

export default ClientProvider;
