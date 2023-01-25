import {
  LOAD_USER_ORDERS_REQUEST,
  LOAD_USER_ORDERS_SUCCESS,
  LOAD_USER_ORDERS_FAIL,
  CLEAR_ERRORS,
} from "../Constants/UserConstants.js";
import axios from "axios";
import { baseUrl } from './../../BaseUrl/BaseUrl';


// Load User Orders 
export const loadUserOrders = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_ORDERS_REQUEST });

    const token = localStorage.getItem("token");

    const { data } = await axios.get(`${baseUrl}/customer/order/list`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: LOAD_USER_ORDERS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: LOAD_USER_ORDERS_FAIL, payload: error.response.data.message });
  }
};