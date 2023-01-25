import React from "react";
import "./OrderDetails.css";

const OrderDetails = () => {
  return (
    <div>
      <table class="table">
        <thead className="order_table_head">
          <tr>
            <td>
              <tr>
                <span>Order no: </span>
              </tr>
              <tr>
                <span class="spanTr"> 100423 </span>
              </tr>
            </td>
            <td>
              <tr>
                <span>Order date: </span>
              </tr>
              <tr>
                <span> 23 Jan, 2023 </span>
              </tr>
            </td>
            <td>
              <tr>
                <small>Shipping address: </small>
              </tr>

              <tr>
                <span>
                  Md-Shuvo-miah (01676667145), Excel It Ai,
                  <br />
                  Dhaka , Moghbazar
                </span>
              </tr>
            </td>
            <td>
              <tr>
                <small>Billing address: </small>
              </tr>

              <tr>
                <span class="spanTr">
                  Md-Shuvo-miah (01676667145), Excel It Ai, <br />
                  Dhaka , Mogbazar , Moghbazar
                </span>
              </tr>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default OrderDetails;
