import React from "react";
import { Link } from "react-router-dom";
import "./CheckoutComplete.css";

const CheckoutComple = () => {
  return (
    <div>
      <div className="row d-flex justify-content-center">
        <div className="col-md-10 col-lg-10">
          <div className="checkout_comple_card">
            <div className=" p-5">
              <div className="row">
                <div className="col-md-6">
                  <h5>Your order has been placed successfully! !</h5>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-12">
                  <div className="my-5 text-center">
                  <i className="bi bi-check-circle-fill fw-bold fs-1 check_fill_icon"></i>
                  </div>
                </div>
              </div>

              <span className="font-weight-bold d-block mt-4">Hello, </span>
              <span>
                You order has been confirmed and will be shipped according to
                the method you selected!
              </span>

              <div className="d-flex justify-content-between align-items-center my-5">
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
