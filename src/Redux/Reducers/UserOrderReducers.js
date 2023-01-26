import {
  LOAD_USER_ORDERS_REQUEST,
  LOAD_USER_ORDERS_SUCCESS,
  LOAD_USER_ORDERS_FAIL,
  LOAD_USER_ORDERS_DETAILS_REQUEST,
  LOAD_USER_ORDERS_DETAILS_SUCCESS,
  LOAD_USER_ORDERS_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../Constants/UserConstants.js";

//user orders reducer
export const userOrderReducers = (state = { userOrders: [] }, action) => {
  switch (action.type) {
    case LOAD_USER_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case LOAD_USER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userOrders: action.payload,
      };
    case LOAD_USER_ORDERS_FAIL:
      return {
        loading: false,
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


//user orders details reducer
export const userOrderDetailReducers = (state = { userOrderDetails: [] }, action) => {
  switch (action.type) {
    case LOAD_USER_ORDERS_DETAILS_REQUEST:
      return {
        loading: true,
        // isAuthenticated: false,
      };
    case LOAD_USER_ORDERS_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        // isAuthenticated: true,
        userOrderDetails: action.payload,
      };
    case LOAD_USER_ORDERS_DETAILS_FAIL:
      return {
        loading: false,
        // isAuthenticated: false,
        userOrderDetails: null,
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
