import React, { useState } from "react";
import "./ProductCard.css";
import addToCartImg from "../../../Assets/Images/icons/addToCart.png";
import addedToCartImg from "../../../Assets/Images/icons/addedSucessfuly.png";
import defaultProImg from "../../../Assets/Images/defaultImg.jpg";
import Modal from "react-modal";
import QuickViewModal from "../../QuickViewModal/QuickViewModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  addItemsToCartAfterLogin,
} from "./../../../Redux/Actions/CartAction";
import { imgThumbnailBaseUrl } from "./../../../BaseUrl/BaseUrl";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    width: "1050px",
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
  const { slug, subSlug, subSubSlug } = useParams();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const token = localStorage.getItem("token");
  const { id, name, unit_price, colors, discount, current_stock, thumbnail } =
    product;
  // console.log(product);


  const newChoiceOption = product?.choice_options?.find(
    (option) => option
  );

  // const newStaticProductUnit = newChoiceOption?.concat(productUnitStatic);
  // console.log(product?.choice_options)
  // console.log(newChoiceOption.title)

  const [pid, setPid] = useState(null);
  const productDetailsView = (pid) => {
    setPid(pid);
  };

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemsId = cartItems.map((i) => i.product.id);
  const addedItemId = cartItemsId.find((i) => i === id);

  const addToCartHandler = (product, quantity) => {
    dispatch(addItemsToCart(product, quantity));

    // toaster
    toast.success(`Product added to cart successfully`, {
      duration: 5000,

      style: {
        width: "100%",
        height: "80px",
        padding: "0px 20px",
        background: "#86bc19",
        color: "#fff",
      },
    });

    let color = colors?.map((color) => color?.code);
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

    // Animate the product image to the cart container
    const productImage = document.querySelector(".product-card-body img");

    const productImageClone = productImage.cloneNode(true);
    document.body.appendChild(productImageClone);

    const cart = document.querySelector(".cart");
    const cartRect = cart.getBoundingClientRect();
    const productImageRect = productImage.getBoundingClientRect();

    const animation = productImageClone.animate(
      [
        {
          transform: `translate(${productImageRect.left}px, ${productImageRect.top}px)`,
        },
        { transform: `translate(${cartRect.top}px, ${cartRect.top}px)` },
      ],
      {
        duration: 100,
        easing: "ease-in-out",
      }
    );

    animation.onfinish = () => {
      productImageClone.remove();
    };

    // Show the cart container
  };

  // document.querySelector(".product-card").addEventListener("onMouseOver", () => {
  //   document.querySelector(".quickView_AddToCart_overlay").style.display = "block"
  // })

  // const productUnitStatic = [
  //   "kg",
  //   "pc",
  //   "mg",
  //   "gm",
  //   "gms",
  //   "ltrs",
  //   "ml",
  //   "pcs",
  //   "bundle",
  //   "pair",
  //   "box",
  //   "carton",
  //   "dozen",
  //   "set",
  // ];

  // const optionTitle = product.choice_options?.map((list) => list?.title);
  // const title = optionTitle.map((i) => i);
  // const unit = OptionUnit.find((i) => i === title[0]);

  // const options = product.choice_options?.map((list) => list?.options);
  // const op = options.map((i) => i[0]);

  // const optns = product.choice_options?.find((i) => i?.op[0]);
  // const unitOptions = OprionUnit.find(i => i === op[0])

  // console.log(optns)

  return (
    <>
      <div className="product_card_content">
        <div className="product-card">
          {current_stock > 0 ? (
            <>
              {/* <div className="Product_border_container"> */}
              <div className=" product-card-body">
                <div className="productImg_container">
                  {thumbnail ? (
                    <img
                      src={imgThumbnailBaseUrl + `/${thumbnail}`}
                      className="card-img-top"
                      alt=""
                    />
                  ) : (
                    <img src={defaultProImg} alt="" />
                  )}
                </div>
                <div className="product-card-body-content">
                  <small>{name.toString().substring(0, 15)}...</small>
                  <br />
                  <div className="product-card-body-content-unit-price">
                    <span>
                      {/* {choice_options?.map((list) => (
                        <>
                          {list?.title} : {list?.options[0]}
                        </>
                      ))} */}
                      {/* {choice_options?.map((list) => productUnitStatic?.find(item=>item===list?.title))}:{choice_options[0]?.options[0]} */}
                      {/* {newChoiseOption }:{choice_options[0]?.options[0]} */}
                    </span>
                    {newChoiceOption && (
                      <span>
                        {newChoiceOption?.title} : {newChoiceOption?.options[0]}
                      </span>
                    )}
                    <br />
                    {discount ? (
                      <span>
                        <strong> ??? {unit_price - discount} </strong>
                        <del>
                          <strong className="text-danger ms-3">
                            {" "}
                            ??? {unit_price}
                          </strong>
                        </del>
                      </span>
                    ) : (
                      <strong> ??? {unit_price}</strong>
                    )}
                  </div>
                </div>
                <div
                  className={
                    addedItemId
                      ? `quickView_AddToCart_overlay_active`
                      : `quickView_AddToCart_overlay`
                  }
                >
                  <Link
                    to={`/${slug}/${subSlug}/${subSubSlug}/${id}`}
                    addedItemId={addedItemId}
                  >
                    <div className="overlayViewCartBtn">
                      <span>
                        <i className="bi bi bi-eye"></i> view
                      </span>
                    </div>
                  </Link>

                  {addedItemId ? (
                    <div className="overlayAddToCartBtn">
                      <img src={addedToCartImg} alt="" />
                    </div>
                  ) : (
                    <div
                      onClick={() => addToCartHandler(product, quantity)}
                      className="overlayAddToCartBtn"
                    >
                      <img src={addToCartImg} alt="" />
                    </div>
                  )}
                </div>
              </div>

              {/* <span onClick={() => productDetailsView(id)}> */}
              {/* <button className="quickViewBtn" onClick={openModal}> */}
              {/* <button onClick={openModal} className="quickViewBtn">
                  <i className="bi bi bi-eye"></i> <span>Quick View</span>
                </button> */}

              {/* <Link to={`/${slug}/${subSlug}/${subSubSlug}/${id}`}>
                  <button className="quickViewBtn">
                    <i className="bi bi bi-eye"></i> View Details
                  </button>
                </Link> */}
              {/* </span> */}

              <div className="card-footer product-card-footer">
                {addedItemId ? (
                  <div className="cardFooterBtn">
                    <button disabled className="btn_after_added_cart">
                      <i className="bi bi-cart-plus"></i> Product in Cart
                    </button>

                    <span onClick={() => productDetailsView(id)}>
                      {/* <button className="quickViewBtn" onClick={openModal}> */}
                      <button onClick={openModal} className="quickViewBtn">
                        <i className="bi bi bi-eye"></i>
                      </button>
                      <Link
                        to={`/${slug}/${subSlug}/${subSubSlug}/${id}`}
                        addedItemId={addedItemId}
                      >
                        <button className="detailsViewBtn">
                          <i className="bi bi bi-eye"></i>
                        </button>
                      </Link>

                      {/* <Link to={`/${slug}/${subSlug}/${subSubSlug}/${id}`}>
                        <button className="quickViewBtn">
                          <i className="bi bi bi-eye"></i> View Details
                        </button>
                      </Link> */}
                    </span>

                    {/* <Link to={`/${slug}/${subSlug}/${subSubSlug}/${id}`}>
                      <button className="detailsViewBtn">
                        <i className="bi bi bi-eye"></i>{" "}
                      </button>
                    </Link> */}
                  </div>
                ) : (
                  <div className="cardFooterBtn">
                    <button
                      className="btn_before_add_cart"
                      onClick={() => addToCartHandler(product, quantity)}
                    >
                      <i className="bi bi-cart-plus"></i> Add To Cart
                    </button>
                    <span onClick={() => productDetailsView(id)}>
                      {/* <button className="quickViewBtn" onClick={openModal}> */}
                      <button onClick={openModal} className="quickViewBtn">
                        <i className="bi bi bi-eye"></i>
                      </button>

                      <Link
                        to={`/${slug}/${subSlug}/${subSubSlug}/${id}`}
                        addedItemId={addedItemId}
                      >
                        <button className="detailsViewBtn">
                          <i className="bi bi bi-eye"></i>
                        </button>
                      </Link>

                      {/* <Link to={`/${slug}/${subSlug}/${subSubSlug}/${id}`}>
                  <button className="quickViewBtn">
                    <i className="bi bi bi-eye"></i> View Details
                  </button>
                </Link> */}
                    </span>

                    {/* <Link to={`/${slug}/${subSlug}/${subSubSlug}/${id}`}>
                      <button className="detailsViewBtn">
                        <i className="bi bi bi-eye"></i>{" "}
                      </button>
                    </Link> */}
                  </div>
                )}
              </div>
              {/* </div> */}
            </>
          ) : (
            <div>
              <div className="product-card-body">
                <img
                  src={imgThumbnailBaseUrl + `/${thumbnail}`}
                  className="card-img-top"
                  alt=""
                />
                <div className="product-card-body-content">
                  <small>{name?.toString().substring(0, 20)}...</small>
                  <br />
                  <div className="product-card-body-content-unit-price">
                    <span>
                      {/* {choice_options?.map((list) => (
                        <>
                          {list?.title} : {list?.options[0]}
                        </>
                      ))} */}
                      {/* {choice_options?.map((list) => productUnitStatic?.find(item=>item===list?.title))}:{choice_options[0]?.options[0]} */}
                      {/* {newChoiseOption }:{choice_options[0]?.options[0]} */}
                    </span>
                    {newChoiceOption && (
                      <span>
                        {newChoiceOption?.title} : {newChoiceOption?.options[0]}
                      </span>
                    )}
                    <br />
                    <strong> ??? {unit_price}</strong>
                  </div>
                </div>
              </div>
              <div className="card-footer product-card-footer">
                <button className="btn_before_add_cart">
                  <i className="bi bi-cart-plus"></i> Stock Out
                </button>
                <span onClick={() => productDetailsView(id)}>
                  {/* <button className="quickViewBtn" onClick={openModal}> */}
                  <button onClick={openModal} className="btn_before_add_cart">
                    <i className="bi bi bi-eye"></i>
                  </button>

                  {/* <Link to={`/${slug}/${subSlug}/${subSubSlug}/${id}`}>
                  <button className="quickViewBtn">
                    <i className="bi bi bi-eye"></i> View Details
                  </button>
                </Link> */}
                </span>
              </div>
              <div className="product_stock_out_overlay d-flex justify-content-center align-items-center">
                <h3 className="text-center">
                  Stock <br /> Out
                </h3>
              </div>
            </div>
          )}
        </div>
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
