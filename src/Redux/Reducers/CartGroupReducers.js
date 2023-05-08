const CartGroupReducers = (state = { cartGroupItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART_WITH_LOGIN_REQUEST":
    case "ADD_TO_CART_AFTER_LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ADD_TO_CART_WITH_LOGIN_SUCCESS":
    case "ADD_TO_CART_AFTER_LOGIN_SUCCESS":
    case "GET_CART_SUCCESS":
      return {
        ...state,
        loading: false,
        cartGroupItems: [...state.cartGroupItems, action.payload],
      };

    case "ADD_TO_CART_WITH_LOGIN_FAIL":
    case "ADD_TO_CART_AFTER_LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "REMOVE_ITEM_FROM_CART_GROUP":
      return {
        ...state,
        cartGroupItems: state.cartGroupItems.filter(
          (item) => item.product_id !== action.payload
        ),
      };

    case "CLEAR_CART_GROUP_ITEMS": {
      return {
        cartGroupItems: [],
      };
    }

    default:
      return state;
  }
};
export default CartGroupReducers;
