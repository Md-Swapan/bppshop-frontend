import React, { useEffect, useState } from "react";
import "./OrderHome.css";
import ProfileHeader from "./../ProfileHeader/ProfileHeader";
import axios from "axios";
import { baseUrl } from "../../../BaseUrl/BaseUrl";

const OrderHome = () => {
  const token = localStorage.getItem("token");
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    axios
      .get(baseUrl + "/customer/order/list", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrderList(res?.data?.data);
      });
  }, [token]);

  return (
    <div>
      <ProfileHeader>My Order</ProfileHeader>
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
          {orderList?.map((list) => (
            <tr key={list?.id}>
              <td class="fw-bold">ID: {list?.id}</td>
              <td>{list?.created_at?.slice(0, 10)}</td>
              <td>
                <span className="order_status">{list.order_status}</span>
              </td>
              <td>৳{list.order_amount}</td>
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
