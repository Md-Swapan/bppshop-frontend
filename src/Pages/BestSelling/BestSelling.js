import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./../../BaseUrl/BaseUrl";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ProductCard from "./../../Components/Cards/ProductCard/ProductCard";

const BestSelling = () => {
  const [bestSellingProduct, setBestSellingProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const limit = 10;
  const offset = 1;

  useEffect(() => {
    axios
      .get(`${baseUrl}/products/best-sellings?${limit}&${offset}`)
      .then((res) => setBestSellingProduct(res?.data?.products));
    setLoading(false);
  }, []);

  console.log(bestSellingProduct);


  return (
    <>
      <div className="best_selling_container">
        <h4>Best Selling Products:</h4>
        <div className="product-container mt-4">
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
              bestSellingProduct?.map((product) => (
                <ProductCard key={product?.id} product={product} />
              ))
            )}
          </SkeletonTheme>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default BestSelling;
