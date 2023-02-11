import React from "react";
import "./OrderHome.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadUserOrderCancelRequest } from "../../../Redux/Actions/UserOrderAction";

const OrderHome = () => {
  const { userOrders } = useSelector((state) => state?.userOrders);
  const dispatch = useDispatch();

  return (
    <div className="order_section">
      <h4>My Order</h4>
      {userOrders?.length < 1 ? (
        <div className="blank_order">
          <h5>You Dont't Have Any Order...</h5>
        </div>
      ) : (
        <table className="table order_table">
          <thead className="order_table_head">
              <td>Order Id</td>
              <td>Order Date</td>
              <td>Status</td>
              <td>Total</td>
              <td>Action</td>
          </thead>
          <tbody className="order_table_body">
            {userOrders?.map((order) => (
              <tr key={order?.id}>
                <td data-label="Order Id" className="fw-bold">
                  ID: {order?.id}
                </td>
                <td data-label="Order Date">
                  {order?.created_at?.slice(0, 10)}
                </td>
                <td data-label="Status">
                  <span className="order_status">{order?.order_status}</span>
                </td>
                <td data-label="Total">৳{order?.order_amount}</td>
                <td data-label="Action">
                  <Link to={`/profile/orders-detail/${order?.id}`}>
                    <button className="my_order_view_btn">
                      <i className="bi bi-eye-fill"></i> View
                    </button>
                  </Link>
                  <button
                    onClick={() =>
                      dispatch(loadUserOrderCancelRequest(order?.id))
                    }
                    className="my_order_cancel_btn"
                  >
                    <i className="bi bi-trash3-fill"></i> Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHome;
