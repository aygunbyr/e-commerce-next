'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';

import type { Product, ProductWithQuantity } from '@/types';
import cartReducer from './cart-reducer';

export enum CartActionType {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  EMPTY_CART = 'EMPTY_CART',
  INCREASE_QUANTITY = 'INCREASE_QUANTITY',
  DECREASE_QUANTITY = 'DECREASE_QUANTITY',
  LOAD_CART = 'LOAD_CART',
}

export type CartAction =
  | { type: CartActionType.ADD_ITEM; payload: Product }
  | { type: CartActionType.REMOVE_ITEM; payload: { id: number } }
  | { type: CartActionType.EMPTY_CART }
  | { type: CartActionType.INCREASE_QUANTITY; payload: { id: number } }
  | { type: CartActionType.DECREASE_QUANTITY; payload: { id: number } }
  | { type: CartActionType.LOAD_CART; payload: ProductWithQuantity[] };

export interface CartContextState {
  loading: boolean;
  products: ProductWithQuantity[];
}

const initialState: CartContextState = {
  loading: true,
  products: [],
};

type CartProviderState = {
  state: CartContextState;
  dispatch: React.Dispatch<CartAction>;
};

const CartContext = createContext<CartProviderState>({
  state: initialState,
  dispatch: () => undefined,
});

export const CartProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    dispatch({
      type: CartActionType.LOAD_CART,
      payload: (storedCart
        ? JSON.parse(storedCart)
        : []) as ProductWithQuantity[],
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.products));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

export default CartProvider;
