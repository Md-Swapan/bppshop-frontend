import axios from "axios";
import React, { useEffect, useState } from "react";
import prodimg from "../../Assets/Images/categoryImg/download (5).png";
import "./QuickViewModal.css";
import { baseUrl, imgBaseUrl } from "../../BaseUrl/BaseUrl";
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart } from './../../Redux/Actions/CartAction';
import { getPriceVariant } from './../../Redux/Actions/PriceVariantAction';
// import { getProductDetails } from "../../Redux/Actions/ProductsAction";

const QuickViewModal = ({ pid }) => {
  const [quantityCount, setQuantityCount] = useState(1);
  const [productDetail, setProductDetail] = useState([]);
  const dispatch = useDispatch();

  const {priceVariant} = useSelector((state) => state?.priceVariant);

  const variantPrice = priceVariant?.data?.price

  useEffect(() => {
    axios.get(`${baseUrl}/products/details/${pid}`)
    .then((res) => {
      setProductDetail(res.data.data);
    });
  }, [pid]);


  const choiceOptions = productDetail?.choice_options?.map((list) => list?.options)
  const defaultOption = choiceOptions?.map(option => (option[0]))
  const colors = productDetail?.colors?.map((color) => color?.code)

  const priceVariantHandlerByChoiceOption = (option) => {
    const priceVariantDefaultOptionData = {
      "product_id": `${pid}`,
      "choice_19": `${defaultOption[0]}`,
      "color": `${colors[0]}`,
      "quantity": `${quantityCount}`
    }
    const priceVariantData = {
      "product_id": `${pid}`,
      "choice_19": `${option}`,
      "color": `${colors[0]}`,
      "quantity": `${quantityCount}`
    }
    option ? dispatch(getPriceVariant(priceVariantData)) : dispatch(getPriceVariant(priceVariantDefaultOptionData))
  }
  const priceVariantHandlerByColor = (selectedColor) => {
    const priceVariantDefaultColorData = {
      "product_id": `${pid}`,
      "choice_19": `${defaultOption[0]}`,
      "color": `${colors[0]}`,
      "quantity": `${quantityCount}`
    }
    const priceVariantData = {
      "product_id": `${pid}`,
      "choice_19": `${defaultOption[0]}`,
      "color": `${selectedColor}`,
      "quantity": `${quantityCount}`
    }
    selectedColor ? dispatch(getPriceVariant(priceVariantData)) : dispatch(getPriceVariant(priceVariantDefaultColorData))
  }
  const priceVariantHandlerByQty = () => {
    const priceVariantDefaultColorData = {
      "product_id": `${pid}`,
      "choice_19": `${defaultOption[0]}`,
      "color": `${colors[0]}`,
      "quantity": `${quantityCount}`
    }
    // const priceVariantData = {
    //   "product_id": `${pid}`,
    //   "choice_19": `${defaultOption[0]}`,
    //   "color": `${selectedColor}`,
    //   "quantity": `${quantityCount}`
    // }
    dispatch(getPriceVariant(priceVariantDefaultColorData))
  }


  // const priceVariantHandlerByQty = () => {
  //   const priceVariantData = {
  //     "product_id": pid,
  //     "quantity": quantityCount
  //   }
  //   dispatch(getPriceVariant(priceVariantData))
  // }
 
 
  return (
    <>
      <div className="modal-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4">
              <div className="imageView">
                <div className="detailImgCarousel">
                  <img src={imgBaseUrl+`/${productDetail?.images}`} alt="img" />
                </div>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="detail-content-view">
                <div className="productName_wishlist">
                  <h4 className="productName">
                    {" "}
                    {productDetail.name}
                    {pid}{" "}
                  </h4>
                  <span>
                    <i class="bi bi-heart"></i>
                  </span>
                </div>
                <div className="price_Stock_Code">
                  <h4 className="prices">৳{productDetail.unit_price}</h4>
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
                  {/* <h5>Pc: {productDetail.current_stock}</h5> */}

                  <div
                    className={
                      productDetail?.choice_options?.length < 1
                        ? "d-none"
                        : "d-flex size"
                    }
                  >
                    {productDetail?.choice_options?.map((list) => (
                      <>
                        <h5>{list?.title}: </h5>
                        <div className="d-flex">
                          {list?.options?.map((option) => (
                            <span 
                            style={{cursor: "pointer"}}
                            onClick={() => priceVariantHandlerByChoiceOption(option)} 
                            className="size1">{option}</span>
                          ))}
                        </div>
                      </>
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
                              cursor: "pointer"
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
                      <span
                        onClick={() =>
                          setQuantityCount(
                            quantityCount > 1
                              ? quantityCount - 1
                              : quantityCount
                          )
                          // priceVariantHandlerByQty()
                        }
                        className="minus"
                      >
                        -
                      </span>
                      <span className="count-number">{quantityCount}</span>
                      <span
                        onClick={() => setQuantityCount(productDetail.current_stock > quantityCount
                          ? quantityCount + 1
                          : quantityCount)}
                        className="plus"
                      >
                        +
                      </span>
                    </div>
                  </div>
                  <div className="totalPrice">
                    <h5>
                      Total Price: ৳  {variantPrice? variantPrice * quantityCount : quantityCount * productDetail?.unit_price}
                    </h5>
                  </div>
                </div>
                <div className="about-div" style={{ margin: "10px 0px" }}>
                  <h5>About this item</h5>
                  <span>
                    In publishing and graphic design, Lorem ipsum is a
                    placeholder text commonly used to demonstrate the visual
                    form of a document or a typeface without relying on
                    meaningful content. Lorem ipsum may be used as a placeholder
                    before final copy is available.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 img-carousel-item">
              {
                 productDetail?.images?.map(img=><img width={70} src={imgBaseUrl+`/${img}`} alt="img" />)
              }

            </div>
            <div className="col-md-8 buyNowBtn_addToCartBtn_container">
              <button type="">Buy Now</button>
              <button
                onClick={() =>
                  dispatch(addItemsToCart(productDetail, quantityCount))
                }
                type=""
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickViewModal;
