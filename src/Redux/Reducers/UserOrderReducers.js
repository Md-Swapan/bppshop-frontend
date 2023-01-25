import {
  LOAD_USER_ORDERS_REQUEST,
  LOAD_USER_ORDERS_SUCCESS,
  LOAD_USER_ORDERS_FAIL,
  CLEAR_ERRORS,
} from "../Constants/UserConstants.js";

export const userOrderReducers = (state = { userOrders: {} }, action) => {
  switch (action.type) {
    case LOAD_USER_ORDERS_REQUEST:
      return {
        loading: true,
        // isAuthenticated: false,
      };
    case LOAD_USER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        // isAuthenticated: true,
        userOrders: action.payload,
      };
    case LOAD_USER_ORDERS_FAIL:
      return {
        loading: false,
        // isAuthenticated: false,
        userOrders: null,
        error: action.payload,
      };

    // case CLEAR_ERRORS:
    //   return {
    //     ...state,
    //     error: null,
    //   };

    default:
      return state;
  }
};