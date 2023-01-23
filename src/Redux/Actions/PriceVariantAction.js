import {
  PRICE_VARIANT_REQUEST,
  PRICE_VARIANT_SUCCESS,
  PRICE_VARIANT_FAIL,
  CLEAR_PRICE_VARIANT_ERROR,
} from "../Constants/PriceVariantConstants";
import axios  from 'axios';
import { baseUrl } from "../../BaseUrl/BaseUrl";


export const getPriceVariant = () => async(dispatch) => {
  try {
    dispatch({type: PRICE_VARIANT_REQUEST} )
    const {data} = await axios.post(`${baseUrl}/products/variant_price`)

    dispatch({
      type : PRICE_VARIANT_SUCCESS,
      payload: data

    })
  }
  catch(error){
    dispatch({
      type : PRICE_VARIANT_FAIL,
      payload: error.response.data.message
    })
  }
};

export const clearPriceVariantErrors = () => async (dispatch) => {
  dispatch({type: CLEAR_PRICE_VARIANT_ERROR});
}