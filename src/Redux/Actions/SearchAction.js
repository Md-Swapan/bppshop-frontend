import axios from "axios";
import { baseUrl } from "../../BaseUrl/BaseUrl";

// Search Products
export const searchProduct = (searchData) => async (dispatch, getState) => {
  //   dispatch({
  //     type: "SEARCH_PRODUCT",
  //     payload: data,
  //   });

  try {
    dispatch({ type: "SEARCH_PRODUCT_REQUEST" });
    const url = baseUrl + "/products/search";
    const { data } = await axios.post(url, searchData );
    // console.log(data);

    dispatch({ type: "SEARCH_PRODUCT_SUCCESS", payload: data.products });
    //   localStorage.setItem("searchProduct", JSON.stringify(getState().searchProduct));
  } catch (error) {
    dispatch({ type: "SEARCH_PRODUCT_FAIL", payload: error });
  }
};
