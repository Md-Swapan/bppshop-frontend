import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { imgThumbnailBaseUrl } from "../../../BaseUrl/BaseUrl";
import { loadUserOrderDetails } from "../../../Redux/Actions/UserOrderAction";
import "./TrackOrderDetails.css";

const TrackOrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserOrderDetails(id));
  }, [dispatch, id]);
  const { userOrderDetails } = useSelector((state) => state?.userOrderDetails);

  const productDetails = userOrderDetails?.map(
    (orderDetail) => orderDetail?.product_details
  );
  let subTotal = 0;
  let shippingCost = 0;
  let taxAmount = 0;
  let discountAmount = 0;
  return (
    <div>
      <Link to={`/profile/track-order/${id}`}>
        <button class="my-4 shadow-sm border-0 py-2 px-4 rounded-2">
          <i class="bi bi-arrow-left-circle mr-2"></i> Back
        </button>
      </Link>
      <div className="my-3">
        <h4>Order No : {id}</h4>
      </div>
      <hr />
      <div className="table-responsive my-4">
        <table class="table">
          <tbody>
            {productDetails?.map((item) => {
              subTotal += item.min_qty * item.unit_price;
              shippingCost += item.shipping_cost;
              taxAmount += item.tax;
              discountAmount += item.discount;
              return (
                <tr>
                  <td>
                    <img
                      className="track_order_img"
                      // src="https://bppshop.com.bd/storage/product/thumbnail/2023-01-26-63d23da3e9990.png"
                      src={imgThumbnailBaseUrl + `/${item.thumbnail}`}
                      alt=""
                    />
                  </td>
                  <td>
                    <h6> {item?.name}</h6>
                    <div class="text-muted">
                      <span>{item?.unit} </span>
                      <span className="track_amount_value">
                        {item?.min_qty}
                      </span>
                    </div>
                    <div class="fw-bold text-warning">
                      <span className="track_amount_value">
                        ৳ {item?.unit_price}.00
                      </span>
                    </div>
                  </td>
                  <td>
                    <div class="text-muted">
                      <span>Quantity: </span>
                    </div>
                    <div class="fs-5">
                      <span className="track_amount_value">
                        {item?.min_qty}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div class="text-muted">
                      <span>Tax: </span>
                    </div>
                    <div class="fs-5">
                      <span className="track_amount_value">
                        ৳ {item?.tax}.00
                      </span>
                    </div>
                  </td>
                  <td>
                    <div class="text-muted">
                      <span>Subtotal</span>
                    </div>
                    <div class="fs-5">
                      <span className="track_amount_value">
                        ৳ {item?.min_qty * item?.unit_price}.00
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="track_order_amount_container">
        <div className="row">
          <div className="col-6 col-md-3 text-center">
            <div class="px-2 py-1">
              <span class="text-muted">Subtotal : </span>{" "}
              <span className="track_amount_value">৳ {subTotal}.00</span>
            </div>
          </div>
          <div className="col-6 col-md-3 text-center">
            <div class="px-2 py-1">
              <span class="text-muted">Shipping : </span>
              <span className="track_amount_value">৳{shippingCost}.00</span>
            </div>
          </div>
          <div className="col-6 col-md-3 text-center">
            <div class="px-2 py-1">
              <span class="text-muted">Tax : </span>{" "}
              <span className="track_amount_value">৳{taxAmount}.00</span>
            </div>
          </div>
          <div className="col-6 col-md-3 text-center">
            <div class="px-2 py-1">
              <span class="text-muted">Discount : </span>
              <span className="track_amount_value">- ৳{discountAmount}.00</span>
            </div>
          </div>
        </div>
      </div>
      <div className="track_order_amount_container">
        <div className="row">
          <div className="col-6">
            <div class="px-2 py-1">
              <span class="text-muted">Coupon Discount :</span>
              <span className="track_amount_value"> --</span>
            </div>
          </div>
          <div className="col-6 text-end">
            <div class="px-2 py-1">
              <span class="text-muted">Total: </span>
              <span className="track_amount_value">
                ৳{subTotal + shippingCost + taxAmount - discountAmount}.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderDetails;
