import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import addToCartImg from "../../../Assets/Images/icons/addToCart.png";
import Modal from "react-modal";
import QuickViewModal from "../../QuickViewModal/QuickViewModal";
import defaultProImg from "../../../Assets/Images/defaultImg.jpg";
import { useDispatch } from "react-redux";
import {
  addItemsToCart,
  addItemsToCartAfterLogin,
} from "./../../../Redux/Actions/CartAction";
import { imgBaseUrl } from "../../../BaseUrl/BaseUrl";
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
  
  const { id, name, images, unit_price, choice_options, thumbnail } = product;

  const [pid, setPid] = useState(null);
  const productDetailsView = (pid) => {
    setPid(pid);
  };

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const addToCartAfterLoginHandler = (product, quantity) => {

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

    product.colors.length ? dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithColor)) : dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithoutColor))
   
  };

  

  return (
    <>
      <div className="product_card_content">
        <div className=" product-card">
          <div className=" product-card-body">
            <img
              src={imgThumbnailBaseUrl + `/${thumbnail}`}
              className="card-img-top"
              alt=""
            />
            <div className="product-card-body-content">
              <small>{name.toString().substring(0, 20)}...</small>
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
            <div className="quickView_AddToCart_overlay">
              <div className="overlayAddToCartBtn">
                {/* <h5>Add <br/> To <br/> Cart</h5>
                <i class="bi bi-cart-plus-fill"></i> */}
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
            {token ? (
              <button
                onClick={() => addToCartAfterLoginHandler(product, quantity)}
                type=""
              >
                <i className="bi bi-cart-plus"></i> Add To Cart
              </button>
            ) : (
              <button
                onClick={() => dispatch(addItemsToCart(product, quantity))}
                type=""
              >
                <i className="bi bi-cart-plus"></i> Add To Carts
              </button>
            )}

          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span onClick={closeModal} className="modalCloseBtn">
          <i class="bi bi-x-lg"></i>
        </span>
        <br />
        <QuickViewModal pid={pid} />
        <br />
      </Modal>
    </>
  );
};

export default ProductCard;
