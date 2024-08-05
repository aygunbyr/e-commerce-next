'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ToastContainer } from 'react-toastify';
import { CartContextProvider } from '@/context/cart-context';

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <CartContextProvider>
        {children}
        <ToastContainer position="top-center" theme="light" hideProgressBar />
      </CartContextProvider>
    </Provider>
  );
};

export default ClientProvider;
