import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./ShippingHome.css";
import { useNavigate } from "react-router-dom";

const ShippingHome = () => {
  const navigate = useNavigate();

  const { shippingAddressInfo } = useSelector((state) => state?.shippingInfo);

  const changeShippingInfo = () => {
    navigate("/shipping-address");
    window.location.reload(true);
  };

  const addressSelectHandlerAlert = () => {
    document.querySelector(".chooseAlert").innerHTML =
      "Please choose delivery address before proceed payment.";
    document.querySelector(".chooseDeliveryAlert").innerHTML =
      "Please choose delivery address";
  };

  return (
    <div>
      <h2 className="shipping-heading">DELIVERY ADDRESS</h2>
      <hr className="shipping_billing_header_line" />

      <div className="shipping_container">
        <p className="chooseAlert text-danger"></p>
        <div className="shipping-address-heading">Choose Delivery address</div>
        {shippingAddressInfo?.data &&
        shippingAddressInfo?.data?.is_billing === "1" ? (
          <div className="shipping_address_box">
            <div className="shipped_name">
              <h6>
                Delivery to : {shippingAddressInfo?.data?.contact_person_name}
              </h6>
            </div>
            <div className="shipped_address">
              <span className="home_text"> Home </span>
              <span className="mx-1">
                {shippingAddressInfo?.data?.phone} |{" "}
                {shippingAddressInfo?.data?.address}{" "}
              </span>
              <Link
                to={`/edit-shipping-address/${shippingAddressInfo?.data?.id}`}
              >
                <span className="change_text m-2">
                  <i className="bi bi-pencil-fill"></i> Edit
                </span>
              </Link>
              <span
                onClick={() => changeShippingInfo()}
                className="change_text mx-3"
              >
                <i class="bi bi-arrow-down-up"></i> Change Address
              </span>
            </div>
          </div>
        ) : (
          <Link to="/shipping-address">
            <button className="add_shipping_address_btn">
              <i className="bi bi-plus"></i> Choose Delivery Address
            </button>
          </Link>
        )}
      </div>
      <div className="shop_payment_btn_content">
        <div className="shop_payment_btn">
          <Link to="/shipping-details/checkout-shop-cart">
            <div className="shop_cart_btn">
              <i className="bi bi-chevron-left"></i> Shopping cart
            </div>
          </Link>
          {shippingAddressInfo?.data?.is_billing === "1" ? (
            <Link to="/shipping-details/checkout-payment">
              <div className="proceed_payment_btn">
                Proceed payment <i className="bi bi-chevron-right"></i>
              </div>
            </Link>
          ) : (
            <div
              onClick={addressSelectHandlerAlert}
              className="proceed_payment_btn text-center text-white"
              style={{ cursor: "pointer" }}
            >
              <span className="chooseDeliveryAlert">
                Proceed payment <i className="bi bi-chevron-right"></i>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingHome;
