import React from "react";
import { Link } from "react-router-dom";
import "./TrackOrder.css";

const TrackOrder = () => {
  return (
    <div>
      <h4 className="mb-4">Tracked Order Info</h4>
      <div className="order_tracking_head">
        <h5>Order ID : 101010</h5>
      </div>
      <div className="order_status_info">
        <div class="row p-3">
          <div class="col-sm-4">
            <div class="pt-2 pb-2 rounded-lg">
              <span class="font-weight-medium text-dark mr-2">
                Order Status:
              </span>
              <br />
              <span class="text-uppercase fw-bold text-info">canceled</span>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="pt-2 pb-2 rounded-lg">
              <span class="font-weight-medium text-dark mr-2">
                Payment Status:
              </span>
              <br />
              <span class="text-uppercase fw-bold text-info">unpaid</span>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="pt-2 pb-2 rounded-lg">
              <span class="font-weight-medium text-dark mr-2">
                Estimated Delivary Date:
              </span>
              <br />
              <span class="text-uppercase fw-bold text-info">2023-01-28</span>
            </div>
          </div>
        </div>
      </div>
      <div class="order_step_container">
        <div class="row">
          <div className="col-6 col-md-3">
            <div className="m-2">
              <div class="order_step_icon">
                <i class="bi bi-check-circle-fill order_step_icon_first"></i>
              </div>
              <div class="text-center">
                <div class="font-size-xs">
                  <small>First step</small>
                </div>
                <h6>Order placed</h6>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="m-2">
              <div class="order_step_icon">
                <i class="bi bi-circle"></i>
              </div>
              <div class="text-center">
                <div class="font-size-xs">
                  <small>Second step</small>
                </div>
                <h6>Packaging order</h6>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="m-2">
              <div class="order_step_icon">
                <i class="bi bi-circle"></i>
              </div>
              <div class="text-center">
                <div class="font-size-xs">
                  <small>Third step</small>
                </div>
                <h6>Preparing Shipment</h6>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="m-2">
              <div class="order_step_icon">
                <i class="bi bi-circle"></i>
              </div>
              <div class="text-center">
                <div class="font-size-xs">
                  <small>Fourth step</small>
                </div>
                <h6>Order Shipped</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="view_track_order_details">
        <Link to="/profile/track-order-details"><button>Track Order Details</button></Link>
      </div>
    </div>
  );
};

export default TrackOrder;
