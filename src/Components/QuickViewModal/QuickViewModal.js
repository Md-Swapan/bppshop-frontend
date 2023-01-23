import axios from "axios";
import React, { useEffect, useState } from "react";
import prodimg from "../../Assets/Images/categoryImg/download (5).png";
import "./QuickViewModal.css";
import { baseUrl } from "../../BaseUrl/BaseUrl";
import { useDispatch } from 'react-redux';
import { addItemsToCart } from './../../Redux/Actions/CartAction';

const QuickViewModal = ({ pid }) => {
  const [quantityCount, setQuantityCount] = useState(1);
  const [productDetail, setProductDetail] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${baseUrl}/products/details/${pid}`).then((res) => {
      setProductDetail(res.data.data);
    });
  }, [pid]);

  const choiceOptions = productDetail?.choice_options?.map((item) => item);

  // const option = choiceOptions?.options?.map(item => item)
  // console.log(option)
 
  return (
    <>
      <div className="modal-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4">
              <div className="imageView">
                <div className="detailImgCarousel">
                  <img src={prodimg} alt="img" />
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
                            <span className="size1">{option}</span>
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
                            style={{
                              background: `${color.code}`,
                              margin: "0px 2px",
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
                        }
                        className="minus"
                      >
                        -
                      </span>
                      <span className="count-number">{quantityCount}</span>
                      <span
                        onClick={() => setQuantityCount(quantityCount + 1)}
                        className="plus"
                      >
                        +
                      </span>
                    </div>
                  </div>
                  <div className="totalPrice">
                    <h5>
                      Total Price: ৳ {quantityCount * productDetail.unit_price}
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
              <img width={70} src={prodimg} alt="img" />
              <img width={70} src={prodimg} alt="img" />
              <img width={70} src={prodimg} alt="img" />
              <img width={70} src={prodimg} alt="img" />
            </div>
            <div className="col-md-8 buyNowBtn_addToCartBtn_container">
              <button type="">Buy Now</button>
              <button onClick={() => dispatch(addItemsToCart(productDetail, quantityCount))} type="">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickViewModal;
