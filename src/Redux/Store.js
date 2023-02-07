import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import CartReducers from "./Reducers/CartReducers";
import { userReducer } from './Reducers/UserReducers';
import { userOrderDetailReducers, userOrderReducers } from './Reducers/UserOrderReducers';
import { addShippingAddressReducers, loadAllShippingAddressReducers, } from "./Reducers/ShippingAddressReducers";
import PriceVariantReducers from './Reducers/PriceVariantReducers';
import { productDetailsReducers } from "./Reducers/ProductReducers";
import CartGroupReducers from "./Reducers/CartGroupReducers";
import deliveryChargeReducers from "./Reducers/DeliveryChargeReducer";


const rootReducer = combineReducers({
  cart: CartReducers,
  cartGroup: CartGroupReducers,
  user: userReducer,
  userOrders: userOrderReducers,
  userOrderDetails:userOrderDetailReducers,
  shippingInfo: addShippingAddressReducers,
  allShippingInfo: loadAllShippingAddressReducers,
  priceVariant: PriceVariantReducers,
  productDetails: productDetailsReducers,
  deliveryCharge:deliveryChargeReducers,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },

  shippingInfo: {
    shippingAddressInfo: localStorage.getItem("shippingAddressInfo")
      ? JSON.parse(localStorage.getItem("shippingAddressInfo"))
      : {},
  },
  cartGroup : {
    cartGroupItems : localStorage.getItem("cartGroupItems") 
    ? JSON.parse(localStorage.getItem("cartGroupItems"))
    : []
  },
  deliveryCharge : {
    deliveryCharge : localStorage.getItem("deliveryCharge") 
    ? JSON.parse(localStorage.getItem("deliveryCharge"))
    : {}
  }
};
const middleware = [thunk];


const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store;
