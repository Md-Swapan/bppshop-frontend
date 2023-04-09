import React from "react";
import "./Cart.css";
import { useSelector } from "react-redux";
import cartIcon from "../../Assets/Images/icons/download.png";

const Cart = () => {
  const cartItems = useSelector((state) => {
    return state.cart.cartItems;
  });

  const CartDetailsViewHandler = () => {
    const cartDetailsViewContainer = document.querySelector(
      ".cartDetailsView-container"
    );

    const cartDetailsViewSectionOverlay = document.querySelector(
      ".cartDetailsView_section_overlay"
    );

    cartDetailsViewContainer.style.display = "block";
    cartDetailsViewSectionOverlay.style.display = "block";

    cartDetailsViewContainer.classList.toggle(
      "cartDetailsView-container-toggle"
    );
  };

  const sidebarOpenHandler = () => {
    document.querySelector("#sidebarMenu").style.transform =
      "translateX(-300px)";
  };

  return (
    <>
      <div className="cart">
        <button onClick={sidebarOpenHandler} className="start-shopping-btn ">
          Start Shopping
        </button>
        <div onClick={CartDetailsViewHandler}>
          <div className="cartIcon">
            <img width={40} src={cartIcon} alt="" />
            <br />
            <span className="itemsForFullScreen">
              {" "}
              {cartItems?.length} Items
            </span>
            <span className="itemsForResScreen"> {cartItems?.length}</span>
          </div>
          <div className="cartTotalPrice">
            <small>
            &#2547;{" "}
              {`${cartItems?.reduce(
                (acc, item) =>
                  acc +
                  item?.quantity *
                    (item?.product?.unit_price - item?.product?.discount),
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
