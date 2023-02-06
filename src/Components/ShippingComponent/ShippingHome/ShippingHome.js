import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./ShippingHome.css";
import { useNavigate } from "react-router-dom";

const ShippingHome = () => {
  const navigate = useNavigate();
  const { shippingAddressInfo } = useSelector((state) => state?.shippingInfo);
  // console.log(shippingAddressInfo)

  const changeShippingInfo = () => {
    navigate("/shipping-address");

    window.location.reload(true);
  };
  return (
    <div>
      <div className="shiping-heading">DELIVERY ADDRESS</div>
      <hr className="shippin_billing_header_line" />
      {/* <div className="progress_container">
                <div
                  className="progress_content"
                  role="progressbar"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div> */}
      <div className="shiping_container">
        <div className="shiping-address-heading">Choose Delivery address</div>
        {shippingAddressInfo?.data?.is_billing === "1" ? (
          <div className="shiping_address_box">
            <div className="shiped_name">
              Delivery to : {shippingAddressInfo?.data?.contact_person_name}
            </div>
            <div className="shiped_address">
              <span className="home_text"> home </span>
              {shippingAddressInfo?.data?.phone} |{" "}
              {shippingAddressInfo?.data?.address}{" "}
              <span
                onClick={() => changeShippingInfo()}
                className="change_text"
              >
                <i className="bi bi-pencil-fill"></i> Change
              </span>
            </div>
          </div>
        ) : (
          <div className="add_shipping_address_btn">
            <Link to="/shipping-address">
              <div className="d-flex justify-content-center align-items-center">
                <div>
                  <i className="bi bi-plus"></i>
                </div>
                <div>Choose Delivery Address</div>
              </div>
            </Link>
          </div>
        )}
      </div>
      <div className="shop_payment_btn_content">
        <div className="shop_payment_btn">
          <Link to="/shipping-details/checkout-shop-cart">
            <div className="shop_cart_btn">
              <i className="bi bi-chevron-left"></i> Shopping cart
            </div>
          </Link>
          <Link to="/shipping-details/checkout-payment">
            <div className="proceed_payment_btn">
              Proceed payment <i className="bi bi-chevron-right"></i>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShippingHome;
