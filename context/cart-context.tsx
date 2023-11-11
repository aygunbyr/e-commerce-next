'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';

import type { ProductWithQuantity } from '@/types';

interface CartContextState {
  products: ProductWithQuantity[];
}

const initialState: CartContextState = {
  products: [],
};

interface CardContextProviderProps {
  children: React.ReactNode;
}

enum CartActionType {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  EMPTY_CART = 'EMPTY_CART',
  INCREASE_QTY = 'INCREASE_QTY',
  DECREASE_QTY = 'DECREASE_QTY',
  SET_CART = 'SET_CART',
}

type CartAction = {
  type: CartActionType;
  payload: any;
};

const cartReducer = (state: CartContextState, action: CartAction) => {
  switch (action.type) {
    case CartActionType.ADD_ITEM:
      return {
        ...state,
        products: [...state.products, { ...action.payload, quantity: 1 }],
      };

    case CartActionType.REMOVE_ITEM:
      return {
        ...state,
        products: state.products.filter(
          (item: ProductWithQuantity) => item.id !== action.payload?.id,
        ),
      };

    case CartActionType.EMPTY_CART:
      return {
        ...state,
        products: [],
      };

    case CartActionType.INCREASE_QTY:
      return {
        ...state,
        products: state.products.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };

    case CartActionType.DECREASE_QTY:
      return {
        ...state,
        products: state.products
          .map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          })
          .filter((item) => item.quantity > 0),
      };

    case CartActionType.SET_CART:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartContextState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export const CartContextProvider = ({ children }: CardContextProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      dispatch({
        type: CartActionType.SET_CART,
        payload: JSON.parse(storedCart),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
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
    throw new Error('useCart must be used within a CartContextProvider');
  }

  return context;
};
