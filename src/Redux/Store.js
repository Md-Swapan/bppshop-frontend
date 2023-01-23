import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";
import CartReducers from "./Reducers/CartReducers";

// const persistConfig = {
//   key: "root",
//   storage,
// };

const rootReducer = combineReducers({
  cart: CartReducers,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(rootReducer, composeWithDevTools());

// export const persistor = persistStore(store);

export default store;
