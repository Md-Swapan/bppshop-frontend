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
          {userOrders?.map((order) => (
            <tr key={order?.id}>
              <td class="fw-bold">ID: {order?.id}</td>
              <td>{order?.created_at?.slice(0, 10)}</td>
              <td>
                <span className="order_status">{order.order_status}</span>
              </td>
              <td>৳{order.order_amount}</td>
              <td>
                <button className="my_order_view_btn">
                  <i class="bi bi-eye-fill"></i> View
                </button>
                <button className="my_order_cancel_btn">
                  <i class="bi bi-trash3-fill"></i> Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHome;
