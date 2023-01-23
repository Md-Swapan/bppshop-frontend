const CartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      // return {
      //   ...state,
      //   cartItems: [...state.cartItems, action.payload],
      // };
      // return [...state, action.payload];

      const item = action.payload;

      const isItemExist = state.cartItems.find(
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

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product?.id !== action.payload),
      };

    case "CLEAR_CART": {
      return [];
    }

    default:
      return state;
  }
};


export default CartReducer;
