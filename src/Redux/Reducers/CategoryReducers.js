import {
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
  CLEAR_CATEGORY_ERROR,
} from "../Constants/CategoryConstants";


const CategoryReducers = (state = { category: [] }, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ALL_CATEGORY_REQUEST:
      return {
        loading: true,
        product: [],
      };
    case ALL_CATEGORY_SUCCESS:
      return {
        loading: false,
        product: action.payload.products,
      };
    case ALL_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_CATEGORY_ERROR:
      return {
        ...state,
        error: null,
      };

      default:
      return  state
  }
};
export default CategoryReducers;
