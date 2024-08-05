'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';

import type { ProductWithQuantity } from '@/types';

interface CartContextState {
  loading: boolean;
  products: ProductWithQuantity[];
}

const initialState: CartContextState = {
  loading: true,
  products: [],
};

export enum CartActionType {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  EMPTY_CART = 'EMPTY_CART',
  INCREASE_QUANTITY = 'INCREASE_QUANTITY',
  DECREASE_QUANTITY = 'DECREASE_QUANTITY',
  LOAD_CART = 'LOAD_CART',
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
          (item) => item.id !== action.payload?.id,
        ),
      };

    case CartActionType.EMPTY_CART:
      return {
        ...state,
        products: [],
      };

    case CartActionType.INCREASE_QUANTITY: {
      const product = state.products.find(
        (item) => item.id === action.payload.id,
      );
      if (product) {
        product.quantity += 1;
      }
      return {
        ...state,
        products: [...state.products],
      };
    }

    case CartActionType.DECREASE_QUANTITY: {
      const product = state.products.find(
        (item) => item.id === action.payload.id,
      );
      if (product) {
        product.quantity -= 1;
      }
      return {
        ...state,
        products: state.products.filter((item) => item.quantity > 0),
      };
    }

    case CartActionType.LOAD_CART:
      return {
        ...state,
        products: [...action.payload],
        loading: false,
      };

    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartContextState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    dispatch({
      type: CartActionType.LOAD_CART,
      payload: storedCart ? JSON.parse(storedCart) : [],
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
    throw new Error('useCart must be used within a CartContextProvider');
  }

  return context;
};
