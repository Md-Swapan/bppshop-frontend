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




    case "ADD_TO_CART_AFTER_LOGIN_REQUEST":
      // case "ADD_TO_CART_WITH_LOGIN_REQUEST":
      return {
        loading: true,
      };
    // case "ADD_TO_CART_WITH_LOGIN_SUCCESS":
    case "ADD_TO_CART_AFTER_LOGIN_SUCCESS":
      return {
        // ...state,
        loading: false,
        cartItems: [...state.cartItems, action.payload],
      };
    // case "ADD_TO_CART_WITH_LOGIN_FAIL":
    case "ADD_TO_CART_AFTER_LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };




    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product?.id !== action.payload
        ),
      };




    case "CLEAR_CART": {
      return {
        cartItems: [],
      };
    }




    // case "GET_CART_REQUEST":
    //   return {
    //     loading: true,
    //     cartItems: [],
    //   };

    // case "GET_CART_SUCCESS":
    //   return {
    //     ...state,
    //     loading: false,
    //     cartItems: [...state.cartItems, action.payload],
    //   };

    // case "GET_CART_FAIL":
    //   return {
    //     ...state,
    //     loading: false,
    //     cartItems: null,
    //     error: action.payload,
    //   };




    default:
      return state;
  }
};

export default CartReducer;
