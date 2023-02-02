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

  // const cartitem = getState().cart.cartItems.map(i=> i)
  // console.log(cartitem);


  await getState().cart.cartItems.map((i) => {
   
    let productId = i.product.id;
    let color = i.product.colors?.map((color) => color?.code);
    let choice_19 = i.product.choice_options?.map((list) => list?.options);
    let option = choice_19?.map((option) => option[0]);
    let quantity = i.quantity;

    const addItemsToCartDataWithColor = {
      id: `${productId}`,
      color: `${color[0]}`,
      choice_19: `${option[0]}`,
      quantity: `${quantity}`,
    };

    const addItemsToCartDataWithOutColor = {
      id: `${productId}`,
      choice_19: `${option[0]}`,
      quantity: `${quantity}`,
    };

    if (color.length > 0 ) {
      try {
        dispatch({ type: "ADD_TO_CART_WITH_LOGIN_REQUEST" });
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } =  axios.post(
          `${baseUrl}/cart/add`,
          addItemsToCartDataWithColor,
          config
        );

        console.log(data)
        dispatch({ type: "ADD_TO_CART_WITH_LOGIN_SUCCESS", payload: data.data });

        localStorage.setItem("cartGroupItems", JSON.stringify(getState().cartGroup.cartGroupItems));
      } catch (error) {
        dispatch({
          type: "ADD_TO_CART_WITH_LOGIN_FAIL",
          payload: error.response.data.message,
        });
      }
    }

    if(color.length < 1){
      try {
        dispatch({ type: "ADD_TO_CART_WITH_LOGIN_REQUEST" });
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const { data } = axios.post(
          `${baseUrl}/cart/add`,
          addItemsToCartDataWithOutColor,
          config
        );
        console.log(data)
        dispatch({ type: "ADD_TO_CART_WITH_LOGIN_SUCCESS", payload: data.data });

        localStorage.setItem("cartGroupItems", JSON.stringify(getState().cartGroup.cartGroupItems));
      } catch (error) {
        dispatch({
          type: "ADD_TO_CART_WITH_LOGIN_FAIL",
          payload: error.response.data.message,
        });
      }
    }
  });


  // var addItemsToCartDataWithColor;
  // var addItemsToCartDataWithOutColor;
  // var color;
 
  // await getState().cart.cartItems.forEach((i) => {
  //   let productId = i.product.id;
  //   color = i.product.colors?.map((color) => color?.code);
  //   let choice_19 = i.product.choice_options?.map((list) => list?.options);
  //   let option = choice_19?.map((option) => option[0]);
  //   let quantity = i.quantity;
   
    
  //   addItemsToCartDataWithColor = {
  //     id: `${productId}`,
  //     color: `${color[0]}`,
  //     choice_19: `${option[0]}`,
  //     quantity: `${quantity}`,
  //   };

  //    addItemsToCartDataWithOutColor = {
  //     id: `${productId}`,
  //     choice_19: `${option[0]}`,
  //     quantity: `${quantity}`,
  //   };
    
  // });

  
  // if (color.length > 0) {
  //       try {
  //         dispatch({ type: "ADD_TO_CART_WITH_LOGIN_REQUEST" });
  //         const token = localStorage.getItem("token");
  //         const config = { headers: { Authorization: `Bearer ${token}` } };
  
  //         const { data } =  axios.post(
  //           `${baseUrl}/cart/add`,
  //           addItemsToCartDataWithColor,
  //           config
  //         );
  //         console.log(data)
  //         dispatch({ type: "ADD_TO_CART_WITH_LOGIN_SUCCESS", payload: data.data });
  
  //         localStorage.setItem("cartGroupItems", JSON.stringify(getState().cartGroup.cartGroupItems));
  //       } catch (error) {
  //         dispatch({
  //           type: "ADD_TO_CART_WITH_LOGIN_FAIL",
  //           payload: error.response.data.message,
  //         });
  //       }
  //     }else{
  //       try {
  //         dispatch({ type: "ADD_TO_CART_WITH_LOGIN_REQUEST" });
  //         const token = localStorage.getItem("token");
  //         const config = { headers: { Authorization: `Bearer ${token}` } };
  
  //         const { data } = await axios.post(
  //           `${baseUrl}/cart/add`,
  //           addItemsToCartDataWithOutColor,
  //           config
  //         );
          
  //         console.log(data)
  //         dispatch({ type: "ADD_TO_CART_WITH_LOGIN_SUCCESS", payload: data.data });
  
  //         localStorage.setItem("cartGroupItems", JSON.stringify(getState().cartGroup.cartGroupItems));
  //       } catch (error) {
  //         dispatch({
  //           type: "ADD_TO_CART_WITH_LOGIN_FAIL",
  //           payload: error.response.data.message,
  //         });
  //       }
  //     }
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
