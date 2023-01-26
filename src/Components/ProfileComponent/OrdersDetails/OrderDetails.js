import React, { useEffect, useState } from "react";
import "./OrderDetails.css";
import productImg from "../../../Assets/Images/categoryImg/download (1).png";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserOrderDetails } from "../../../Redux/Actions/UserOrderAction";

const OrderDetails = () => {
  const { id } = useParams();
  const { userOrders } = useSelector((state) => state?.userOrders);
  const userOrder = userOrders?.find((order) => order?.id === parseInt(id));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserOrderDetails(id));
  }, [dispatch, id]);
  const { userOrderDetails } = useSelector((state) => state?.userOrderDetails);

  const productDetails = userOrderDetails?.map(
    (orderDetail) => orderDetail?.product_details
  );
  // console.log(productDetails);

  
  return (
    <div>
      <Link to="/profile/orders">
        <button class="my-4 shadow-sm border-0 py-2 px-4 rounded-2">
          <i class="bi bi-arrow-left-circle mr-2"></i> Back
        </button>
      </Link>
      <div class="order_detail_card">
        <div class="payment mb-3  table-responsive">
          <table class="table table-borderless">
            <thead>
              <tr class="order_table_tr order_table_head">
                <td class="order_table_td">
                  <div class="order_table_info_div">
                    <div class="order_table_info_div_1 py-2">
                      <span class="d-block spandHeadO">Order no: </span>
                    </div>
                    <div class="order_table_info_div_2">
                      <span class="spanTr"> {userOrder?.id} </span>
                    </div>
                  </div>
                </td>
                <td class="order_table_td">
                  <div class="order_table_info_div">
                    <div class="order_table_info_div_1 py-2">
                      <span class="d-block spandHeadO">Order date: </span>
                    </div>
                    <div class="order_table_info_div_2">
                      <span class="spanTr">
                        {" "}
                        {userOrder?.created_at?.slice(0, 10)}
                      </span>
                    </div>
                  </div>
                </td>
                <td class="order_table_td">
                  <div class="order_table_info_div">
                    <div class="order_table_info_div_1 py-2">
                      <span class="d-block spandHeadO">Delivery address: </span>
                    </div>

                    <div class="order_table_info_div_2">
                      <span class="spanTr">
                        {userOrder?.shipping_address_data?.contact_person_name}{" "}
                        ({userOrder?.shipping_address_data?.phone}),{" "}
                        {userOrder?.shipping_address_data?.address},
                        <br />
                        {userOrder?.shipping_address_data?.city} ,{" "}
                        {userOrder?.shipping_address_data?.thana},
                        {userOrder?.shipping_address_data?.zip}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            </thead>
          </table>

          <div class="row">
            <div></div>
          </div>
          <div class="col-md-4"></div>
          <div class="col-md-2"></div>
          <div class="col-md-2"></div>
          <table class="table table-borderless">
            {productDetails?.map((product) => (
              <tbody>
                <tr className="order_detail_list">
                  <td class="col-2 for-tab-img">
                    <img src={productImg} alt="" />
                  </td>
                  <td class="col-10 ">
                    <span className="for-glaxy-name">{product.name}</span>
                    <br />
                  </td>

                  <td width="100%">
                    <div class="text-right">
                      <span class="font-weight-bold amount">৳{product.unit_price} </span>
                      <br />
                      <span>Qty: {product.min_qty}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      <div class="row d-flex justify-content-end">
        <div class="col-md-8 col-lg-5">
          <table class="table table-borderless">
            <tbody class="totals">
              <tr>
                <td>
                  <div class="text-left">
                    <span class="product-qty ">Item</span>
                  </div>
                </td>
                <td>
                  <div class="text-right">
                    <span>1</span>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <div class="text-left">
                    <span class="product-qty ">Subtotal</span>
                  </div>
                </td>
                <td>
                  <div class="text-right">
                    <span>৳50.00</span>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <div class="text-left">
                    <span class="product-qty ">Text fee</span>
                  </div>
                </td>
                <td>
                  <div class="text-right">
                    <span>৳0.00</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="text-left">
                    <span class="product-qty ">Shipping Fee</span>
                  </div>
                </td>
                <td>
                  <div class="text-right">
                    <span>৳60.00</span>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <div class="text-left">
                    <span class="product-qty ">Discount On product</span>
                  </div>
                </td>
                <td>
                  <div class="text-right">
                    <span>- ৳0.00</span>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <div class="text-left">
                    <span class="product-qty ">Coupon Discount</span>
                  </div>
                </td>
                <td>
                  <div class="text-right">
                    <span>- ৳0.00</span>
                  </div>
                </td>
              </tr>

              <tr class="border-top border-bottom">
                <td>
                  <div class="text-left">
                    <span class="font-weight-bold">Total</span>
                  </div>
                </td>
                <td>
                  <div class="text-right">
                    <span class="font-weight-bold amount ">৳110.00</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div className="col-md-6">
          <div className="view_invoice_btn"> View Invoice</div>
        </div>
        <div className="col-md-6">
          {" "}
          <div className="track_order_btn">Track Order</div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
