import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from './../../BaseUrl/BaseUrl';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ProductCard from './../../Components/Cards/ProductCard/ProductCard';

const DiscountProducts = () => {
  const [discountProduct, setDiscountProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const limit = 50;
  const offset = 1;

  useEffect(() => {
    axios.get(`${baseUrl}/products/discounted-product?${limit}&${offset}`)
    .then((res) => setDiscountProduct(res?.data.products));
    setLoading(false)
  }, []);

  return (
    <div>
      <h4>Discount Products:</h4>
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