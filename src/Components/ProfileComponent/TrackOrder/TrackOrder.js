import React from "react";
import "./TrackOrder.css";

const TrackOrder = () => {
  return (
    <div>
      <h1 className="track_order_header">Track order</h1>
      <form>
        <div className="order_tracking_form">
          <div>
            <input
              class="order_tracking_input"
              type="text"
              name="order_id"
              placeholder="Order id"
              required
            />
          </div>
          <div>
            <input
              class="order_tracking_input"
              type="text"
              name="phone_number"
              placeholder="Your phone number"
              required
            />
          </div>
          <div className="track_order_submit">
            <button class="track_order_submit_btn" type="submit">
              Track order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TrackOrder;
