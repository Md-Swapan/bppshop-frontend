import React from "react";
import "./CheckoutComplete.css";

const CheckoutComple = () => {
  return (
    <div>
      <div class="row d-flex justify-content-center">
        <div class="col-md-10 col-lg-10">
          <div class="card">
            <div class=" p-5">
              <div class="row">
                <div class="col-md-6">
                  <h5>Your order has been placed successfully! !</h5>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-12">
                  <center>
                    <i class="fa fa-check-circle"></i>
                  </center>
                </div>
              </div>

              <span class="font-weight-bold d-block mt-4">Hello, </span>
              <span>
                You order has been confirmed and will be shipped according to
                the method you selected!
              </span>

              <div class="row mt-4">
                <div class="col-6">
                  <a class="btn btn-primary">
                    Go to shopping
                  </a>
                </div>

                <div class="col-6">
                  <a
                    class="btn btn-secondary pull-right"
                  >
                    Check orders
                  </a>
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
