import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './ShippingHome.css';
import { useNavigate } from 'react-router-dom';

const ShippingHome = () => {
  const navigate = useNavigate()
  const {shippingAddressInfo} = useSelector((state) => state?.shippingInfo);

  const changeShippingInfo = () => {
    navigate("/shipping-address")

    window.location.reload(true);
  }
    return (
        <div>
            <div className="shiping-heading">
              DELIVERY ADDRESS
              </div>
              <hr className="shippin_billing_header_line" />
              {/* <div class="progress_container">
                <div
                  class="progress_content"
                  role="progressbar"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div> */}
              <div className="shiping_container">
                <div className="shiping-address-heading">
                  Choose Delivery address
                </div>
                {shippingAddressInfo?.data?.is_billing === "1" ? (
                  <div className="shiping_address_box">
                    <div className="shiped_name">
                      Delivery to :{" "}
                      {shippingAddressInfo?.data?.contact_person_name}
                    </div>
                    <div className="shiped_address">
                      <span className="home_text"> home </span>
                      {shippingAddressInfo?.data?.phone} |{" "}
                      {shippingAddressInfo?.data?.address}{" "}
                        <span onClick={() =>changeShippingInfo()} className="change_text">
                          <i class="bi bi-pencil-fill"></i> Change
                        </span>
                    </div>
                  </div>
                 ) : (
                  <div class="add_shipping_address_btn">
                    <Link to="/shipping-address">
                      <div className="d-flex justify-content-center align-items-center">
                        <div>
                          <i class="bi bi-plus"></i>
                        </div>
                        <div>Choose Delevary Address</div>
                      </div>
                    </Link>
                  </div>
                )} 
              </div>
              <div className="shop_payment_btn_content">
                <div className="shop_payment_btn">
                  <div className="shop_cart_btn">
                    <i class="bi bi-chevron-left"></i> Shop cart
                  </div>
                  <div className="proceed_payment_btn">
                    <Link to="/shipping-details/checkout-payment">Proceed payment <i class="bi bi-chevron-right"></i></Link>
                  </div>
                </div>
              </div>
        </div>
    );
};

export default ShippingHome;