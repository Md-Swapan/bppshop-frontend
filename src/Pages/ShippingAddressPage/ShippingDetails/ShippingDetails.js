import React from "react";
import "./ShippingDetails.css";
import delivery from "../../../Assets/Images/shiping-icons/delivery.png";
import money from "../../../Assets/Images/shiping-icons/money.png";
import Genuine from "../../../Assets/Images/shiping-icons/Genuine.png";
import Payment from "../../../Assets/Images/shiping-icons/Payment.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const ShippingDetails = () => {
  const navigate = useNavigate()
  const {shippingAddressInfo} = useSelector((state) => state.shippingInfo);

  const changeShippingInfo = () => {
    navigate("/shipping-address")

    window.location.reload(true);
  }
  
  return (
    <>
      <div className="shiping-view-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="shiping-heading">
                Delivery Address
              </div>
              <hr className="shippin_billing_header_line" />
              <div class="progress_container">
                <div
                  class="progress_content"
                  role="progressbar"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="shiping_container">
                <div className="shiping-address-heading">
                  Choose Delivery Address
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
                      
                      {/* <Link to="/shipping-address"> */}
                        <span onClick={()=> changeShippingInfo()} className="change_text">
                          <i className="bi bi-pencil-fill"></i> Change
                        </span>
                      {/* </Link> */}
                    </div>
                  </div>
                 ) : (
                  <div class="add_shipping_address_btn">
                    <Link to="/shipping-address">
                      <div className="d-flex justify-content-center align-items-center">
                        <div>
                          <i class="bi bi-plus"></i>
                        </div>
                        <div>Choose Address</div>
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
                    Proceed payment <i class="bi bi-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="shiping_amount_container">
                <div className="shiping_amount_content">
                  <div>Sub Total</div>
                  <div className="amount_text">৳945.00</div>
                </div>
                <div className="shiping_amount_content">
                  <div>Tax</div>
                  <div className="amount_text">৳0.00</div>
                </div>
                <div className="shiping_amount_content">
                  <div>Shiping</div>
                  <div className="amount_text">৳120.00</div>
                </div>
                <div className="shiping_amount_content">
                  <div>Discount on product</div>
                  <div className="amount_text">-৳45.00</div>
                </div>
                <div>
                  <input
                    className="coupon_input"
                    type="text"
                    placeholder="Coupon code"
                  />
                </div>
                <div>
                  <button className="coupon_btn">Apply code</button>
                </div>
                <hr />
                <div className="shiping_amount_content">
                  <div>Total</div>
                  <div className="amount_text">৳1,020.00</div>
                </div>
                <div class="container mt-4">
                  <div class="row">
                    <div class="col-md-3 p-0 text-center ">
                      <img
                        class="order-summery-footer-image"
                        src={delivery}
                        alt=""
                      />
                      <div class="deal-title">3 Days free delivery </div>
                    </div>

                    <div class="col-md-3 p-0 text-center">
                      <img
                        class="order-summery-footer-image"
                        src={money}
                        alt=""
                      />
                      <div class="deal-title">Money back guarantee</div>
                    </div>
                    <div class="col-md-3 p-0 text-center">
                      <img
                        class="order-summery-footer-image"
                        src={Genuine}
                        alt=""
                      />
                      <div class="deal-title">100% Genuine Product</div>
                    </div>
                    <div class="col-md-3 p-0 text-center">
                      <img
                        class="order-summery-footer-image"
                        src={Payment}
                        alt=""
                      />
                      <div class="deal-title">Authentic payment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingDetails;
