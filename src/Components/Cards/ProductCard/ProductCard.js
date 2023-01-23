import React, { useState } from "react";
import "./ProductCard.css";
import addToCartImg from "../../../Assets/Images/icons/addToCart.png";
import Modal from "react-modal";
import QuickViewModal from "../../QuickViewModal/QuickViewModal";
import defaultProImg from "../../../Assets/Images/defaultImg.jpg";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "./../../../Redux/Actions/CartAction";
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
  const { id, name, images, unit_price, choice_options } = product;

  const [pid, setPid] = useState(null);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const productDetailsView = (pid) => {
    setPid(pid);
  };

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  // const addToCartHandler = () => {
  //   dispatch(addItemsToCart(product, quantity));
  //   alert.success("Item Added To Cart");
  // };


  return (
    <>
      <div className="product_card_content">
        <div className=" product-card">
          <div className=" product-card-body">
            <img
              src={!images[0] ? images[0] : defaultProImg}
              className="card-img-top"
              alt=""
            />
            <div className="product-card-body-content">
              <small>{name.toString().substring(0, 25)}...</small>
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
            <button onClick={() => dispatch(addItemsToCart(product, quantity))} type="">
            {/* <button onClick={addToCartHandler} type=""> */}
              <i className="bi bi-cart-plus"></i> Add To Cart
            </button>
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
