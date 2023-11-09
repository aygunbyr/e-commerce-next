'use client';
import React, { createContext, useEffect, useReducer } from 'react';
import type { ProductWithQuantity } from '@/types';

import cartReducer from './reducer';

export interface CartContextState {
  products: ProductWithQuantity[];
}

const initialState: CartContextState = {
  products: [],
};

interface CardContextProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext<{
  state: CartContextState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export const CartContextProvider = ({ children }: CardContextProviderProps) => {
  const storedCart =
    typeof window !== 'undefined' ? window.localStorage.getItem('cart') : null;
  const [state, dispatch] = useReducer(
    cartReducer,
    storedCart ? JSON.parse(storedCart) : initialState,
  );

  useEffect(() => {
    typeof window !== 'undefined'
      ? window.localStorage.setItem('cart', JSON.stringify(state))
      : null;
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
