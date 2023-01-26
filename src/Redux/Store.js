import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import CartReducers from "./Reducers/CartReducers";
import { userReducer } from './Reducers/UserReducers';
import { userOrderReducers } from './Reducers/UserOrderReducers';
import { addShippingAddressReducers, loadAllShippingAddressReducers, } from "./Reducers/ShippingAddressReducers";
import PriceVariantReducers from './Reducers/PriceVariantReducers';


const rootReducer = combineReducers({
  cart: CartReducers,
  user: userReducer,
  userOrders: userOrderReducers,
  shippingInfo: addShippingAddressReducers,
  allShippingInfo: loadAllShippingAddressReducers,
  priceVariant: PriceVariantReducers
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
  }
};
const middleware = [thunk];


const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store;
