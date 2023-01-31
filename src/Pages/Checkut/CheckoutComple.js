import React from "react";
import { Link } from "react-router-dom";
import "./CheckoutComplete.css";

const CheckoutComple = () => {
  return (
    <div>
      <div class="row d-flex justify-content-center">
        <div class="col-md-10 col-lg-10">
          <div class="checkout_comple_card">
            <div class=" p-5">
              <div class="row">
                <div class="col-md-6">
                  <h5>Your order has been placed successfully! !</h5>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-12">
                  <div className="my-5 text-center">
                  <i class="bi bi-check-circle-fill fw-bold fs-1 check_fill_icon"></i>
                  </div>
                </div>
              </div>

              <span class="font-weight-bold d-block mt-4">Hello, </span>
              <span>
                You order has been confirmed and will be shipped according to
                the method you selected!
              </span>

              <div class="d-flex justify-content-between align-items-center my-5">
                <div className="go_to_shopping">
                  <Link to="/">Go to shopping</Link>
                </div>

                <div className="got_to_check_order">
                  <Link to="/profile/orders">Check orders</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComple;
