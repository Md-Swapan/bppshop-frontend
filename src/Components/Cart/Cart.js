import React from "react";
import "./Cart.css";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => {
    return state.cart.cartItems;
  });

  const CartDetailsViewHandler = () => {
    const cartDetailsViewContainer = document.querySelector(
      ".cartDetailsView-container"
    );
    cartDetailsViewContainer.style.display = "block";
    cartDetailsViewContainer.classList.toggle("cartDetailsView-container-toggle");
    // document.querySelector(".cart").style.display = "none";
  };

  const sidebarOpenHandler = () => {
    document.querySelector("#sidebarMenu").style.transform = 'translateX(-300px)';
  }
  return (
    <>
      <div className="cart">
        <button onClick={sidebarOpenHandler} className="start-shopping-btn ">Start Shopping</button>
        <div onClick={CartDetailsViewHandler}>
          <div className="cartIcon">
            <i className="bi bi-cart-plus"></i>
            <br />
            <span className="itemsForFullScreen">
              {" "}
              {cartItems?.length} Items
            </span>
            <span className="itemsForResScreen"> {cartItems?.length}</span>
          </div>
          <div className="cartTotalPrice">
            <small>
              ৳{" "}
              {`${cartItems?.reduce(
                (acc, item) => acc + item?.quantity * item?.product?.unit_price,
                0
              )}`}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
