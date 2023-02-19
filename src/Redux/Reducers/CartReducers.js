const CartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const item = action.payload;

      const isItemExist = state.cartItems?.find(
        (i) => i.product.id === item.product.id
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product.id === isItemExist.product.id ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    }

    case "REMOVE_ITEM_FROM_CART_REQUEST":
      return {
        loading: true,
        ...state,
        
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product?.id !== action.payload
        ),
      };

    case "REMOVE_ITEM_FROM_CART_SUCCESS":
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.filter(
          (item) => item.product?.id !== action.payload
        ),
      };
    case "CLEAR_CART": {
      return {
        cartItems: [],
      };
    }

    default:
      return state;
  }
};

export default CartReducer;
