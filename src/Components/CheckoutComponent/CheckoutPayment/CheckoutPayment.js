import React from "react";
import "./CheckoutPayment.css";
import confirmImg from "../../../Assets/Images/confirm_order_img.png";
import { Link } from "react-router-dom";

const CheckoutPayment = () => {
  return (
    <div>
      <h3 className="mb-4">Payment method</h3>
      <hr />
      <h6 class="my-5">Choose payment</h6>
      <div>
        <Link to="/checkout-complete">
        <div className="confirm_order_img">
          <img alt="" src={confirmImg} />
        </div>
        </Link>
      </div>
      <div className="back_to_shipping">
        <Link to="/shipping-details">
          <button>Back to Shipping</button>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPayment;
