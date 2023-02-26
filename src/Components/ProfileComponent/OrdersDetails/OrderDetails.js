import React, { useEffect } from "react";
import "./OrderDetails.css";
import productImg from "../../../Assets/Images/categoryImg/download (1).png";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserOrderDetails } from "../../../Redux/Actions/UserOrderAction";
import { imgThumbnailBaseUrl } from "../../../BaseUrl/BaseUrl";
import MetaData from "../../../Pages/Layout/MetaData";

const OrderDetails = () => {
  const { id } = useParams();
  const { userOrders } = useSelector((state) => state?.userOrders);
  const userOrder = userOrders?.find((order) => order?.id === parseInt(id));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserOrderDetails(id));
  }, [dispatch, id]);
  const { userOrderDetails } = useSelector((state) => state?.userOrderDetails);
  // console.log(userOrderDetails);

  const productDetails = userOrderDetails?.map(
    (orderDetail) => orderDetail?.product_details
  );
let totalItem=productDetails?.length;
let subTotal = 0;
let taxFee=0;
let shippingFee=0;
let discountAmount=0;
  return (
   <>
   <MetaData title="Orders-Details - BPPShop" />
     <div>
      <Link to="/profile/orders">
        <button className="my-4 shadow-sm border-0 py-2 px-4 rounded-2">
          <i className="bi bi-arrow-left-circle mr-2"></i> Back
        </button>
      </Link>
      <div className="order_detail_card">
        <div className="payment mb-3  table-responsive">
          <table className="table table-borderless">
            <thead>
              <tr className="order_table_tr order_table_head">
                <td className="order_table_td">
                  <div className="order_table_info_div">
                    <div className="order_table_info_div_1 py-2">
                      <span className="d-block spandHeadO">Order no: </span>
                    </div>
                    <div className="order_table_info_div_2">
                      <span className="spanTr"> {userOrder?.id} </span>
                    </div>
                  </div>
                </td>
                <td className="order_table_td">
                  <div className="order_table_info_div">
                    <div className="order_table_info_div_1 py-2">
                      <span className="d-block spandHeadO">Order date: </span>
                    </div>
                    <div className="order_table_info_div_2">
                      <span className="spanTr">
                        {" "}
                        {userOrder?.created_at?.slice(0, 10)}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="order_table_td">
                  <div className="order_table_info_div">
                    <div className="order_table_info_div_1 py-2">
                      <span className="d-block spandHeadO">Delivery address: </span>
                    </div>

                    <div className="order_table_info_div_2">
                      <span className="spanTr">
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

          <div className="row">
            <div></div>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-2"></div>
          <div className="col-md-2"></div>
          <table className="table table-borderless">
            {productDetails?.map((product) => {
              subTotal += product.min_qty*product.unit_price;
              taxFee +=product.tax;
              shippingFee +=product.shipping_cost;
              discountAmount +=product.discount;
              return(
                <tbody key={product.id}>
                <tr className="order_detail_list">
                  <td className="col-2 for-tab-img">
                    <img src={imgThumbnailBaseUrl + `/${product.thumbnail}`} alt="" />
                  </td>
                  <td className="col-10 ">
                    <span className="for-glaxy-name">{product.name}</span>
                    <br />
                  </td>

                  <td width="100%">
                    <div className="text-right">
                      <span className="font-weight-bold amount">
                        ৳{product.unit_price}{" "}
                      </span>
                      <br />
                      <span>Qty: {product.min_qty}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
              )
            })}
          </table>
        </div>
      </div>
      <div className="row d-flex justify-content-end">
        <div className="col-md-8 col-lg-5">
          <table className="table table-borderless">
            <tbody className="totals">
              <tr>
                <td>
                  <div className="text-left">
                    <span className="product-qty ">Item </span>
                  </div>
                </td>
                <td>
                  <div className="text-right">
                    <span>{totalItem}</span>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="text-left">
                    <span className="product-qty ">Subtotal</span>
                  </div>
                </td>
                <td>
                  <div className="text-right">
                    <span>৳{subTotal}.00</span>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="text-left">
                    <span className="product-qty ">Text fee</span>
                  </div>
                </td>
                <td>
                  <div className="text-right">
                    <span>৳{taxFee}.00</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="text-left">
                    <span className="product-qty ">Shipping Fee</span>
                  </div>
                </td>
                <td>
                  <div className="text-right">
                    <span>৳{shippingFee}.00</span>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="text-left">
                    <span className="product-qty ">Discount On product</span>
                  </div>
                </td>
                <td>
                  <div className="text-right">
                    <span>- ৳{discountAmount}.00</span>
                  </div>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="text-left">
                    <span className="product-qty ">Coupon Discount</span>
                  </div>
                </td>
                <td>
                  <div className="text-right">
                    <span>--</span>
                  </div>
                </td>
              </tr>

              <tr className="border-top border-bottom">
                <td>
                  <div className="text-left">
                    <span className="font-weight-bold">Total</span>
                  </div>
                </td>
                <td>
                  <div className="text-right">
                    <span className="font-weight-bold amount ">৳{(subTotal+shippingFee+taxFee)-discountAmount}.00</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
          <div className="track_order_btn">
            <Link to={`/profile/track-order/${id}`}><button>Track Order</button></Link>
          </div>
      </div>
    </div>
   </>
  );
};

export default OrderDetails;
