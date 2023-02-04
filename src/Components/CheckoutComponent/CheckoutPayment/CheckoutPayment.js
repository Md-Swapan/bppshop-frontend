import React from "react";
import "./CheckoutPayment.css";
import confirmImg from "../../../Assets/Images/confirm_order_img.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../../BaseUrl/BaseUrl";

const CheckoutPayment = () => {
  const { shippingAddressInfo } = useSelector((state) => state?.shippingInfo);
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const navigate=useNavigate();
  const handleCheckoutConfirm = (id) => {
    const address_id = {
      address_id: id,
    };
    axios.post(`${baseUrl}/cart/checkout`,address_id, config)
    .then(res=>{
      if (res.data.status==="success") {
        navigate('/checkout-complete')
      }
    })
  };

  return (
    <div>
      <h3 className="mb-4">Payment method</h3>
      <hr />
      <h6 class="my-5">Choose payment</h6>
      <div>
        <div onClick={()=>handleCheckoutConfirm(shippingAddressInfo?.data?.id)} className="confirm_order_img">
          <img alt="" src={confirmImg} />
        </div>
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
