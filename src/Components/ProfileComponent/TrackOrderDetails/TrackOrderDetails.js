import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { imgThumbnailBaseUrl } from "../../../BaseUrl/BaseUrl";
import MetaData from "../../../Pages/Layout/MetaData";
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
  <>
   <MetaData title="Track-Order-Details - BPPShop" />
      <div>
      <Link to={`/profile/track-order/${id}`}>
        <button className="my-4 shadow-sm border-0 py-2 px-4 rounded-2">
          <i className="bi bi-arrow-left-circle mr-2"></i> Back
        </button>
      </Link>
      <div className="my-3">
        <h4>Order No : {id}</h4>
      </div>
      <hr />
      <div className="table-responsive my-4">
        <table className="table">
          <tbody>
            {productDetails?.map((item) => {
              subTotal += item.min_qty * item.unit_price;
              shippingCost += item.shipping_cost;
              taxAmount += item.tax;
              discountAmount += item.discount;
              return (
                <tr key={item.id}>
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
                    <div className="text-muted">
                      <span>{item?.unit} </span>
                      <span className="track_amount_value">
                        {item?.min_qty}
                      </span>
                    </div>
                    <div className="fw-bold text-warning">
                      <span className="track_amount_value">
                        ??? {item?.unit_price}.00
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="text-muted">
                      <span>Quantity: </span>
                    </div>
                    <div className="fs-5">
                      <span className="track_amount_value">
                        {item?.min_qty}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="text-muted">
                      <span>Tax: </span>
                    </div>
                    <div className="fs-5">
                      <span className="track_amount_value">
                        ??? {item?.tax}.00
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="text-muted">
                      <span>Subtotal</span>
                    </div>
                    <div className="fs-5">
                      <span className="track_amount_value">
                        ??? {item?.min_qty * item?.unit_price}.00
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
            <div className="px-2 py-1">
              <span className="text-muted">Subtotal : </span>{" "}
              <span className="track_amount_value">??? {subTotal}.00</span>
            </div>
          </div>
          <div className="col-6 col-md-3 text-center">
            <div className="px-2 py-1">
              <span className="text-muted">Shipping : </span>
              <span className="track_amount_value">???{shippingCost}.00</span>
            </div>
          </div>
          <div className="col-6 col-md-3 text-center">
            <div className="px-2 py-1">
              <span className="text-muted">Tax : </span>{" "}
              <span className="track_amount_value">???{taxAmount}.00</span>
            </div>
          </div>
          <div className="col-6 col-md-3 text-center">
            <div className="px-2 py-1">
              <span className="text-muted">Discount : </span>
              <span className="track_amount_value">- ???{discountAmount}.00</span>
            </div>
          </div>
        </div>
      </div>
      <div className="track_order_amount_container">
        <div className="row">
          <div className="col-6">
            <div className="px-2 py-1">
              <span className="text-muted">Coupon Discount :</span>
              <span className="track_amount_value"> --</span>
            </div>
          </div>
          <div className="col-6 text-end">
            <div className="px-2 py-1">
              <span className="text-muted">Total: </span>
              <span className="track_amount_value">
                ???{subTotal + shippingCost + taxAmount - discountAmount}.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default TrackOrderDetails;
