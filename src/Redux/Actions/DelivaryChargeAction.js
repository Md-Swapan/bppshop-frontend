import {
    DELIVARY_CHARGE_REQUEST,
    DELIVARY_CHARGE_SUCCESS,
    DELIVARY_CHARGE_FAIL,
  } from "../Constants/DelivaryChargeConstans";
  import axios  from 'axios';
  import { baseUrl } from "../../BaseUrl/BaseUrl";
  
  
  export const getDelivaryCharge = (district_id) => async(dispatch) => {
    const districtId={
        "district_id":`${district_id}`,
    }
    try {
      dispatch({type: DELIVARY_CHARGE_REQUEST} )
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
        
      const { data } = await axios.post(
        `${baseUrl}/cart/delivery-charge`,
        districtId,
        config
      );
  
      dispatch({
        type : DELIVARY_CHARGE_SUCCESS,
        payload: data
  
      })
    }
    catch(error){
      dispatch({
        type : DELIVARY_CHARGE_FAIL,
        payload: error.response.data.message
      })
    }
  };