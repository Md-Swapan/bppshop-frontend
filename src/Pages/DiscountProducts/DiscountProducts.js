import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./../../BaseUrl/BaseUrl";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ProductCard from "./../../Components/Cards/ProductCard/ProductCard";
import { useRef } from "react";

const DiscountProducts = () => {
  const listInnerRef = useRef();
  const [discountProduct, setDiscountProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [wasLastList, setWasLastList] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${baseUrl}/products/discounted-product`, { params: { limit: 150, offset: currentPage } })
    .then((res) => {
      if (!res.data.products) {
              setWasLastList(true);
              return;
            }
            setPrevPage(currentPage);
            setDiscountProduct([...discountProduct, ...res.data.products]);
      setDiscountProduct(res?.data.products)});
    setLoading(false)

    if (!wasLastList && prevPage !== currentPage) {
      // fetchData();
    }

  }, [currentPage]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       `${baseUrl}/products/discounted-product`,
  //       { params: { limit: 16, offset: currentPage } }
  //     );
  //     setLoading(false);
  //     if (!response.data.products) {
  //       setWasLastList(true);
  //       return;
  //     }
  //     setPrevPage(currentPage);
  //     setDiscountProduct([...discountProduct, ...response.data.products]);
  //   };
  //   if (!wasLastList && prevPage !== currentPage) {
  //     fetchData();
  //   }
  // }, [currentPage, wasLastList, prevPage, discountProduct]);

  const productPaginateByScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrentPage(currentPage + 1)
      }
    }
  };

  return (
    <div>
      <h4>Discount Products:</h4>
      <div
        onScroll={productPaginateByScroll}
        ref={listInnerRef}
        className="product-container mt-4"
      >
        {/* <div className="product-content"> */}
        <SkeletonTheme baseColor="#DDDDDD" highlightColor="#e3e3e3">
          {loading ? (
            <>
              <Skeleton height="335px" borderRadius="10px" count={1} />
              <Skeleton height="335px" borderRadius="10px" count={1} />
              <Skeleton height="335px" borderRadius="10px" count={1} />
              <Skeleton height="335px" borderRadius="10px" count={1} />
              <Skeleton height="335px" borderRadius="10px" count={1} />
              <Skeleton height="335px" borderRadius="10px" count={1} />
              <Skeleton height="335px" borderRadius="10px" count={1} />
              <Skeleton height="335px" borderRadius="10px" count={1} />
              <Skeleton height="335px" borderRadius="10px" count={1} />
              <Skeleton height="335px" borderRadius="10px" count={1} />
            </>
          ) : (
            discountProduct.map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))
          )}
        </SkeletonTheme>
        {/* </div> */}
      </div>
    </div>
  );
};

export default DiscountProducts;
