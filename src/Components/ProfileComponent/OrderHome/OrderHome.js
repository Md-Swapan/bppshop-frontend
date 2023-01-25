import React, { useEffect } from "react";
import "./OrderHome.css";
import ProfileHeader from "./../ProfileHeader/ProfileHeader";
import { useSelector } from 'react-redux';

const OrderHome = () => {
  const { userOrders } = useSelector((state) => state.userOrders);

  console.log(userOrders)

  return (
    <div>
      <h3>My Order</h3>
      <table class="table">
        <thead className="order_table_head">
          <tr>
            <td>
              <span class="">Order#</span>
            </td>
            <td>
              <span class="">Order Date</span>
            </td>
            <td>
              <span class=""> Status</span>
            </td>
            <td>
              <span class=""> Total</span>
            </td>
            <td>
              <span class=""> Action</span>
            </td>
          </tr>
        </thead>

        <tbody className="order_table_body">
          <tr>
            <td class="fw-bold">ID: 100423</td>
            <td>2023-01-23 17:31:01</td>
            <td>
              <p className="order_cancel_status">Canceled</p>
            </td>
            <td>৳110.00</td>
            <td>
              <button className="my_order_view_btn">
                <i class="bi bi-eye-fill"></i> View
              </button>
              <button className="my_order_cancel_btn">
                <i class="bi bi-trash3-fill"></i> Cancel
              </button>
            </td>
          </tr>
          <tr>
            <td class="fw-bold">ID: 100423</td>
            <td>2023-01-23 17:31:01</td>
            <td>
              <p className="order_cancel_status">Canceled</p>
            </td>
            <td>৳110.00</td>
            <td>
              <button className="my_order_view_btn">
                <i class="bi bi-eye-fill"></i> View
              </button>
              <button className="my_order_cancel_btn">
                <i class="bi bi-trash3-fill"></i> Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderHome;
