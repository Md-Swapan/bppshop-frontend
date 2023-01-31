import {
    DELIVARY_CHARGE_REQUEST,
    DELIVARY_CHARGE_SUCCESS,
    DELIVARY_CHARGE_FAIL,
  } from "../Constants/DelivaryChargeConstans";
  
  
  const delivaryChargeReducers = (state = { delivaryCharge: {} }, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case DELIVARY_CHARGE_REQUEST:
        return {
          loading: true,
          delivaryCharge: {},
        };
      case DELIVARY_CHARGE_SUCCESS:
        return {
          ...state,
          loading: false,
          delivaryCharge: action.payload,
        };
      case DELIVARY_CHARGE_FAIL:
        return {
          loading: false,
          delivaryCharge: null,
          error: action.payload,
        };
  
        default:
        return  state
    }
  };
  export default delivaryChargeReducers;