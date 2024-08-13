import type {
  CartAction,
  CartActionType,
  CartContextState,
} from './cart-provider';

const cartReducer = (state: CartContextState, action: CartAction) => {
  switch (action.type) {
    case 'ADD_ITEM' as CartActionType.ADD_ITEM:
      return {
        ...state,
        products: [...state.products, { ...action.payload, quantity: 1 }],
      };

    case 'REMOVE_ITEM' as CartActionType.REMOVE_ITEM:
      return {
        ...state,
        products: state.products.filter(
          (item) => item.id !== action.payload.id,
        ),
      };

    case 'EMPTY_CART' as CartActionType.EMPTY_CART:
      return {
        ...state,
        products: [],
      };

    case 'INCREASE_QUANTITY' as CartActionType.INCREASE_QUANTITY: {
      const updatedProducts = state.products.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      return {
        ...state,
        products: updatedProducts,
      };
    }

    case 'DECREASE_QUANTITY' as CartActionType.DECREASE_QUANTITY: {
      const updatedProducts = state.products
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
      return {
        ...state,
        products: updatedProducts,
      };
    }

    case 'LOAD_CART' as CartActionType.LOAD_CART:
      return {
        ...state,
        products: [...action.payload],
        loading: false,
      };

    default:
      return state;
  }
};

export default cartReducer;
