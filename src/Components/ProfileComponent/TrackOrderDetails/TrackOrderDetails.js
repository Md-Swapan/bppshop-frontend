import React from "react";
import { Link } from "react-router-dom";
import "./TrackOrderDetails.css";

const TrackOrderDetails = () => {
  return (
    <div>
      <Link to="/profile/track-order">
        <button class="my-4 shadow-sm border-0 py-2 px-4 rounded-2">
          <i class="bi bi-arrow-left-circle mr-2"></i> Back
        </button>
      </Link>
      <div className="my-3">
        <h4>Order No : 101010</h4>
      </div>
      <hr />
      <div className="table-responsive my-4">
        <table class="table">
          <tbody>
            <tr>
              <td>
                <img
                  className="track_order_img"
                  src="https://bppshop.com.bd/storage/product/thumbnail/2023-01-26-63d23da3e9990.png"
                  alt=""
                />
              </td>
              <td>
                <h6> Shorputi Fish (River)</h6>
                <div class="text-muted">
                  <span>kg </span>
                  <span className="track_amount_value">1</span>
                </div>
                <div class="fw-bold text-warning">
                  <span className="track_amount_value">৳ 490.00</span>
                </div>
              </td>
              <td>
                <div class="text-muted">
                  <span>Quantity: </span>
                </div>
                <div class="fs-5">
                  <span className="track_amount_value">1</span>
                </div>
              </td>
              <td>
                <div class="text-muted">
                  <span>Tax: </span>
                </div>
                <div class="fs-5">
                  <span className="track_amount_value">৳ 0.00</span>
                </div>
              </td>
              <td>
                <div class="text-muted">
                  <span>Subtotal</span>
                </div>
                <div class="fs-5">
                  <span className="track_amount_value">৳ 490.00</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="track_order_amount_container">
        <div className="row">
          <div className="col-6 col-md-3 text-center">
            <div class="px-2 py-1">
              <span class="text-muted">Subtotal : </span> <span className="track_amount_value">৳490.00</span>
            </div>
          </div>
          <div className="col-6 col-md-3 text-center">
            <div class="px-2 py-1">
              <span class="text-muted">Shipping : </span>
              <span className="track_amount_value">৳120.00</span>
            </div>
          </div>
          <div className="col-6 col-md-3 text-center">
            <div class="px-2 py-1">
              <span class="text-muted">Tax : </span> <span className="track_amount_value">৳0.00</span>
            </div>
          </div>
          <div className="col-6 col-md-3 text-center">
            <div class="px-2 py-1">
              <span class="text-muted">Discount : </span>
              <span className="track_amount_value">- ৳0.00</span>
            </div>
          </div>
        </div>
      </div>
      <div className="track_order_amount_container">
        <div className="row">
          <div className="col-6">
            <div class="px-2 py-1">
              <span class="text-muted">Coupon Discount :</span>
              <span className="track_amount_value"> - ৳0.00</span>
            </div>
          </div>
          <div className="col-6 text-end">
            <div class="px-2 py-1">
              <span class="text-muted">Total: </span>
              <span className="track_amount_value">৳610.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderDetails;
