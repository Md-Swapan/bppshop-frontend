import React, { startTransition, useState } from "react";
import "./ProductCard.css";
import addToCartImg from "../../../Assets/Images/icons/addToCart.png";
import defaultProImg from "../../../Assets/Images/defaultImg.jpg";
import Modal from "react-modal";
import QuickViewModal from "../../QuickViewModal/QuickViewModal";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addItemsToCart,
  addItemsToCartAfterLogin,
} from "./../../../Redux/Actions/CartAction";
import { imgThumbnailBaseUrl } from "./../../../BaseUrl/BaseUrl";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    paddingBottom: "20px",
  },
};

const ProductCard = ({ product }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const token = localStorage.getItem("token");

  const {
    id,
    name,
    unit_price,
    choice_options,
    discount,
    current_stock,
    thumbnail,
  } = product;

  const [pid, setPid] = useState(null);
  const productDetailsView = (pid) => {
    setPid(pid);
  };

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItem = cartItems.map(i => i.product.id)
  const addedId = cartItem.find(i => i  ===  id)  

  const addToCartHandler = (product, quantity) => {
    dispatch(addItemsToCart(product, quantity));

    let color = product.colors?.map((color) => color?.code);
    let choice_19 = product.choice_options?.map((list) => list?.options);
    let option = choice_19?.map((option) => option[0]);

    const addItemsToCartDataWithColor = {
      id: `${product.id}`,
      color: `${color[0]}`,
      choice_19: `${option[0]}`,
      quantity: `${quantity}`,
    };
    const addItemsToCartDataWithoutColor = {
      id: `${product.id}`,
      choice_19: `${option[0]}`,
      quantity: `${quantity}`,
    };

    if (token) {
      product.colors.length
        ? dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithColor))
        : dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithoutColor));
    }
  };

  return (
    <>
      <div className="product_card_content">
        <div className="product-card">
          {current_stock > 0 ? (
            <div>
              <div className=" product-card-body">
                {thumbnail ? (
                  <img
                    src={imgThumbnailBaseUrl + `/${thumbnail}`}
                    className="card-img-top"
                    alt=""
                  />
                ) : (
                  <img src={defaultProImg} alt="" />
                )}
                <div className="product-card-body-content">
                  <small>{name.toString().substring(0, 15)}...</small>
                  <br />
                  <div className="product-card-body-content-unit-price">
                    <span>
                      {choice_options?.map((list) => (
                        <>{list?.title} : </>
                      ))}
                    </span>
                    <br />
                    {discount ? (
                      <span>
                        <strong> ৳ {unit_price - discount} </strong>
                        <del>
                          <strong className="text-danger">
                            {" "}
                            ৳ {unit_price}
                          </strong>
                        </del>
                      </span>
                    ) : (
                      <strong> ৳ {unit_price}</strong>
                    )}
                  </div>
                </div>
                <div className="quickView_AddToCart_overlay">
                  <div
                    onClick={() => addToCartHandler(product, quantity)}
                    className="overlayAddToCartBtn"
                  >
                    <img src={addToCartImg} alt="" />
                  </div>
                  <span onClick={() => productDetailsView(id)}>
                    <button onClick={openModal}>
                      <i className="bi bi-eye-fill"></i> <span>Quick View</span>
                    </button>
                  </span>
                </div>
              </div>
              <div className="card-footer product-card-footer">
                {addedId ? (
                  <button
                    className="btn_before_add_cart"
                    onClick={() => addToCartHandler(product, quantity)}
                  >
                    <i className="bi bi-cart-plus"></i> Add To Cart
                  </button>
                ) : (
                  <button disabled className="btn_after_added_cart">
                    <i className="bi bi-cart-plus"></i> Added to Cart
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className=" product-card-body">
                <img
                  src={imgThumbnailBaseUrl + `/${thumbnail}`}
                  className="card-img-top"
                  alt=""
                />
                <div className="product-card-body-content">
                  <small>{name.toString().substring(0, 15)}...</small>
                  <br />
                  <div className="product-card-body-content-unit-price">
                    <span>
                      {choice_options?.map((list) => (
                        <>{list?.title} : </>
                      ))}
                    </span>
                    <br />
                    <strong> ৳ {unit_price}</strong>
                  </div>
                </div>
              </div>
              <div className="card-footer product-card-footer">
                <button className="btn_before_add_cart">
                  <i className="bi bi-cart-plus"></i> Stock Out
                </button>
              </div>
              <div className="product_stock_out_overlay d-flex justify-content-center align-items-center">
                <h3 className="text-center">
                  Stock <br /> Out
                </h3>
              </div>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span onClick={closeModal} className="modalCloseBtn">
          <i className="bi bi-x-lg"></i>
        </span>
        <br />
        <QuickViewModal pid={pid} />
        <br />
      </Modal>
    </>
  );
};

export default ProductCard;
