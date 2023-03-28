import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProductDetailsPage.css";
import { useParams } from "react-router-dom";
import { baseUrl, imgBaseUrl } from "./../../BaseUrl/BaseUrl";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addItemsToCart,
  addItemsToCartAfterLogin,
} from "./../../Redux/Actions/CartAction";
import { getPriceVariant } from "./../../Redux/Actions/PriceVariantAction";
import ProductReview from "./../../Components/ProductReview/ProductReview";
import ReactImageMagnify from "react-image-magnify";
import toast from "react-hot-toast";

const ProductDetailsPage = () => {
  const { slug, subSlug, subSubSlug, id } = useParams();
  let newId = parseInt(id);
  const [productDetail, setProductDetail] = useState([]);
  const [quantityCount, setQuantityCount] = useState(1);
  const [activeOption, setActiveOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [variantChoiceOption, setVariantChoiceOption] = useState([]);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${baseUrl}/products/details/${id}`).then((res) => {
      setProductDetail(res.data.data);
      setLoading(false);
    });
  }, [id]);


  const cartItemsId = cartItems.map((i) => i?.product?.id);
  const addedItemId = cartItemsId.find((i) => i === newId);
  const isItemExist = cartItems.find((i) => i?.product?.id === addedItemId);
  const choiceOptions = productDetail?.choice_options?.map(
    (list) => list?.options
  );

  //default choise option
  const defaultOptionName = productDetail?.choice_options?.map((list) => list?.name);
  const defaultOption = choiceOptions?.map((option) => option[0]);
  const colors = productDetail?.colors?.map((color) => color?.code);
  const defaultChoices = defaultOptionName?.map((name, index) => ({
    name,
    options: defaultOption[index],
  }));

  console.log(defaultChoices);


  const paramId = id;
  const productDetailsPathId = productDetail?.id?.toString();
  const productDetailsPath = productDetailsPathId == paramId;

  const { priceVariant } = useSelector((state) => state?.priceVariant);
  const variantPrice = priceVariant?.data?.price;

  

  // const [selectedOption, setSelectedOption] = useState([]);

  // console.log(selectedOption);

  // const OptionSelectHandler = (e) => {
  //   const selectOption = e.target.value.split("@");
  //   const nam = selectOption[0];
  //   const optn = selectOption[1];

  //   const selectedItems = {
  //     name: nam,
  //     option: optn,
  //   };

  //   const findExistingItem = selectedOption.find((item) => {
  //     return item.name === nam;
  //   });

  //   if (findExistingItem) {
  //     findExistingItem.name = nam;
  //     findExistingItem.option = optn;
  //   }

  //   const names = selectedOption.map((o) => o.name);
  //   const filtered = selectedOption.filter(
  //     ({ name }, index) => !names.includes(name, index + 1)
  //   );

  //   console.log(filtered);

  //   setSelectedOption([...selectedOption, selectedItems]);
  // };

  //select option handlers
 
  const [selectedOption, setSelectedOption] = useState([]);
  
  console.log(selectedOption)

  const OptionSelectHandler = (e) => {
    const selectOption = e.target.value.split("@");
    const newName = {
      name: selectOption[0],
      option: selectOption[1],
    };
    if (selectedOption.findIndex((f) => f.name === newName.name) === -1) {
      setSelectedOption((element) => [...selectedOption, newName]);
    } else {
      const newSelectedOption = [...selectedOption];
      const filterArray = newSelectedOption.filter(
        (f) => f.name !== newName.name
      );
      setSelectedOption((element) => [...filterArray, newName]);
    }

    priceVariantHandlerByChoiceOption()

  };


  const priceVariantHandlerByChoiceOption = () => {
    // localStorage.setItem("activeOption", option);
    // const newActiveOption = localStorage.getItem("activeOption");
    // setActiveOption(newActiveOption);


    const priceVariantDefaultOptionData = {
      product_id: `${id}`,
      color: `${colors[0]}`,
      quantity: `${quantityCount}`,
    };
    defaultChoices && defaultChoices.forEach(element => {
      priceVariantDefaultOptionData[element.name] = `${element.options}`.trim();
    });


    const priceVariantData = {
      product_id: `${id}`,
      quantity: `${quantityCount}`,
    };

    selectedOption && selectedOption.forEach(element => {
      priceVariantData[element.name] = `${element.option}`.trim();
    });


    selectedOption? dispatch(getPriceVariant(priceVariantData))
      : dispatch(getPriceVariant(priceVariantDefaultOptionData));


      console.log(priceVariantDefaultOptionData)
      console.log(priceVariantData)
    };

    
  const priceVariantHandlerByColor = (selectedColor) => {
    const priceVariantDefaultColorData = {
      product_id: `${id}`,
      color: `${colors[0]}`,
      quantity: `${quantityCount}`,
    };
    const priceVariantData = {
      product_id: `${id}`,
      color: `${selectedColor}`,
      quantity: `${quantityCount}`,
    };
    selectedColor
      ? dispatch(getPriceVariant(priceVariantData))
      : dispatch(getPriceVariant(priceVariantDefaultColorData));
  };



  const newData = productDetail?.images?.map((img) => ({
    image: imgBaseUrl + `/` + img,
  }));

  const [img, setImg] = useState();

  const hoverHandler = (image, i) => {
    setImg(image);
    refs.current[i].classList.add("imgActive");
    for (var j = 0; j < productDetail?.images?.length; j++) {
      if (i !== j) {
        refs.current[j].classList.remove("imgActive");
      }
    }
  };


  const refs = useRef([]);
  refs.current = [];
  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !productDetailsPath) {
      navigate("/404", { replace: true });
    }
  }, [productDetailsPath, loading, navigate]);

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


  const addToCartHandler = (productDetail, quantityCount) => {
    let color = productDetail?.colors?.map((color) => color?.code);
    let choice_19 = productDetail?.choice_options?.map((list) => list?.options);
    let option = choice_19?.map((option) => option[0]);

    const addItemsToCartDataWithColor = {
      id: `${productDetail?.id}`,
      color: `${color[0]}`,
      choice_19: `${option[0]}`,
      quantity: `${quantityCount}`,
    };
    defaultChoices && defaultChoices.forEach(element => {
      addItemsToCartDataWithColor[element.name] = `${element.options}`.trim();
    });


    const addItemsToCartDataWithoutColor = {
      id: `${productDetail.id}`,
      quantity: `${quantityCount}`,
    };
    defaultChoices && defaultChoices.forEach(element => {
      addItemsToCartDataWithoutColor[element.name] = `${element.options}`.trim();
    });

    console.log(addItemsToCartDataWithoutColor)

    if (token) {
      productDetail?.colors?.length
        ? dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithColor)) &&
          dispatch(addItemsToCart(productDetail, quantityCount))
        : dispatch(addItemsToCartAfterLogin(addItemsToCartDataWithoutColor)) &&
          dispatch(addItemsToCart(productDetail, quantityCount));
    } else {
      dispatch(addItemsToCart(productDetail, quantityCount));
    }

    // toaster
    toast.success(`Product added to cart successfully`, {
      duration: 3000,
      style: {
        width: "100%",
        height: "80px",
        padding: "0px 20px",
      },
    });
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb my-4">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/${slug}`}>{slug}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/${slug}/${subSlug}`}>{subSlug}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/${slug}/${subSlug}/${subSubSlug}`}>{subSubSlug}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {productDetail?.name}
          </li>
        </ol>
      </nav>
      <br />
      {productDetailsPath === true && (
        <div className="product_details_page_container">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                <div className="product_details_page_img_container">
                  {/* {newData?.length && (
                  <SliderImage
                    data={newData}
                    width="375px"
                    showDescription={true}
                    direction="right"
                  />
                )} */}

                  {newData?.length && (
                    <div className="imgZoomContainer">
                      <div className="left_2">
                        {productDetail?.images?.length && (
                          <ReactImageMagnify
                            {...{
                              smallImage: {
                                alt: "Wristwatch by Ted Baker London",
                                isFluidWidth: true,
                                sizes:
                                  "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
                                src: img
                                  ? `https://backend.bppshop.com.bd/storage/product/${img}`
                                  : newData[0].image,
                              },
                              largeImage: {
                                src: img
                                  ? `https://backend.bppshop.com.bd/storage/product/${img}`
                                  : newData[0].image,
                                width: 1526,
                                height: 2000,
                              },
                              enlargedImageContainerDimensions: {
                                width: "100%",
                                height: "100%",
                              },
                            }}
                          />
                        )}
                      </div>
                      <div className="left_1">
                        {productDetail?.images?.map((image, i) => (
                          <div
                            className={i === 0 ? "img_wrap active" : "img_wrap"}
                            key={i}
                            onClick={() => hoverHandler(image, i)}
                            ref={addRefs}
                          >
                            <img
                              src={`https://backend.bppshop.com.bd/storage/product/${image}`}
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-8">
                <div className="product_details_page_content">
                  <h2>{productDetail?.name}</h2>
                  <p>
                    <span>
                      Product Code: <strong>{productDetail?.code}</strong>
                    </span>
                    <span>
                      {" "}
                      Stock:{" "}
                      {productDetail?.current_stock > 0 ? (
                        <strong>Available</strong>
                      ) : (
                        <strong>Not Available</strong>
                      )}
                    </span>
                  </p>
                  <div className="product_details_page_price">
                    {productDetail?.discount ? (
                      <h5 className="prices">
                        ৳{productDetail?.unit_price - productDetail?.discount}{" "}
                        <del className="text-danger">
                          {" "}
                          {productDetail?.unit_price}
                        </del>
                      </h5>
                    ) : (
                      <h5 className="prices">৳{productDetail?.unit_price}</h5>
                    )}
                  </div>
                  <div className="product_details_page_pc_size_color">
                    <div
                      className={
                        productDetail?.choice_options?.length < 1
                          ? "d-none"
                          : "choiceOptionListContainer size"
                      }
                    >
                      {productDetail?.choice_options?.map((list, index) => (
                        <div key={list?.id} className="choiceOptionList">
                          <h5>{list?.title}:</h5>
                          <div className="choiceOptionSelection">
                            {/* {list?.options?.map((option, indx) => (
                              <span
                                onClick={() =>
                                  priceVariantHandlerByChoiceOption(
                                    option,
                                    indx
                                  )
                                }
                                className={
                                  activeOption
                                    ? option === activeOption
                                      ? `activeOption`
                                      : `option`
                                    : choiceOptions[0]
                                    ? `activeOption`
                                    : `option`
                                }
                              >
                                {option}
                              </span>
                            ))} */}

                            <select
                              name="options"
                              onChange={(e) => OptionSelectHandler(e)}
                            >
                              <option value="none" selected disabled hidden>
                                Choose {list?.title}{" "}
                              </option>
                              {list?.options?.map((option, indx) => (
                                <option
                                  value={list?.name + "@" + option}
                                  key={indx}
                                >
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}

                      {/* <div className="choiceOptionList">
                          <h5>
                            {optionUnit[0]?.title}
                          </h5>
                          <div className="choiceOptionSelection">
                            <select
                              name="options"
                              onChange={(e) => OptionSelectHandler(e)}
                            >
                              <option value="">Choose {optionUnit[0]?.title} </option>
                              {optionUnit[0]?.options?.map((option, indx) => (
                                <option value={option} key={indx}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>


                        {optionUnit[1] && <div className="choiceOptionList">
                          <h5>
                            {optionUnit[1]?.title}
                          </h5>
                          <div className="choiceOptionSelection">
                            <select
                              name="options"
                              onChange={(e) => OptionSelectHandler(e)}
                            >
                              <option value="">Choose {optionUnit[1]?.title} </option>
                              {optionUnit[1]?.options?.map((option, indx) => (
                                <option value={option} key={indx}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>}

                        {
                          optionUnit[2] && <div className="choiceOptionList">
                          <h5>
                            {optionUnit[2]?.title}
                          </h5>
                          <div className="choiceOptionSelection">
                            <select
                              name="options"
                              onChange={(e) => OptionSelectHandler(e)}
                            >
                              <option value="">Choose {optionUnit[2]?.title} </option>
                              {optionUnit[2]?.options?.map((option, indx) => (
                                <option value={option} key={indx}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        } */}
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
                        {productDetail?.colors?.map((color) => (
                          <>
                            <div
                              onClick={() =>
                                priceVariantHandlerByColor(color?.code)
                              }
                              style={{
                                background: `${color?.code}`,
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
                  <div className="product_details_page_quantity_content ">
                    <h5>Quantity: </h5>
                    <div className="quantity">
                      {isItemExist?.quantity ? (
                        <span
                          onClick={() =>
                            decreaseQuantity(
                              productDetail,
                              isItemExist?.quantity
                            )
                          }
                          className="detailsViewMinusBtn"
                        >
                          <i className="bi bi-dash-lg"></i>
                        </span>
                      ) : (
                        <span
                          onClick={
                            () =>
                              setQuantityCount(
                                quantityCount > 1
                                  ? quantityCount - 1
                                  : quantityCount
                              )
                            // priceVariantHandlerByQty()
                          }
                          className="minus"
                        >
                          <i className="bi bi-dash-lg"></i>
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
                              productDetail?.current_stock
                            )
                          }
                          className="detailsViewPlusBtn"
                        >
                          <i className="bi bi-plus-lg"></i>
                        </span>
                      ) : (
                        <span
                          onClick={() =>
                            setQuantityCount(
                              productDetail?.current_stock > quantityCount
                                ? quantityCount + 1
                                : quantityCount
                            )
                          }
                          className="plus"
                        >
                          <i className="bi bi-plus-lg"></i>
                        </span>
                      )}
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
                              ৳
                              {isItemExist?.quantity *
                                productDetail?.unit_price}
                            </span>
                          )}
                        </h5>
                      ) : (
                        <h5>
                          Total Price: ৳
                          {variantPrice && isItemExist
                            ? variantPrice
                            : quantityCount *
                              (productDetail?.unit_price -
                                productDetail?.discount)}
                        </h5>
                      )}
                    </div>
                  </div>
                  <div className="product_details_page_btn_container">
                    {addedItemId ? (
                      <button disabled className="btn_after_added_cart">
                        <i className="bi bi-cart-plus"></i> Added to Cart
                      </button>
                    ) : (
                      <button
                        className="btn_before_add_cart"
                        onClick={() =>
                          addToCartHandler(productDetail, quantityCount)
                        }
                      >
                        <i className="bi bi-cart-plus"></i> Add To Cart
                      </button>
                    )}
                    <button className="addWishListBtn">
                      <i className="bi bi-heart"></i>
                    </button>
                  </div>
                  <div className="product_details_page_product_description">
                    <h5>Description :</h5>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: productDetail?.details,
                      }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ProductReview />
    </>
  );
};
export default ProductDetailsPage;
