import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_PRODUCT_ERROR,
} from "../Constants/ProductConstants";
import axios  from 'axios';
import { baseUrl } from "../../BaseUrl/BaseUrl";

export const getProducts = () => async(id, dispatch) => {
  try {
    dispatch({type: ALL_PRODUCT_REQUEST} )
    const {data} = await axios.get(`${baseUrl}/categories/products/${id}`)

    dispatch({
      type : ALL_PRODUCT_SUCCESS,
      payload: data

    })
  }
  catch(error){
    dispatch({
      type : ALL_PRODUCT_FAIL,
      payload: error.response.data.message

    })
  }
};

export const clearProductErrors = () => async (dispatch) => {
  dispatch({type: CLEAR_PRODUCT_ERROR});
}
