import axios from "axios";

// ADD TO CART
export const addItemsToCart = (product, quantity) => (dispatch, getState) => {
  // const addItemsData = {
  //   product,
  //   quantity,
  // };

  // axios.post(`https://bppshop.com.bd/api/v1/cart/add/${addItemsData}`)
  // .then(res => console.log(res))

  // axios({
  //   method: "post",
  //   url: `https://bppshop.com.bd/api/v1/cart/add`,
  //   addItemsData,
  // }).then((res) => {
  //   console.log(res);
  // });

  dispatch( {
    type: "ADD_TO_CART",
    payload: {
      product,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


// export const addItemsToCart = (product, quantity) => async (dispatch, getState) => {
//   const { data } = await axios.get(`/api/v1/product/${id}`);

//   dispatch({
//     type: "ADD_TO_CART",
//     payload: {
//       product,
//       quantity
//     },
//   });

//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
// };

// export const removeItemsFromCart = (payload) => {
//   return {
//     type: "REMOVE_FROM_CART",
//     payload,
//   };
// };




// REMOVE FROM CART
export const removeItemsFromCart = (payload) => async (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


// CLEAR CART
export const ClearCart = () => async (dispatch, getState) => {
  dispatch({
    type: "CLEAR_CART"
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
