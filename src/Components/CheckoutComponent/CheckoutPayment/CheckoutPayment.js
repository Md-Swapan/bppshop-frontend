import React from "react";
import "./CheckoutPayment.css";
import confirmImg from "../../../Assets/Images/confirm_order_img.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import {
  ClearCart,
  ClearCartGroupItems,
} from "../../../Redux/Actions/CartAction";
import { clearShippingAddress } from "../../../Redux/Actions/ShippingAddressAction";

const CheckoutPayment = () => {
  const { shippingAddressInfo } = useSelector((state) => state?.shippingInfo);
  // console.log(shippingAddressInfo);
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleCheckoutConfirm = (id) => {
    const address_id = {
      address_id: id,
    };
    axios.post(`${baseUrl}/cart/checkout`, address_id, config).then((res) => {
      if (res.data.status === "success") {
        dispatch(ClearCart());
        dispatch(clearShippingAddress());
        dispatch(ClearCartGroupItems());
        navigate("/checkout-complete");
      }
    });
  };

  return (
    <div>
      <h3 className="mb-4">Payment method</h3>
      <hr />
      <h6 className="my-5">Choose payment</h6>
      <button
        onClick={() => handleCheckoutConfirm(shippingAddressInfo?.data?.id)}
        className="confirm_order_img"
      >
        <img alt="" src={confirmImg} />
      </button>
      <div className="back_to_shipping">
        <Link to="/shipping-details">
          <button>Back to Shipping</button>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPayment;
