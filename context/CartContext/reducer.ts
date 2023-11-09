import { ProductWithQuantity } from '@/types';
import { CartContextState } from './index';

enum CartActionType {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  EMPTY_CART = 'EMPTY_CART',
  INCREASE_QTY = 'INCREASE_QTY',
  DECREASE_QTY = 'DECREASE_QTY',
}

const cartReducer = (state: CartContextState, action) => {
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
          if (item.id === action.payload) {
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
            if (item.id === action.payload) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          })
          .filter((item) => item.quantity > 0),
      };

    default:
      return state;
  }
};

export default cartReducer;
