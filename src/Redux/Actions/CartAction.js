import axios from "axios";

export const addItemsToCart = (product, quantity) => {

  const addItemsData = {
    product,
    quantity
  }


    // axios.post(`https://bppshop.com.bd/api/v1/cart/add/${addItemsData}`)
    // .then(res => console.log(res))
 
    axios({
      method: 'post',
      url: `https://bppshop.com.bd/api/v1/cart/add`,
      addItemsData
    }).then((res) => {
      console.log(res)
    });

  return {
    type: 'ADD_TO_CART',
    payload : {
      product,
      quantity
    },
    
  }
  // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}
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


export const removeItemsFromCart = (payload) => {
  return {
    type: "REMOVE_FROM_CART",
    payload,
  };
};

export const ClearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};