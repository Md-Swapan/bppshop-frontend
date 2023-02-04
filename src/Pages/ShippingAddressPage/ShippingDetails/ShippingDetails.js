import React from "react";
import "./ShippingDetails.css";
import delivery from "../../../Assets/Images/shiping-icons/delivery.png";
import money from "../../../Assets/Images/shiping-icons/money.png";
import Genuine from "../../../Assets/Images/shiping-icons/Genuine.png";
import Payment from "../../../Assets/Images/shiping-icons/Payment.png";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const ShippingDetails = () => {
  const cartItems = useSelector((state) => {
    return state.cart.cartItems;
  });
   const {deliveryCharge} = useSelector((state) => state?.deliveryCharge);
   const deliveryCost = parseInt(deliveryCharge.delivery_charge);

   const totalPrice = parseInt(`${cartItems?.reduce(
    (acc, item) =>
      acc +
      item?.quantity * item?.product?.unit_price,
    0
  )}` )

  const grandTotalPrice = totalPrice + deliveryCost

  return (
    <>
      <div className="shiping-view-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <Outlet></Outlet>
            </div>
            <div className="col-lg-4">
              <div className="shiping_amount_container">
                <div className="shiping_amount_content">
                  <div>Sub Total</div>
                  <div className="amount_text">৳ 
                  {`${cartItems?.reduce(
                    (acc, item) =>
                      acc +
                      item?.quantity * item?.product?.unit_price ,
                    0
                  )}`}.00
                  </div>
                </div>
                <div className="shiping_amount_content">
                  <div>Tax</div>
                  <div className="amount_text">৳ 0.00</div>
                </div>
                <div className="shiping_amount_content">
                  <div>Delivery</div>
                  <div className="amount_text">৳ {deliveryCost?deliveryCost:0}.00</div>
                </div>
                <div className="shiping_amount_content">
                  <div>Discount on product</div>
                  <div className="amount_text">-৳ 0.00</div>
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
                  <div className="amount_text">৳ {grandTotalPrice}.00</div>
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
