import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { imgThumbnailBaseUrl } from "../../../BaseUrl/BaseUrl";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../../Redux/Actions/CartAction";
import "./CheckoutShopCart.css";

const CheckoutShopCart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => {
    return state.cart.cartItems;
  });

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  return (
    <div>
      <h5 className="mb-2">SHOPPING CART</h5>
      <div className="shop_cart_container">
        <i>Shop name : BPP Shop</i>

        <div className="table-responsive">
          <table className="table table-borderless table-thead-bordered table-nowrap table-align-middle card-table my-3">
            <thead className="">
              <tr className="text-center">
                <th className="font-weight-bold">SL#</th>
                <th className="font-weight-bold">Product Images</th>
                <th className="font-weight-bold">Product Name</th>
                <th className="font-weight-bold">Unit</th>
                <th className="font-weight-bold">Unit price</th>
                <th className="font-weight-bold">Qty</th>
                <th className="font-weight-bold">Price</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item, index) => {
                return (
                  <tr key={item.product.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        style={{ width: "60px" }}
                        src={
                          imgThumbnailBaseUrl + `/${item?.product?.thumbnail}`
                        }
                        alt=""
                      />
                    </td>
                    <td>
                      {" "}
                      <small>
                        {item?.product?.name?.toString().substring(0, 15)}...
                      </small>
                    </td>
                    <td>
                      {" "}
                      <small>
                        {item?.product?.choice_options?.map(
                          (option) => option.title
                        )}
                      </small>
                    </td>
                    <td>
                      {" "}
                      {item?.product?.discount > 0 ? (
                        <del>
                          {" "}
                          <span style={{ fontSize: "11px" }}>
                            ৳ {item?.product?.unit_price}
                          </span>
                        </del>
                      ) : (
                        <span>৳ {item?.product?.unit_price}</span>
                      )}
                    </td>
                    <td>
                      {" "}
                      <div className="quantity-set">
                        <span
                          onClick={() =>
                            decreaseQuantity(item?.product, item?.quantity)
                          }
                          className="minusBtn"
                        >
                          -
                        </span>
                        <span className="qtyCount-number">
                          {item?.quantity}
                        </span>
                        <span
                          onClick={() =>
                            increaseQuantity(
                              item?.product,
                              item?.quantity,
                              item?.product?.current_stock
                            )
                          }
                          className="plusBtn"
                        >
                          +
                        </span>
                      </div>
                    </td>
                    <td>
                      {item?.product?.discount > 0 ? (
                        <span className="mx-2">
                          Total :৳
                          {item?.quantity *
                            (item?.product?.unit_price -
                              item?.product?.discount)}
                        </span>
                      ) : (
                        <span className="mx-2">
                          Total :৳ {item?.quantity * item?.product?.unit_price}
                        </span>
                      )}
                    </td>
                    <td>
                      <span
                        onClick={() =>
                          dispatch(removeItemsFromCart(item?.product?.id))
                        }
                        className="cartItemDeleteBtn"
                      >
                        <i className="bi bi-trash3"></i>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="my-3">
        <b>Shipping method</b> : Cash on Delivery
      </div>
      <div className="my-2">
        <div className="row">
          <div>
            <label className="ms-1">Order note (Optional)</label>
            <textarea
              className="shipping_delivary_form_input"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="col-md-6">
            <label className="ms-1">Preferred delivery date</label>
            <input
              className="shipping_delivary_form_input"
              type="date"
              name=""
              id=""
            />
          </div>
          <div className="col-md-6">
            <label className="ms-1">Preferred delivery time</label>
            <input
              className="shipping_delivary_form_input"
              type="time"
              name=""
              id=""
            />
          </div>
        </div>
        <div className="shop_payment_btn_content">
          <div className="shop_payment_btn">
            <Link to="/">
              <div className="shop_cart_btn">
                <i className="bi bi-chevron-left"></i> Continue shopping
              </div>
            </Link>
            <Link to="/shipping-details">
              <div className="proceed_payment_btn">
                Checkout <i className="bi bi-chevron-right"></i>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutShopCart;
