import axios from "axios";
import { baseUrl } from "./../../BaseUrl/BaseUrl";

// ADD TO CART without login
export const addItemsToCart =
  (product, quantity, defaultChoices) => async (dispatch, getState) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product,
        quantity,
        defaultChoices
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );

    const productId = product.id;
    const carAllItems = getState().cart.cartItems;
    console.log(carAllItems)

    const cartGroupItems = getState().cartGroup.cartGroupItems;

    const isItemExist = cartGroupItems?.find((i) => i.product_id === productId);

    
    const cartUpdateInfo = {
      key: `${isItemExist?.id}`,
      quantity: `${quantity}`,
    };

    if (isItemExist) {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.post(
        `${baseUrl}/cart/update`,
        cartUpdateInfo,
        config
      );

      dispatch({
        type: "UPDATE_CART",
        payload: data,
      });
    }
  };


// ADD TO CART without login
export const updateItemsToCart =
  (product, quantity) => async (dispatch, getState) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product,
        quantity
        
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );

    const productId = product.id;
    const carAllItems = getState().cart.cartItems;
    console.log(carAllItems)

    const cartGroupItems = getState().cartGroup.cartGroupItems;

    const isItemExist = cartGroupItems?.find((i) => i.product_id === productId);

    
    const cartUpdateInfo = {
      key: `${isItemExist?.id}`,
      quantity: `${quantity}`,
    };

    if (isItemExist) {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.post(
        `${baseUrl}/cart/update`,
        cartUpdateInfo,
        config
      );

      dispatch({
        type: "UPDATE_CART",
        payload: data,
      });
    }
  };


// add to cart with login.
export const addItemsToCartWithLogin = () => async (dispatch, getState) => {
  const cartItemList = getState().cart.cartItems;

  console.log(cartItemList)

  let bulk = [];

  cartItemList.forEach((element) => {
    let product = {};
    let choiceOption = element.defaultChoices

    product.id = element.product.id;
    product.quantity = element.quantity;
    choiceOption.forEach((element) => {
      product[element.name] = `${element.options}`.trim();
    });

    bulk.push(product);
  });


  try {
    dispatch({ type: "ADD_TO_CART_WITH_LOGIN_REQUEST" });
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.post(`${baseUrl}/cart/add-bulk`, bulk, config);
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
  (addItemToCartAfterLoginData) => async (dispatch, getState) => {
    try {
      dispatch({ type: "ADD_TO_CART_AFTER_LOGIN_REQUEST" });
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.post(
        `${baseUrl}/cart/add`,
        addItemToCartAfterLoginData,
        config
      );

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

    // dispatch({ type: "GET_CART_SUCCESS", payload: data.data });

    // localStorage.setItem("cartGroupItems", JSON.stringify(getState().cartGroup.cartGroupItems));
  } catch (error) {
    dispatch({ type: "GET_CART_FAIL", payload: error.response.data.message });
  }
};


// REMOVE FROM CART
export const removeItemsFromCart =
  (productId) => async (dispatch, getState) => {

    dispatch({
      type: "REMOVE_FROM_CART",
      payload: productId,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );

    const cartGroupItem = getState().cartGroup.cartGroupItems;
    const isItemExist = cartGroupItem.find((i) => i.product_id === productId);
    const cartId = { key: `${isItemExist?.id}` };

    if (isItemExist) {
      dispatch({type: "REMOVE_ITEM_FROM_CART_REQUEST"} )
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const { data } = await axios.post(
        `${baseUrl}/cart/remove`,
        cartId,
        config
      );
      // console.log(data)
      dispatch({
        type: "REMOVE_ITEM_FROM_CART_SUCCESS",
        payload: productId,
      });
    
    }
    dispatch(getCartData());
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
