import axios from "axios";
import React, { useEffect, useState } from "react";
import "./QuickViewModal.css";
import { baseUrl, imgBaseUrl } from "../../BaseUrl/BaseUrl";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "./../../Redux/Actions/CartAction";
import { getPriceVariant } from "./../../Redux/Actions/PriceVariantAction";
import SliderImage from "react-zoom-slider";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const QuickViewModal = ({ pid }) => {
  const { slug, subSlug, subSubSlug } = useParams();
  const [quantityCount, setQuantityCount] = useState(1);
  const [productDetail, setProductDetail] = useState([]);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  // const cartItemQty = cartItems.map((i) => i.quantity);
  const cartItemsId = cartItems.map((i) => i.product.id);
  const addedItemId = cartItemsId.find((i) => i === pid);

  const isItemExist = cartItems.find((i) => i.product.id === addedItemId);

  const choiceOptions = productDetail?.choice_options?.map(
    (list) => list?.options
  );
  const defaultOption = choiceOptions?.map((option) => option[0]);
  const colors = productDetail?.colors?.map((color) => color?.code);

  const [activeOption, setActiveOption] = useState();


  const notify = () => toast.error('Stock Limited.');

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      // notify()
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      // toast("Stock Limited")
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const { priceVariant } = useSelector((state) => state?.priceVariant);

  const variantPrice = priceVariant?.data?.price;

  useEffect(() => {
    axios.get(`${baseUrl}/products/details/${pid}`).then((res) => {
      setProductDetail(res?.data?.data);
    });
  }, [pid]);

  
  const priceVariantHandlerByChoiceOption = (option) => {
    setActiveOption(option);


    const priceVariantDefaultOptionData = {
      product_id: `${pid}`,
      choice_19: `${defaultOption[0]}`,
      color: `${colors[0]}`,
      quantity: `${quantityCount}`,
    };
    const priceVariantData = {
      product_id: `${pid}`,
      choice_19: `${option}`,
      quantity: `${quantityCount}`,
    };
    option
      ? dispatch(getPriceVariant(priceVariantData))
      : dispatch(getPriceVariant(priceVariantDefaultOptionData));
  };

  const priceVariantHandlerByColor = (selectedColor) => {
    const priceVariantDefaultColorData = {
      product_id: `${pid}`,
      choice_19: `${defaultOption[0]}`,
      color: `${colors[0]}`,
      quantity: `${quantityCount}`,
    };
    const priceVariantData = {
      product_id: `${pid}`,
      choice_19: `${defaultOption[0]}`,
      color: `${selectedColor}`,
      quantity: `${quantityCount}`,
    };
    selectedColor
      ? dispatch(getPriceVariant(priceVariantData))
      : dispatch(getPriceVariant(priceVariantDefaultColorData));
  };
  const priceVariantHandlerByQty = () => {
    const priceVariantDefaultColorData = {
      product_id: `${pid}`,
      choice_19: `${defaultOption[0]}`,
      color: `${colors[0]}`,
      quantity: `${quantityCount}`,
    };
    dispatch(getPriceVariant(priceVariantDefaultColorData));
  };

  const newData = productDetail?.images?.map((img) => ({
    image: imgBaseUrl + `/` + img,
  }));

  return (
    <>
    
      <div className="modal-container">
      {/* <Toaster /> */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-5">
              <div className="imageView">
                {newData?.length && (
                  <SliderImage
                    data={newData}
                    width="375px"
                    showDescription={true}
                    direction="right"
                  />
                )}
              </div>
            </div>
            <div className="col-sm-7">
              <div className="detail-content-view">
                <div className="productName_wishlist">
                  <h4 className="productName">{productDetail.name}</h4>
                  <span>
                    <i className="bi bi-heart"></i>
                  </span>
                </div>
                <div className="price_Stock_Code">
                  {productDetail.discount ? (
                    <h5 className="prices">
                      ৳{productDetail.unit_price - productDetail.discount}{" "}
                      <del className="text-danger">
                        {" "}
                        ৳{productDetail.unit_price}
                      </del>
                    </h5>
                  ) : (
                    <h5 className="prices">৳{productDetail.unit_price}</h5>
                  )}

                  <p>
                    Product Code: <strong>{productDetail.code}</strong>
                    <span>
                      {" "}
                      Stock:{" "}
                      {productDetail.current_stock > 0 ? (
                        <strong>Available</strong>
                      ) : (
                        <strong>Not Available</strong>
                      )}
                    </span>
                  </p>
                </div>
                <div className="pc-size-color">
                  <div
                    className={
                      productDetail?.choice_options?.length < 1
                        ? "d-none"
                        : "d-flex size"
                    }
                  >
                    {productDetail?.choice_options?.map((list) => (
                      <div
                        key={list.id}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <h5>{list?.title}: </h5>
                        <div className="d-flex">
                          {list?.options?.map((option) => (
                            <span
                              onClick={() =>
                                priceVariantHandlerByChoiceOption(option)
                              }
                              className={activeOption ? option === activeOption ? `activeOption` : `option` : option === defaultOption[0] ? `activeOption` : `option`}
                            >
                              {option}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className={
                      productDetail?.colors?.length < 1
                        ? "d-none"
                        : "d-flex color"
                    }
                  >
                    <h5>Color: </h5>
                    <div className="d-flex">
                      {productDetail.colors?.map((color) => (
                        <>
                          <div
                            onClick={() =>
                              priceVariantHandlerByColor(color.code)
                            }
                            style={{
                              background: `${color.code}`,
                              margin: "0px 2px",
                              cursor: "pointer",
                            }}
                            className="color1"
                          ></div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="quantity-content">
                  <div className="d-flex">
                    <h4>Quantity: </h4>
                    <div className="quantity">
                      {isItemExist?.quantity ? (
                        <span
                          onClick={() =>
                            decreaseQuantity(
                              productDetail,
                              isItemExist?.quantity
                            )
                          }
                          className="minusBtn"
                        >
                          -
                        </span>
                      ) : (
                        <span
                          onClick={() => 
                            setQuantityCount(
                              quantityCount > 1
                                ? quantityCount - 1
                                : quantityCount
                            )
                          }
                          className="minus"
                        >
                          -
                        </span>
                      )}
                      <span className="count-number">
                        {isItemExist?.quantity
                          ? isItemExist?.quantity
                          : quantityCount}
                      </span>
                      {isItemExist?.quantity ? (
                        <span
                          onClick={() =>
                            increaseQuantity(
                              productDetail,
                              isItemExist?.quantity,
                              productDetail.current_stock
                            )
                          }
                          className="plusBtn"
                        >
                          +
                        </span>
                      ) : (
                        <span
                          onClick={() => 
                            setQuantityCount(
                              productDetail.current_stock > quantityCount
                                ? quantityCount + 1
                                : quantityCount
                            )

                            // setQuantityCount((currentQty) => {
                            //   return productDetail.current_stock > quantityCount
                            //     ? currentQty + 1
                            //     : quantityCount;
                            //   });

                          }
                          className="plus"
                        >
                          +
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="totalPrice">
                    {isItemExist?.quantity ? (
                      <h5>
                        {productDetail?.discount > 0 ? (
                          <span className="mx-2 text-end">
                            ৳
                            {isItemExist?.quantity *
                              (productDetail?.unit_price -
                                productDetail?.discount)}
                          </span>
                        ) : (
                          <span className="mx-2 text-end">
                            ৳{isItemExist?.quantity * productDetail?.unit_price}
                          </span>
                        )}
                      </h5>
                    ) : (
                      <h5>
                        Total Price: ৳{" "}
                        {variantPrice && isItemExist
                          ? variantPrice
                          : quantityCount *
                            (productDetail?.unit_price -
                              productDetail?.discount)}
                      </h5>
                    )}
                  </div>
                </div>
                <div className="product_description">
                  <h5>Description :</h5>
                  <span
                    dangerouslySetInnerHTML={{ __html: productDetail.details }}
                  ></span>
                </div>
              </div>

              <div className="col-md-8">
                <div className="my-4">
                  {addedItemId ? (
                    <button disabled className="btn_after_added_cart">
                      <i className="bi bi-cart-plus"></i> Added to Cart
                    </button>
                  ) : (
                    <button
                      className="btn_before_add_cart"
                      onClick={() =>
                        dispatch(addItemsToCart(productDetail, quantityCount))
                      }
                    >
                      <i className="bi bi-cart-plus"></i> Add To Cart
                    </button>
                  )}

                  <Link to={`/${slug}/${subSlug}/${subSubSlug}/${pid}`}>
                    <button className="btn_before_add_cart ms-3">
                      <i className="bi bi-eye-fill"></i> View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default QuickViewModal;