import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import CartReducers from "./Reducers/CartReducers";
import { userReducer } from './Reducers/UserReducers';

// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";
import { userOrderReducers } from './Reducers/UserOrderReducers';

// const persistConfig = {
//   key: "root",
//   storage,
// };

const rootReducer = combineReducers({
  cart: CartReducers,
  user: userReducer,
  userOrders: userOrderReducers
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];


// const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);



// const store = createStore(rootReducer, composeWithDevTools());
// export const persistor = persistStore(store);

export default store;
