import axios from "axios";
import { baseUrl } from "./../../BaseUrl/BaseUrl";

// ADD TO CART without login
export const addItemsToCart =
  (product, quantity) => async (dispatch, getState) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product,
        quantity,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

// add to cart with login.
export const addItemsToCartWithLogin = () => async (dispatch, getState) => {
  const cartItemList = getState().cart.cartItems;
  let bulk = [];

  cartItemList.forEach((element) => {
    let product = {};
    product.id = element.product.id;
    if (element.product.colors.length) {
      product.color = element.product.colors[0].code;
    }
    product.choice_19 = element.product.choice_options[0].options[0];
    product.quantity = element.quantity;

    bulk.push(product);
    console.log(bulk);
  });

  try {
    dispatch({ type: "ADD_TO_CART_WITH_LOGIN_REQUEST" });
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.post(`${baseUrl}/cart/add-bulk`, bulk, config);

    console.log(data);
    data.cart.forEach((element) => {
      dispatch({ type: "ADD_TO_CART_WITH_LOGIN_SUCCESS", payload: element });
    });

    localStorage.setItem(
      "cartGroupItems",
      JSON.stringify(getState().cartGroup.cartGroupItems)
    );
  } catch (error) {
    dispatch({
      type: "ADD_TO_CART_WITH_LOGIN_FAIL",
      payload: error.response.data.message,
    });
  }
};

// add to cart after login.
export const addItemsToCartAfterLogin =
  (addItemToCartDataAfterLogin) => async (dispatch, getState) => {
    try {
      dispatch({ type: "ADD_TO_CART_AFTER_LOGIN_REQUEST" });
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.post(
        `${baseUrl}/cart/add`,
        addItemToCartDataAfterLogin,
        config
      );

      console.log(data);
      dispatch(getCartData());
      dispatch({ type: "ADD_TO_CART_AFTER_LOGIN_SUCCESS", payload: data.data });

      localStorage.setItem(
        "cartGroupItems",
        JSON.stringify(getState().cartGroup.cartGroupItems)
      );
    } catch (error) {
      dispatch({
        type: "ADD_TO_CART_AFTER_LOGIN_FAIL",
        payload: error.response.data.message,
      });
    }
  };


// get cart data.
export const getCartData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_CART_REQUEST" });
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.get(`${baseUrl}/cart`, config);

    console.log(data.data);

    // dispatch({ type: "GET_CART_SUCCESS", payload: data.data });

    // localStorage.setItem("cartGroupItems", JSON.stringify(getState().cartGroup.cartGroupItems));
  } catch (error) {
    dispatch({ type: "GET_CART_FAIL", payload: error.response.data.message });
  }
};


// REMOVE FROM CART
export const removeItemsFromCart = (payload) => async (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// CLEAR CART
export const ClearCart = () => async (dispatch, getState) => {
  dispatch({
    type: "CLEAR_CART",
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const ClearCartGroupItems = () => async (dispatch, getState) => {
  dispatch({
    type: "CLEAR_CART_GROUP_ITEMS",
  });

  localStorage.setItem(
    "cartGroupItems",
    JSON.stringify(getState().cartGroup.cartGroupItems)
  );
};
