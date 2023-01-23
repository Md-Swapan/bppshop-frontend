import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_PRODUCT_ERROR,
} from "../Constants/ProductConstants";


const ProductReducers = (state = { product: [] }, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        product: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload.products,
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_PRODUCT_ERROR:
      return {
        ...state,
        error: null,
      };

      default:
      return  state
  }
};
export default ProductReducers;
