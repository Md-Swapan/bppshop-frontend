import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CartDetailsView.css";
import { Link } from "react-router-dom";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "./../../../Redux/Actions/CartAction";
import { imgThumbnailBaseUrl } from "../../../BaseUrl/BaseUrl";
import toast from "react-hot-toast";

const notify = () =>
  toast.error("Stock Limited.", {
    duration: 3000,
    style: {
      width: "100%",
      height: "80px",
      padding: "0px 20px",
      color: "red",
    },
  });


const CartDetailsView = () => {
  const [quantityCount, setQuantityCount] = useState(1);
  const dispatch = useDispatch();

   
  const cartItems = useSelector((state) => {
    return state.cart.cartItems;
  });


  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      notify();
      return;
    }

    dispatch(addItemsToCart(id, newQty));
  };


  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };


  //cart item remove functionality
  const handleRemoveItemFormCart = (id) => {
    dispatch(removeItemsFromCart(id));
    // toaster
    toast.success(`Item removed from cart successfully`, {
      duration: 5000,
      style: {
        width: "100%",
        height: "80px",
        padding: "0px 20px",
        background: "green",
        color: "#fff"
      },
    });
  };

  const CartDetailsCloseHandler = () => {
    const cartDetailsViewContainer = document.querySelector(
      ".cartDetailsView-container"
    );
    const cartDetailsViewSectionOverlay = document.querySelector(
      ".cartDetailsView_section_overlay"
    );
    cartDetailsViewSectionOverlay.style.display = "none";
    cartDetailsViewContainer.classList.toggle(
      "cartDetailsView-container-toggle"
    );
  };


  const CartDetailsCloseHandlerAfterPlaceOrder = () => {
    
    const cartDetailsViewSectionOverlay = document.querySelector(
      ".cartDetailsView_section_overlay"
    );

    cartDetailsViewSectionOverlay.style.display = "none";
    // document.querySelector(".cartDetailsView-container").style.display = "none";
  };


  const CartEmptyAlert = () => {
    document.querySelector(".cartEmptyAlert").innerHTML =
      "Please add product in cart first.";
    document.querySelector(".cartEmptyAlert").style.color = "red";
  };


  return (
    <>
      <div className="cartDetailsView-container">
        <div className="cartDetailsView-header">
          <h4>My Cart</h4>
          <p onClick={CartDetailsCloseHandler}>
            <i className="bi bi-x-lg"></i>
          </p>
        </div>
        <div className="cartDetailsView-content">
          {cartItems?.length < 1 ? (
            <h4 className="mt-4 text-center cartEmptyAlert">
              You have no items in your cart!
            </h4>
          ) : (
            cartItems?.map((item) => (
              <div key={item?.product?.id} className="cartDetails">
                <img
                  src={imgThumbnailBaseUrl + `/${item?.product?.thumbnail}`}
                  alt=""
                />
                <div className="cart-content-qty-container">
                  <div className="d-flex justify-content-between">
                    <small>
                      {item?.product?.name?.toString().substring(0, 20)}...
                    </small>
                    <span
                      onClick={() =>
                        handleRemoveItemFormCart(item?.product?.id)
                      }
                      className="cartItemDeleteBtn"
                    >
                      <i className="bi bi-trash3"></i>
                    </span>
                  </div>
                  <div className="cart-content">
                    {item?.product?.discount > 0 ? (
                      <div className="d-flex justify-content-center align-items-center">
                        <span>
                          {" "}
                          ৳{item?.product?.unit_price - item?.product?.discount}
                        </span>{" "}
                        <del className="text-danger ms-1">
                          ৳{item?.product?.unit_price}
                        </del>
                      </div>
                    ) : (
                      <div>
                        {" "}
                        <span>৳{item?.product?.unit_price}</span>
                      </div>
                    )}

                    <div className="cartTitleQty">
                      <div className="quantity-set">
                        <span
                          onClick={() =>
                            decreaseQuantity(item?.product, item?.quantity)
                          }
                          className="cartMinusBtn"
                        >
                          <i class="bi bi-dash-lg"></i>
                        </span>
                        <span className="qtyCount-number">
                          {item?.quantity}
                        </span>
                        <span
                          onClick={() =>
                            increaseQuantity(
                              item?.product,
                              item?.quantity,
                              item?.product?.current_stock
                            )
                          }
                          className="cartPlusBtn"
                        >
                          <i class="bi bi-plus-lg"></i>
                        </span>
                      </div>
                      {item?.product?.discount > 0 ? (
                        <span className="mx-2 text-end">
                          ৳
                          {item?.quantity *
                            (item?.product?.unit_price -
                              item?.product?.discount)}
                        </span>
                      ) : (
                        <span className="mx-2 text-end">
                          ৳{item?.quantity * item?.product?.unit_price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-total-container">
          <div className="d-flex justify-content-between">
            <h6>Grand Total: </h6>
            <h6>
              ৳{" "}
              {`${cartItems?.reduce(
                (acc, item) =>
                  acc +
                  item?.quantity *
                    (item?.product?.unit_price - item?.product?.discount) *
                    quantityCount,
                0
              )}`}
            </h6>
          </div>
          {cartItems?.length < 1 ? (
            <button onClick={CartEmptyAlert} type="">
              Place Order
            </button>
          ) : (
            <Link to="shipping-details">
              <button onClick={CartDetailsCloseHandlerAfterPlaceOrder} type="">
                Place Order
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDetailsView;
