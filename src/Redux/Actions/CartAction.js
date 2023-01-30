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

  let cartItems = [
    { product_id: 1, quantity: 2 },
    { product_id: 2, quantity: 1 },
    { product_id: 3, quantity: 3 }
];

cartItems.forEach(function(item) {
    let product_id = item.product_id;
    let quantity = item.quantity;

    fetch('http://example.com/add_to_cart', {
        method: 'POST',
        body: JSON.stringify({ product_id, quantity }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});


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
